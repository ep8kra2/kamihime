import { createSlice,PayloadAction } from '@reduxjs/toolkit';
import { Phantom,PhantomState } from './type';
import { fetchAsyncInsert, fetchAsyncList, fetchAsyncUpdate } from './operation';

const initialPhantomState: PhantomState = {
  selected:{} as Phantom,
  list:[] as Phantom[],
  asyncStatus:''
}

const phantomSlice = createSlice({
  name: 'phantom',
  initialState: initialPhantomState,
  reducers: {
    selected(state: PhantomState,action:PayloadAction<Phantom>) {
      state.selected = action.payload;
    },
  },
  extraReducers:(builder) => {
    builder.addCase(fetchAsyncList.fulfilled, (state:PhantomState, action:PayloadAction<Phantom[]>) => {
      return {
        ...state,
        list: action.payload,
        asyncStatus: 'SUCCESS'
      }
    })
    .addCase(fetchAsyncList.pending, (state:PhantomState, action:PayloadAction<unknown>) => {
      return {
        ...state,
        asyncStatus: 'LOADING'
      }
    })
    .addCase(fetchAsyncList.rejected, (state:PhantomState, action:PayloadAction<unknown>) => {
      return {
        ...state,
        asyncStatus: 'FAILED'
      }
    })
    .addCase(fetchAsyncInsert.fulfilled,(state:PhantomState,action:PayloadAction<unknown>) => {
      return {
        ...state,
        asyncStatus: 'SUCCESS'
      }
    })
    .addCase(fetchAsyncInsert.pending,(state:PhantomState,action:PayloadAction<unknown>) => {
      return {
        ...state,
        asyncStatus: 'LOADING'
      }
    })
    .addCase(fetchAsyncInsert.rejected,(state:PhantomState,action:PayloadAction<unknown>) => {
      return {
        ...state,
        asyncStatus: 'FAILED'
      }
    })
    .addCase(fetchAsyncUpdate.fulfilled,(state:PhantomState,action:PayloadAction<unknown>) => {
      return {
        ...state,
        asyncState: 'SUCCESS'
      }
    })
    .addCase(fetchAsyncUpdate.pending,(state:PhantomState,action:PayloadAction<unknown>) => {
      return {
        ...state,
        asyncState: 'LOADING'
      }
    })
    .addCase(fetchAsyncUpdate.rejected,(state:PhantomState,action:PayloadAction<unknown>) => {
      return {
        ...state,
        asyncState: 'FAILED'
      }
    })
  }
});

export default phantomSlice;
