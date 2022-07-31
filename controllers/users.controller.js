import User from '../Modals/User.js';

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
  } else return next(403, 'You do not have access to this account..!');
};

export const deleteUser = (req, res, next) => {};

export const getUser = (req, res, next) => {};

export const subUser = (req, res, next) => {};

export const unsubUser = (req, res, next) => {};

export const likeVideo = (req, res, next) => {};

export const dislikeVideo = (req, res, next) => {};
