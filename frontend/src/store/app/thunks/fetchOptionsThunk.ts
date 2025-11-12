import { createAsyncThunk } from '@reduxjs/toolkit';

import { fetchOptionsApi } from '@/api/options';
import type { Option } from '@/types';

export const fetchOptions = createAsyncThunk<Option[], void>(
  'options/fetchOptions',
  async (_, { rejectWithValue }) => {
    try {
      return await fetchOptionsApi();
    } catch (err) {
      return rejectWithValue(
        err instanceof Error ? err.message : 'Unknown error occurred',
      );
    }
  },
);
