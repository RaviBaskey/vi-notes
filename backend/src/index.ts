import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/vi-notes-local';

// Serverless-optimized Database connection middleware
let isConnected = false;

app.use(async (req, res, next) => {
  // If already connected, proceed to routes
  if (isConnected || mongoose.connection.readyState >= 1) {
    isConnected = true;
    return next();
  }

  try {
    console.log('Establishing new MongoDB connection...');
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, // keep it concise, fail fast
    });
    isConnected = true;
    console.log('Connected to MongoDB');
    next();
  } catch (error) {
    console.error('MongoDB connection error:', error);
    res.status(500).json({ error: 'Database connection failed' });
  }
});

// Routes
app.use('/api/auth', authRoutes);

app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok', message: 'Backend is running' });
});

if (process.env.NODE_ENV !== 'production') {
  // Start server locally immediately, the middleware handles connecting on first request 
  // or we can connect immediately. Connecting immediately is better locally.
  mongoose.connect(MONGODB_URI).then(() => {
    app.listen(PORT, () => {
       console.log(`Server running on port ${PORT}`);
    });
  });
}

export default app;
