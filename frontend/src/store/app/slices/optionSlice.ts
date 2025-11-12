import {
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
  type PayloadAction,
} from '@reduxjs/toolkit';

import { fetchOptions, sendSelectedOption } from '@/store/app';
import type { AppState, Option } from '@/types';

const initialState: AppState = {
  options: [],
  selectedOption: null,
  message: '',
  loading: false,
  error: null,
};

const optionSlice = createSlice({
  name: 'optionSlice',
  initialState,
  reducers: {
    setSelectedOption: (state, action: PayloadAction<Option | null>) => {
      state.selectedOption = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOptions.fulfilled, (state, action) => {
        state.options = action.payload;
      })
      .addCase(sendSelectedOption.fulfilled, (state, action) => {
        state.message = action.payload.message;
      })

      .addMatcher(isPending(fetchOptions, sendSelectedOption), (state) => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher(isFulfilled(fetchOptions, sendSelectedOption), (state) => {
        state.loading = false;
      })
      .addMatcher(
        isRejected(fetchOptions, sendSelectedOption),
        (state, action) => {
          state.loading = false;
          state.error =
            typeof action.payload === 'string'
              ? action.payload
              : 'Unexpected error';
        },
      );
  },
});

export const { setSelectedOption } = optionSlice.actions;
export default optionSlice.reducer;
