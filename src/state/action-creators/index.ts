import type { Direction } from '../actions';
import type { CellType } from '../cell';

function updateCell(id: string, content: string) {
  return {
    id,
    content,
  };
}

function deleteCell(id: string) {
  return id;
}

function moveCell(id: string, direction: Direction) {
  return {
    id,
    direction,
  };
}

function insertCellBefore(id: string, cellType: CellType) {
  return {
    id,
    type: cellType,
  };
}

export { updateCell, deleteCell, moveCell, insertCellBefore };
