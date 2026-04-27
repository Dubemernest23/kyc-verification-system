import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import mysql from "mysql2/promise";
import type { Connection, RowDataPacket } from "mysql2/promise";

dotenv.config();

interface MigrationRow extends RowDataPacket {
  version: string;
}

const MIGRATIONS_DIR = path.resolve(process.cwd(), "database", "migrations");

const getEnv = (name: string, fallback?: string): string => {
  const value = process.env[name] ?? fallback;

  if (!value) {
    throw new Error(`${name} is required to run migrations.`);
  }

  return value;
};

const escapeIdentifier = (value: string): string => {
  return `\`${value.replace(/`/g, "``")}\``;
};

const schemaMigrationsExists = async (connection: Connection): Promise<boolean> => {
  const [rows] = await connection.query<RowDataPacket[]>("SHOW TABLES LIKE 'schema_migrations'");

  return rows.length > 0;
};

const getAppliedMigrations = async (connection: Connection): Promise<Set<string>> => {
  if (!(await schemaMigrationsExists(connection))) {
    return new Set<string>();
  }

  const [rows] = await connection.query<MigrationRow[]>(
    "SELECT version FROM schema_migrations ORDER BY version ASC"
  );

  return new Set(rows.map((row) => row.version));
};

const ensureDatabase = async (connection: Connection, databaseName: string): Promise<void> => {
  await connection.query(
    `CREATE DATABASE IF NOT EXISTS ${escapeIdentifier(databaseName)} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`
  );
  await connection.changeUser({ database: databaseName });
};

const markMigrationAsApplied = async (
  connection: Connection,
  version: string
): Promise<void> => {
  if (!(await schemaMigrationsExists(connection))) {
    return;
  }

  await connection.query(
    `
      INSERT INTO schema_migrations (version)
      VALUES (?)
      ON DUPLICATE KEY UPDATE version = version
    `,
    [version]
  );
};

const loadMigrationFiles = (): string[] => {
  if (!fs.existsSync(MIGRATIONS_DIR)) {
    throw new Error(`Migration directory not found: ${MIGRATIONS_DIR}`);
  }

  return fs
    .readdirSync(MIGRATIONS_DIR)
    .filter((file) => file.endsWith(".sql"))
    .sort((left, right) => left.localeCompare(right));
};

const runMigrations = async (): Promise<void> => {
  const host = getEnv("DB_HOST");
  const port = Number.parseInt(getEnv("DB_PORT", "3306"), 10);
  const user = getEnv("DB_USER");
  const password = process.env.DB_PASSWORD ?? "";
  const database = getEnv("DB_NAME");

  if (Number.isNaN(port)) {
    throw new Error("DB_PORT must be a valid number.");
  }

  const connection = await mysql.createConnection({
    host,
    port,
    user,
    password,
    multipleStatements: true,
  });

  try {
    await ensureDatabase(connection, database);

    const migrationFiles = loadMigrationFiles();
    const appliedMigrations = await getAppliedMigrations(connection);
    const pendingMigrations = migrationFiles.filter((file) => {
      return !appliedMigrations.has(path.parse(file).name);
    });

    if (pendingMigrations.length === 0) {
      console.log("No pending migrations.");
      return;
    }

    for (const migrationFile of pendingMigrations) {
      const version = path.parse(migrationFile).name;
      const filePath = path.join(MIGRATIONS_DIR, migrationFile);
      const sql = fs.readFileSync(filePath, "utf8");

      console.log(`Applying migration: ${version}`);
      await connection.query(sql);
      await markMigrationAsApplied(connection, version);
      console.log(`Applied migration: ${version}`);
    }

    console.log("All pending migrations have been applied.");
  } finally {
    await connection.end();
  }
};

runMigrations().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : "Unknown migration error";

  console.error(`Migration failed: ${message}`);

  if (error instanceof Error && error.stack) {
    console.error(error.stack);
  }

  process.exit(1);
});
