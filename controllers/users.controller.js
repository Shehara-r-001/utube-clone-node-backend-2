import User from '../Modals/User.js';
import { createError } from '../error.js';
import Video from '../Modals/Video.js';

export const updateUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
  } else
    return next(createError(403, 'You do not have access to this account..!'));
};

export const deleteUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json('User has been deleted..!');
    } catch (error) {
      next(error);
    }
  } else
    return next(createError(403, 'You do not have access to this account..!'));
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const subUser = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      $push: { subscribedUsers: req.params.id },
    });
    await User.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: 1 },
    });
    res.status(200).json('Successfully subscribed..!');
  } catch (error) {
    next(error);
  }
};

export const unsubUser = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      $pull: { subscribedUsers: req.params.id },
    });
    await User.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: -1 },
    });
    res.status(200).json('Successfully unsubscribed..!');
  } catch (error) {
    next(error);
  }
};

export const likeVideo = async (req, res, next) => {
  const id = req.user.id;
  const videoID = req.params.videoID;
  try {
    await Video.findByIdAndUpdate(videoID, {
      $addToSet: { likes: id },
      $pull: { dislikes: id },
    });
    res.status(200).json('Video has been liked');
  } catch (error) {
    next(error);
  }
};

export const dislikeVideo = async (req, res, next) => {
  const id = req.user.id;
  const videoID = req.params.videoID;
  try {
    await Video.findByIdAndUpdate(videoID, {
      $addToSet: { dislikes: id },
      $pull: { likes: id },
    });
    res.status(200).json('Video has been disliked');
  } catch (error) {
    next(error);
  }
};
