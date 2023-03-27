import type { CellType } from '../cell';

type Direction = 'up' | 'down';

interface MoveCellPayload {
  id: string;
  direction: Direction;
}

interface DeleteCellPayload {
  id: string;
}

interface InsertCellBeforePayload {
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
  | InsertCellBeforePayload
  | UpdateCellPayload;

export type {
  Direction,
  MoveCellPayload,
  DeleteCellPayload,
  InsertCellBeforePayload,
  UpdateCellPayload,
  CellActionPayload,
};
