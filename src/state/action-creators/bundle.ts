import { Dispatch } from 'redux';
import bundle from '../../bundler';

import { bundleSliceActions } from '../reducers/bundlesReducer';

function createBundle(cellId: string, input: string) {
  return async (dispatch: Dispatch) => {
    dispatch(
      bundleSliceActions.bundleStart({
        cellId,
      })
    );

    const result = await bundle(input);

    dispatch(
      bundleSliceActions.bundleComplete({
        cellId,
        bundle: result,
      })
    );
  };
}

export { createBundle };
