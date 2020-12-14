import { createSlice,PayloadAction } from '@reduxjs/toolkit';
import { WeaponType,WeaponTypeState } from './type';
import { 
  fetchAsyncList
 } from './operation';

const initialWeaponTypeState: WeaponTypeState = {
  selected:{} as WeaponType,
  list:[] as WeaponType[]
}

const weaponTypeSlice = createSlice({
  name: 'weaponType',
  initialState: initialWeaponTypeState,
  reducers: {
    selected(state: WeaponTypeState,action:PayloadAction<WeaponType>) {
      state.selected = action.payload;
    }
  },
  extraReducers:(builder) => {
    builder
    .addCase(fetchAsyncList.fulfilled, (state:WeaponTypeState, action:PayloadAction<WeaponType[]>) => {
      return{
        ...state,
        list:action.payload
      }
    })
  }
});

export default weaponTypeSlice;
