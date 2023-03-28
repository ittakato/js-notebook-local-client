import type { CellType } from '../cell';

type Direction = 'up' | 'down';

interface MoveCellPayload {
  id: string;
  direction: Direction;
}

interface DeleteCellPayload {
  id: string;
}

interface InsertCellAfterPayload {
  id: string | null;
  type: CellType;
}

interface UpdateCellPayload {
  id: string;
  content: string;
}

type CellActionPayload =
  | MoveCellPayload
  | DeleteCellPayload
  | InsertCellAfterPayload
  | UpdateCellPayload;

export type {
  Direction,
  MoveCellPayload,
  DeleteCellPayload,
  InsertCellAfterPayload,
  UpdateCellPayload,
  CellActionPayload,
};
