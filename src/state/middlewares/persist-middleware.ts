import { type Middleware } from 'redux';

import { saveCells } from '../action-creators';
import { cellSliceActions, type RootState } from '../reducers';

// eslint-disable-next-line @typescript-eslint/ban-types
const persistMiddleware: Middleware<{}, RootState> = ({
  dispatch,
  getState,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  let timer: any;

  return (next) => {
    return (action) => {
      next(action);

      if (
        [
          cellSliceActions.deleteCell.type,
          cellSliceActions.updateCell.type,
          cellSliceActions.insertCellAfter.type,
          cellSliceActions.moveCell.type,
        ].includes(action.type)
      ) {
        if (timer) {
          clearTimeout(timer);
        }
        timer = setTimeout(() => {
          saveCells()(dispatch, getState);
        }, 250);
      }
    };
  };
};

export { persistMiddleware };
