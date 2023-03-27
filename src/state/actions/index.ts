import { ActionType } from '../action-types';
import type { CellType } from '../cell';

interface MoveCellAction {
  type: ActionType;
  payload: {
    id: string;
    direction: 'up' | 'down';
  };
}

interface DeleteCellAction {
  type: ActionType.DELETE_CELL;
  payload: string;
}

interface InsertCellBeforeAction {
  type: ActionType.INSERT_CELL_BEFORE;
  payload: {
    id: string;
    type: CellType;
  };
}

interface UpdateCellAction {
  type: ActionType.UPDATE_CELL;
  payload: {
    id: string;
    content: string;
  };
}

type Action =
  | MoveCellAction
  | DeleteCellAction
  | InsertCellBeforeAction
  | UpdateCellAction;

export type { Action };
