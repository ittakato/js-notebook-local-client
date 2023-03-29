import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type {
  MoveCellPayload,
  DeleteCellPayload,
  InsertCellAfterPayload,
  UpdateCellPayload,
  FetchCellsCompletePayload,
  FetchCellsErrorPayload,
  SaveCellsErrorPayload,
} from '../actions-payload';
import { type Cell } from '../cell';

interface CellState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [Key: string]: Cell;
  };
}

const initialCellState: CellState = {
  loading: false,
  error: null,
  order: [],
  data: {},
};

const cellSlice = createSlice({
  name: 'cell',
  initialState: initialCellState,
  reducers: {
    updateCell: (
      state: CellState,
      action: PayloadAction<UpdateCellPayload>
    ) => {
      state.data[action.payload.id].content = action.payload.content;
    },
    deleteCell: (
      state: CellState,
      action: PayloadAction<DeleteCellPayload>
    ) => {
      delete state.data[action.payload.id];
      state.order = state.order.filter((id) => id !== action.payload.id);
    },
    moveCell: (state: CellState, action: PayloadAction<MoveCellPayload>) => {
      const index = state.order.findIndex((id) => id === action.payload.id);
      const targetIndex =
        action.payload.direction === 'up' ? index - 1 : index + 1;

      if (targetIndex < 0 || targetIndex >= state.order.length) {
        return;
      }

      state.order[index] = state.order[targetIndex];
      state.order[targetIndex] = action.payload.id;
    },
    insertCellAfter: (
      state: CellState,
      action: PayloadAction<InsertCellAfterPayload>
    ) => {
      const cell: Cell = {
        content: '',
        type: action.payload.type,
        id: crypto.randomUUID(),
      };

      state.data[cell.id] = cell;

      if (action.payload.id === null) {
        state.order.unshift(cell.id);
        return;
      }

      const index = state.order.findIndex((id) => id === action.payload.id);

      if (index === -1) {
        state.order.unshift(cell.id);
      } else {
        state.order.splice(index + 1, 0, cell.id);
      }
    },
    fetchCellsStart: (state: CellState) => {
      state.loading = true;
      state.error = null;
    },
    fetchCellsComplete: (
      state: CellState,
      action: PayloadAction<FetchCellsCompletePayload>
    ) => {
      state.order = action.payload.data.map((cell) => cell.id);
      state.data = action.payload.data.reduce((acc, cell) => {
        acc[cell.id] = cell;
        return acc;
      }, {} as CellState['data']);
      state.loading = false;
      state.error = null;
    },
    fetchCellsError: (
      state: CellState,
      action: PayloadAction<FetchCellsErrorPayload>
    ) => {
      state.loading = false;
      state.error = action.payload.error;
    },
    saveCellsError: (
      state: CellState,
      action: PayloadAction<SaveCellsErrorPayload>
    ) => {
      state.error = action.payload.error;
    },
  },
});

export type { CellState };
export const cellSliceActions = cellSlice.actions;
export default cellSlice.reducer;
