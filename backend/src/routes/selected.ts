import express from 'express';

import { AppError } from '../utils/AppError';

const router = express.Router();

router.post('/', (req, res, next) => {
  try {
    const { value } = req.body;
    if (!value) {
      return res.status(400).json({ message: 'Value is required' });
    }
    const num = parseInt(value);

    if (isNaN(num) || num < 1 || num > 1000) {
      throw new AppError('Value must be a number between 1 and 1000', 400);
    }

    res.json({
      message: `Выбранная опция ${value} успешно принята.`,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
