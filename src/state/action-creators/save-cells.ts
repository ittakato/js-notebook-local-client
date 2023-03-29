import { Dispatch } from 'redux';
import axios from 'axios';

import { cellSliceActions, type RootState } from '../reducers';

function saveCells() {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    const { cell: cellState } = getState();

    const cells = cellState.order.map((id) => cellState.data[id]);

    try {
      await axios.post('/cells', { cells });
    } catch (error) {
      if (error instanceof Error) {
        dispatch(
          cellSliceActions.saveCellsError({
            error: error.message,
          })
        );
      }
    }
  };
}

export { saveCells };
