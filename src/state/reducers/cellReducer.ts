import { ActionType } from '../action-types';

import type { Action } from '../actions';
import type { Cell } from '../cell';

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

function cellReducer(
  state: CellState = initialCellState,
  action: Action
): CellState {
  switch (action.type) {
    case ActionType.UPDATE_CELL:
      return state;
    case ActionType.DELETE_CELL:
      return state;
    case ActionType.MOVE_CELL:
      return state;
    case ActionType.INSERT_CELL_BEFORE:
      return state;
    default:
      return state;
  }
}

export default cellReducer;
