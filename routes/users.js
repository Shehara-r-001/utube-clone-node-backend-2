import express from 'express';
import {
  deleteUser,
  dislikeVideo,
  getUser,
  likeVideo,
  subUser,
  unsubUser,
  updateUser,
} from '../controllers/users.controller.js';
import { verifyToken } from '../verifyToken.js';

const router = express.Router();

// update a user
router.put('/:id', verifyToken, updateUser);

// delete a user
router.delete('/:id', deleteUser);

// find a user
router.get('/find/:id', getUser);

// subscribe
router.put('/sub/:id', subUser);

// unsub
router.put('/unsub/:id', unsubUser);

// like
router.put('/like/:videoID', likeVideo);

// dislike
router.put('/dislike/:id', dislikeVideo);

export default router;
