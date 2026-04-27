import { User, UserProfile } from "./user.model";

const getProfile = async (): Promise<UserProfile> => {
  const user: User = {
    id: "12345",
    email: "user@example.com",
    passwordHash: "hashed-password-placeholder",
    firstName: "John",
    lastName: "Doe",
    phoneNumber: null,
    role: "customer",
    status: "active",
    emailVerifiedAt: null,
    lastLoginAt: null,
    createdAt: new Date("2026-01-01T00:00:00.000Z"),
    updatedAt: new Date("2026-01-01T00:00:00.000Z"),
    deletedAt: null,
  };

  return {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    phoneNumber: user.phoneNumber,
    role: user.role,
    status: user.status,
    emailVerifiedAt: user.emailVerifiedAt,
    lastLoginAt: user.lastLoginAt,
  };
};

export const userService = {
  getProfile,
};
