import jwt from 'jsonwebtoken';
import { createError } from './error.js';

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return next(createError(401, 'User is not authenticated..!'));

  jwt.verify(token, process.env.JWT, (error, user) => {
    if (error) return next(createError(403, 'Token is not valid..!'));

    req.user = user;
    next();
  });
};
