import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

import authRoutes from './routes/auth.js';
import movieRoutes from './routes/movies.js';
import userRoutes from './routes/user.js';
import paymentRoutes from './routes/payments.js';
import adminRoutes from './routes/admin.js';

dotenv.config();
const app = express();

const allowed = [process.env.CLIENT_ORIGIN, process.env.ADMIN_ORIGIN].filter(Boolean);
app.use(cors({ origin: (origin, cb)=> cb(null, !origin or allowed.includes(origin)), credentials: true }));
app.use(helmet());
app.use(express.json({ limit: '2mb' }));
app.use(morgan('dev'));

const limiter = rateLimit({ windowMs: 15*60*1000, limit: 300 });
app.use(limiter);

app.get('/', (_req, res)=> res.json({ ok: true, service: 'movie-ott-backend' }));

app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/user', userRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/admin', adminRoutes);

app.use((err, _req, res, _next)=>{
  console.error('ERROR:', err);
  res.status(err.status || 500).json({ message: err.message || 'Server error' });
});

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGODB_URI).then(()=>{
  app.listen(PORT, ()=> console.log(`✅ Backend running :${PORT}`));
}).catch(err=>{
  console.error('Mongo connect error', err.message);
  process.exit(1);
});
