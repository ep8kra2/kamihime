import { createSlice,PayloadAction } from '@reduxjs/toolkit';
import { Weapon,WeaponState } from './type';
import { 
  fetchAsyncList,
  fetchAsyncInsert,
  fetchAsyncUpdate
 } from './operation';

const initialWeaponState: WeaponState = {
  selected:{} as Weapon,
  list:[] as Weapon[]
}

const weaponSlice = createSlice({
  name: 'weapon',
  initialState: initialWeaponState,
  reducers: {
    selected(state: WeaponState,action:PayloadAction<Weapon>) {
      state.selected = action.payload;
    }
  },
  extraReducers:(builder) => {
    builder
    .addCase(fetchAsyncList.fulfilled, (state:WeaponState, action:PayloadAction<Weapon[]>) => {
      return{
        ...state,
        list:action.payload
      }
    })
    .addCase(fetchAsyncInsert.fulfilled, (state:WeaponState, action) => {
      return{
        ...state
      }
    })
    .addCase(fetchAsyncUpdate.fulfilled, (state:WeaponState, action) => {
      return{
        ...state
      }
    })
  }
});

export default weaponSlice;
