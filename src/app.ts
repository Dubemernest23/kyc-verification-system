import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { httpLogger } from './middlewares/httpLogger';
import apiRoutes from './routes';
import { errorHandler, notFoundHandler} from './middlewares/errorHandler';
// import logger from './config/logger';


//  =======
// Import routes 
// import authRoutes from './routes/auth.routes';
// import kycRoutes from './routes/kyc.routes';
// import adminRoutes from './routes/admin.routes';
//  ========

const app: Application = express();

// ============================================
// Security Middleware
// ============================================
app.use(helmet()); // Security headers
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
    credentials: true,
  })
);

// ============================================
// Rate Limiting
// ============================================
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '3600000'),
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'),
  message: 'Too many requests from this IP, please try again later',
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/', limiter);

// ============================================
// Body Parsing
// ============================================
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ============================================
// Logging
// ============================================
app.use(httpLogger);

// ============================================
// Health Check
// ============================================
app.get('/health', (req, res) => {
  console.log(req.method)
  res.status(200).json({
    success: true,
    message: 'KYC Verification Service is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
  });
});

// ============================================
// API Routes (uncomment as you create them)
// ============================================
app.use('/api/v1', apiRoutes);
// app.use('/api/v1/auth', authRoutes);
// app.use('/api/v1/kyc', kycRoutes);
// app.use('/api/v1/admin', adminRoutes);

// ============================================
// Error Handling (MUST BE LAST)
// ============================================
app.use(notFoundHandler); // 404 handler
app.use(errorHandler);    // Global error handler
export default app;
