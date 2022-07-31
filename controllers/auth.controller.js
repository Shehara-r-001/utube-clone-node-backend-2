import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../Modals/User.js';
import { createError } from '../error.js';
import jwt from 'jsonwebtoken';

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

    const token = jwt.sign({ id: user._id }, process.env.JWT);
    const { password, ...otherDetails } = user._doc;
    res
      .cookie('access_token', token, {
        httpOnly: true,
      })
      .status(200)
      .json(otherDetails);
  } catch (error) {
    next(error);
  }
};
