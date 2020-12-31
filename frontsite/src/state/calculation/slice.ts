import { createSlice,PayloadAction } from '@reduxjs/toolkit';
import { Calculation,CalculationState } from './type';
import { 
  fetchAsyncList,
  fetchAsyncInsert,
  fetchAsyncUpdate,
} from './operation';

const initialCalculationState: CalculationState = {
  selected:{} as Calculation,
  list:[] as Calculation[],
}

export const calculationSlice = createSlice({
  name: 'calculation',
  initialState: initialCalculationState,
  reducers: {
    
  },
  extraReducers:(builder) => {
    builder
    .addCase(fetchAsyncList.fulfilled,(state:CalculationState,action:PayloadAction<Calculation[]>) => {
      return {
        ...state,
        list:action.payload
      }
    })
    .addCase(fetchAsyncInsert.fulfilled,(state:CalculationState,action:PayloadAction<unknown>) => {
      return {
        ...state
      }
    })
    .addCase(fetchAsyncUpdate.fulfilled,(state:CalculationState,action:PayloadAction<unknown>) => {
      return {
        ...state
      }
    })
  }
});

export default calculationSlice;