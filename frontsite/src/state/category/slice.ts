import { createSlice,PayloadAction } from '@reduxjs/toolkit';
import { Category,CategoryState,CategoryDetail } from './type';
import { 
  fetchAsyncList,fetchAsyncInsert,fetchAsyncUpdate,
  fetchAsyncDetailInsert,fetchAsyncDetailUpdate,
  fetchAsyncDetailList
} from './operation';

const initialCategoryState: CategoryState = {
  selected:{} as Category,
  list:[] as Category[],
  detailSelected:{} as CategoryDetail,
  detailList:[] as CategoryDetail[]
}

export const categorySlice = createSlice({
  name: 'category',
  initialState: initialCategoryState,
  reducers: {
    selected: (state:CategoryState,action:PayloadAction<Category>) => {
      state.selected = action.payload
    },
    detailSelected: (state:CategoryState,action:PayloadAction<CategoryDetail>) => {
      state.detailSelected = action.payload
    }
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
    .addCase(fetchAsyncDetailList.fulfilled, (state:CategoryState,action) => {
      state.detailList = action.payload
    })    

    .addCase(fetchAsyncDetailInsert.fulfilled, (state:CategoryState,action) => {
      return {...state}
    })
    .addCase(fetchAsyncDetailUpdate.fulfilled, (state:CategoryState,action) => {
      return {...state}
    })
  }
});

export default categorySlice;