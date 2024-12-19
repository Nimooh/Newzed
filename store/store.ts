import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './reducers/dataSlice';

const store = configureStore({
  reducer: {
    datas: dataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
