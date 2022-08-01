import express from 'express';
import {
  addVideo,
  deleteVideo,
  getVideo,
  randomVideos,
  subVideos,
  trendingVideos,
  updateVideo,
} from '../controllers/video.controller.js';
import { verifyToken } from '../verifyToken.js';

const router = express.Router();

router.post('/', verifyToken, addVideo);

router.put('/:id', verifyToken, updateVideo);

router.delete('/:id', verifyToken, deleteVideo);

router.get('/find/:id', getVideo);

router.put('/view/:id');

router.get('/trending', trendingVideos);

router.get('/random', randomVideos);

router.get('/sub', verifyToken, subVideos);

export default router;
