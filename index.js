import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/users.js';
import videoRoutes from './routes/videos.js';
import commentRoutes from './routes/comments.js';
import auth from './routes/auth.js';
import cookieParser from 'cookie-parser';

const app = express();
const port = 3300;
dotenv.config();

const connect = () => {
  mongoose
    .connect(process.env.MONGODB)
    .then(() => console.log('MongoDB has been connected..'))
    .catch((error) => {
      throw error;
    });
};

app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', auth);
app.use('/api/users', userRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/comments', commentRoutes);

app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || 'Something went wrong';
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

app.listen(port, () => {
  connect();
  console.log(`Server is running on http://localhost:${port}`);
});
