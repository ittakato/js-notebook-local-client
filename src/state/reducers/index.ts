import { combineReducers } from 'redux';

import cellReducer, { cellSliceActions } from './cellReducer';

const rootReducer = combineReducers({
  cell: cellReducer,
});

export { cellSliceActions };

export default rootReducer;
