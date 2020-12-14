import { createSlice,PayloadAction } from '@reduxjs/toolkit';
import { Effect,EffectState,EffectPower } from './type';
import { 
  fetchEffctPowerList,
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
      .addCase(fetchEffctPowerList.fulfilled, (state:EffectState, action:PayloadAction<any>) => {
      state.list = action.payload.filter((effectpower:EffectPower) => {return (effectpower.id > 0)}).map((effectpower:EffectPower) => {
        console.log(effectpower)
        return(
          {
            id:effectpower.effectId,
            name:effectpower.effectName,
            slot:effectpower.slot,
            e1: effectpower.elementId === 1 ? effectpower.power : 0,
            e2: effectpower.elementId === 2 ? effectpower.power : 0,
            e3: effectpower.elementId === 3 ? effectpower.power : 0,
            e4: effectpower.elementId === 4 ? effectpower.power : 0,
            e5: effectpower.elementId === 5 ? effectpower.power : 0,
            e6: effectpower.elementId === 6 ? effectpower.power : 0,
            e7: effectpower.elementId === 7 ? effectpower.power : 0,
            cal: vegolus
          }
        )
      }) as Effect[]
    })
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