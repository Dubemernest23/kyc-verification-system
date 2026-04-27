export type UserRole = "customer" | "admin" | "compliance_officer";

export type UserStatus = "pending" | "active" | "suspended" | "disabled";

export interface User {
  id: string;
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  phoneNumber: string | null;
  role: UserRole;
  status: UserStatus;
  emailVerifiedAt: Date | null;
  lastLoginAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export type UserProfile = Omit<
  User,
  "passwordHash" | "deletedAt" | "createdAt" | "updatedAt"
>;
