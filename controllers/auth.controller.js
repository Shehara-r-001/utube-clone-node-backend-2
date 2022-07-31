import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../Modals/User.js';
import { createError } from '../error.js';

export const SignUp = async (req, res, next) => {
  //   console.log(req.body);
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({ ...req.body, password: hash });
    await newUser.save();
    res.status(200).send({ msg: 'User has been created..' });
  } catch (error) {
    next(error);
  }
};

export const SignIn = async (req, res, next) => {
  try {
    const user = await User.findOne({ name: req.body.name });
    if (!user) next(createError(404, 'User not found..!'));

    const isCorrect = await bcrypt.compare(req.body.password, user.password);
    if (!isCorrect) next(createError(400, 'Wrong username or password..!'));
  } catch (error) {
    next(error);
  }
};
