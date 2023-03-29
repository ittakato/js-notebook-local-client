import { Dispatch } from 'redux';
import axios from 'axios';

import { cellSliceActions } from '../reducers';

import { type Cell } from '../cell';

function fetchCells() {
  return async (dispatch: Dispatch) => {
    dispatch(cellSliceActions.fetchCellsStart());

    try {
      const { data }: { data: Cell[] } = await axios.get('/cells');
      dispatch(cellSliceActions.fetchCellsComplete({ data: data }));
    } catch (error) {
      if (error instanceof Error) {
        dispatch(cellSliceActions.fetchCellsError({ error: error.message }));
      }
    }
  };
}

export { fetchCells };
