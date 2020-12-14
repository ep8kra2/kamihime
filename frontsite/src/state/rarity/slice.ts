import { createSlice,PayloadAction } from '@reduxjs/toolkit';
import { Rarity,RarityState } from './type';
import { fetchAsyncList } from './operation';

const initialRarityState: RarityState = {
  selected:{} as Rarity,
  list:[] as Rarity[],
  asyncStatus:''
}

const raritySlice = createSlice({
  name: 'rarity',
  initialState: initialRarityState,
  reducers: {
    selected(state: RarityState,action:PayloadAction<Rarity>) {
      state.selected = action.payload;
    },
  },
  extraReducers:(builder) => {
    builder.addCase(fetchAsyncList.fulfilled, (state:RarityState, action:PayloadAction<Rarity[]>) => {
      return {
        ...state,
        list: action.payload,
        asyncStatus: 'SUCCESS'
      }
    })
  }
});

export default raritySlice;