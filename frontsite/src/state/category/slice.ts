import { createSlice,PayloadAction } from '@reduxjs/toolkit';
import { Category,CategoryState } from './type';
import { 
  fetchAsyncList,fetchAsyncInsert,fetchAsyncUpdate
} from './operation';

const initialCategoryState: CategoryState = {
  selected:{} as Category,
  list:[] as Category[]
}

export const categorySlice = createSlice({
  name: 'category',
  initialState: initialCategoryState,
  reducers: {
    selected: (state:CategoryState,action:PayloadAction<Category>) => {
      state.selected = action.payload
    },
  },
  extraReducers:(builder) => {
    builder.addCase(fetchAsyncList.fulfilled, (state:CategoryState, action:PayloadAction<any>) => {
      return{...state,
        list: action.payload
      }
    })
    .addCase(fetchAsyncList.pending,(state:CategoryState,action) =>{
      return {...state}
    })
    .addCase(fetchAsyncList.rejected,(state:CategoryState,action) =>{
      return {...state}
    })
    .addCase(fetchAsyncInsert.fulfilled, (state:CategoryState,action) => {
      return {...state}
    })
    .addCase(fetchAsyncUpdate.fulfilled, (state:CategoryState,action) => {
      return {...state}
    })
  }
});

export default categorySlice;