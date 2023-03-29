import { type Cell, type CellType } from '../cell';

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

interface FetchCellsCompletePayload {
  data: Cell[];
}

interface FetchCellsErrorPayload {
  error: string;
}

interface SaveCellsErrorPayload {
  error: string;
}

export type {
  Direction,
  MoveCellPayload,
  DeleteCellPayload,
  InsertCellAfterPayload,
  UpdateCellPayload,
  FetchCellsCompletePayload,
  FetchCellsErrorPayload,
  SaveCellsErrorPayload,
};
