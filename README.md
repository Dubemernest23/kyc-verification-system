# KYC Verification Service 🔐

> Secure identity verification system built with TypeScript, compliant with Nigeria Data Protection Regulation (NDPR) and CBN guidelines.

## 🚧 Work in Progress

# Project Structure
kyc-verification-service/
├── src/
│   ├── config/         # Database, encryption, multer
│   ├── types/          # TypeScript interfaces
│   ├── middleware/     # Auth, role-check, validators
│   ├── models/         # User, Verification, AuditLog, Consent
│   ├── services/       # Business logic (verification, encryption)
│   ├── controllers/    # Request handlers
│   ├── routes/         # API endpoints
│   └── utils/          # Helpers
├── uploads/
├── tests/
├── app.ts
└── server.ts

Building a production-ready KYC verification service to demonstrate:
- Secure handling of sensitive data (BVN/NIN)
- TypeScript for type-safe backend development
- Role-based authentication & authorization
- Compliance with Nigerian fintech regulations

## 🎯 Tech Stack
- **Runtime:** Node.js + TypeScript
- **Framework:** Express.js
- **Database:** MySQL
- **Auth:** JWT + bcrypt
- **Security:** AES-256 encryption, SHA-256 hashing
- **File Upload:** Multer


---
