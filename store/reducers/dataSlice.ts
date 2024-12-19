import { PostType } from '@/constants/PostType';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DataState {
  datas: PostType[];
}

const initialState: DataState = {
  datas: [],
};

const dataSlice = createSlice({
  name: 'datas',
  initialState,
  reducers: {
    setDatas: (state, action: PayloadAction<PostType[]>) => {
      state.datas = action.payload;
    },
    clearDatas: (state) => {
      state.datas = [];
    },
  },
});

export const { setDatas, clearDatas } = dataSlice.actions;

export default dataSlice.reducer;
