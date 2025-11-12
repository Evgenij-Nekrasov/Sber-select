import { createAsyncThunk } from '@reduxjs/toolkit';

import { sendSelectedApi } from '@/api/options';

export const sendSelectedOption = createAsyncThunk<{ message: string }, string>(
  'options/sendSelectedOption',
  async (value, { rejectWithValue }) => {
    try {
      return await sendSelectedApi(value);
    } catch (err) {
      return rejectWithValue(
        err instanceof Error ? err.message : 'Unknown error',
      );
    }
  },
);
