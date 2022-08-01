import Video from '../Modals/Video.js';
import { createError } from '../error.js';
import User from '../Modals/User.js';

export const addVideo = async (req, res, next) => {
  const newVideo = new Video({ userID: req.user.id, ...req.body });
  try {
    const savedVieo = await newVideo.save();
    res.status(200).json(savedVieo);
  } catch (error) {
    next(error);
  }
};

export const updateVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return next(createError(404, 'Video not found..!'));

    if (req.user.id === video.userID) {
      const updatedVideo = await Video.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedVideo);
    } else
      return next(createError(403, 'You do not have access to this video..!'));
  } catch (error) {
    next(error);
  }
};

export const deleteVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return next(createError(404, 'Video does not exist..!'));

    if (req.user.id === video.userID) {
      await Video.findByIdAndDelete(req.params.id);
      res.status(200).json('Video has been deleted..!');
    } else return next(403, 'You do not have access to the video..!');
  } catch (error) {
    next(error);
  }
};

export const getVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    res.status(200).json(video);
  } catch (error) {
    next(error);
  }
};

export const addViews = async (req, res, next) => {
  try {
    await Video.findByIdAndUpdate(req.params.id, {
      $inc: { views: 1 },
    });
    res.status(200).json('Views has been increased..!');
  } catch (error) {
    next(error);
  }
};

export const trendingVideos = async (req, res, next) => {
  try {
    const trending = await Video.find().sort({ views: -1 });
    res.status(200).json(trending);
  } catch (error) {
    next(error);
  }
};

export const randomVideos = async (req, res, next) => {
  try {
    const randVideos = await Video.aggregate([{ $sample: { size: 40 } }]);
    res.status(200).json(randVideos);
  } catch (error) {
    next(error);
  }
};

export const subVideos = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const subChannels = user.subscribedUsers;

    const list = await Promise.all(
      subChannels.map((channelID) => {
        return Video.find({ userID: channelID });
      })
    );
    res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt));
  } catch (error) {
    next(error);
  }
};
