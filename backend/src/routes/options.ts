import express from 'express';

import db from '../db/lowdb';

const router = express.Router();

router.get('/', async (_, res, next) => {
  try {
    await db.read();
    res.status(200).json(db.data?.options || []);
  } catch (error) {
    next(error);
  }
});

export default router;
