import { combineReducers } from 'redux';

import cellReducer from './cellReducer';

const rootReducer = combineReducers({
  cell: cellReducer,
});

export default rootReducer;
