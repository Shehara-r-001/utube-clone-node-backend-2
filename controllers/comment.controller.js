import Video from '../Modals/Video.js';
import Comment from '../Modals/Comment.js';
import { createError } from '../error.js';

export const addComment = async (req, res, next) => {
  const newComment = new Comment({ ...req.body, userID: req.user.id });
  try {
    const savedComment = await newComment.save();
    res.status(200).json(savedComment);
  } catch (error) {
    next(error);
  }
};

export const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);
    const video = await Video.findById(req.params.id);
    if (req.user.id === comment.userID || req.user.id === video.userID) {
      await Comment.findByIdAndDelete(req.params.id);
      res.status(200).json('Comment has been deleted..!');
    } else return next(createError(403, 'You can not delete this comment..!'));
  } catch (error) {
    next(error);
  }
};

export const getComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ videoID: req.params.videoID });
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};
