import { createSlice,PayloadAction } from '@reduxjs/toolkit';
import { Page,PageState } from './type';
import { pageList } from './parameter';

const initialPageState: PageState = {
  selected:pageList[0] as Page,
  list:pageList 
}

export const pageSlice = createSlice({
  name: 'page',
  initialState: initialPageState,
  reducers: {
    selected: (state: PageState,action:PayloadAction<Page>) => {
      state.selected = action.payload;
    },
  }
});

export default pageSlice;