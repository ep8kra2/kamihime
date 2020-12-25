import { createSlice,PayloadAction } from '@reduxjs/toolkit';
import { Impact,ImpactState } from './type';
import { fetchAsyncInsert, fetchAsyncList, fetchAsyncUpdate } from './operation';

const initialImpactState: ImpactState = {
  selected:{} as Impact,
  list:[] as Impact[],
  asyncStatus:''
}

const impactSlice = createSlice({
  name: 'impact',
  initialState: initialImpactState,
  reducers: {
    selected(state: ImpactState,action:PayloadAction<Impact>) {
      state.selected = action.payload;
    },
  },
  extraReducers:(builder) => {
    builder.addCase(fetchAsyncList.fulfilled, (state:ImpactState, action:PayloadAction<Impact[]>) => {
      return {
        ...state,
        list: action.payload,
        asyncStatus: 'SUCCESS'
      }
    })
    .addCase(fetchAsyncInsert.fulfilled,(state:ImpactState,action:PayloadAction<unknown>) => {
      return {
        ...state
      }
    })
    .addCase(fetchAsyncUpdate.fulfilled,(state:ImpactState,action:PayloadAction<unknown>) => {
      return {
        ...state
      }
    })
  }
});

export default impactSlice;
