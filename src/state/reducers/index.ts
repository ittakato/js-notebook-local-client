import { combineReducers } from 'redux';

import cellReducer, { cellSliceActions } from './cellReducer';
import bundlesReducer from './bundlesReducer';

const rootReducer = combineReducers({
  cell: cellReducer,
  bundle: bundlesReducer,
});

export { cellSliceActions };
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
