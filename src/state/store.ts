import { configureStore } from '@reduxjs/toolkit';

import rootReducer from './reducers';
import { persistMiddleware } from './middlewares/persist-middleware';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(persistMiddleware),
});

export type AppDispatch = typeof store.dispatch;

export default store;
