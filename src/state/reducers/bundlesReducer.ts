import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type {
  BundleCompletePayload,
  BundleStartPayload,
} from '../actions-payload';

interface BundleState {
  [Key: string]:
    | {
        loading: boolean;
        code: string;
        error: string;
      }
    | undefined;
}

const initialBundleState: BundleState = {};

const bundleSlice = createSlice({
  name: 'bundle',
  initialState: initialBundleState,
  reducers: {
    bundleStart: (
      state: BundleState,
      action: PayloadAction<BundleStartPayload>
    ) => {
      state[action.payload.cellId] = {
        loading: true,
        code: '',
        error: '',
      };
    },
    bundleComplete: (
      state: BundleState,
      action: PayloadAction<BundleCompletePayload>
    ) => {
      state[action.payload.cellId] = {
        loading: false,
        code: action.payload.bundle.code,
        error: action.payload.bundle.error,
      };
    },
  },
});

export const bundleSliceActions = bundleSlice.actions;
export default bundleSlice.reducer;
