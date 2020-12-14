import { createSlice,PayloadAction } from '@reduxjs/toolkit';
import { Power,PowerState } from './type';
import { fetchAsyncList } from './operation';

const initialPowerState: PowerState = {
  selected:{} as Power,
  list:[] as Power[],
  asyncStatus:''
}

const powerSlice = createSlice({
  name: 'power',
  initialState: initialPowerState,
  reducers: {
    selected(state: PowerState,action:PayloadAction<Power>) {
      state.selected = action.payload;
    },
  },
  extraReducers:(builder) => {
    builder.addCase(fetchAsyncList.fulfilled, (state:PowerState, action:PayloadAction<Power[]>) => {
      return {
        ...state,
        list: action.payload,
        asyncStatus: 'SUCCESS'
      }
    })
  }
});

export default powerSlice;
