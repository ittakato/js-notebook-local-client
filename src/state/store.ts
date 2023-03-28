import { configureStore } from '@reduxjs/toolkit';

import rootReducer from './reducers';
import { cellSliceActions } from './reducers/cellReducer';

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

store.dispatch(
  cellSliceActions.insertCellBefore({
    id: null,
    type: 'code',
  })
);

store.dispatch(
  cellSliceActions.insertCellBefore({
    id: null,
    type: 'text',
  })
);

export default store;
