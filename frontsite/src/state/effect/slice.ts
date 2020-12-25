import { createSlice,PayloadAction } from '@reduxjs/toolkit';
import { Effect,EffectState,EffectPower } from './type';
import { 
  fetchAsyncList,
  fetchAsyncInsert,
  fetchAsyncUpdate,
} from './operation';

const initialEffectState: EffectState = {
  selected:{} as Effect,
  list:[] as Effect[],
}

export const vegolus = (power:number,hpRate:number) => {
  return power;
} 

export const effectSlice = createSlice({
  name: 'effect',
  initialState: initialEffectState,
  reducers: {
  },
  extraReducers:(builder) => {
    builder
    .addCase(fetchAsyncList.fulfilled,(state:EffectState,action:PayloadAction<Effect[]>) => {
      return {
        ...state,
        list:action.payload
      }
    })
    .addCase(fetchAsyncInsert.fulfilled,(state:EffectState,action:PayloadAction<{}>) => {
      return {
        ...state
      }
    })
    .addCase(fetchAsyncUpdate.fulfilled,(state:EffectState,action:PayloadAction<{}>) => {
      return {
        ...state
      }
    })
  }
});

export default effectSlice;