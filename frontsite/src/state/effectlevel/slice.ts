import { createSlice,PayloadAction } from '@reduxjs/toolkit';
import { EffectLevel,EffectLevelDetail,EffectLevelState } from './type';
import { 
  fetchAsyncList,
  fetchAsyncInsert,
  fetchAsyncUpdate,
  fetchAsyncSelectedDetailList,
  fetchAsyncDetailList,
  fetchAsyncDetailUpdate,
  fetchAsyncDetailInsert
} from './operation';

const initialEffectLevelState: EffectLevelState = {
  selected:{} as EffectLevel,
  list:[] as EffectLevel[],
  selectedDetailList:[] ,
  detailList:[] as EffectLevelDetail[],
  asyncStatus:''
}

export const effectLevelSlice = createSlice({
  name: 'effectLevel',
  initialState: initialEffectLevelState,
  reducers: {
    selected: (state:EffectLevelState,action:PayloadAction<EffectLevel>) => {
      state.selected = action.payload
    }
  },
  extraReducers:(builder) => {
    builder
      .addCase(fetchAsyncList.fulfilled,(state:EffectLevelState,action:PayloadAction<EffectLevel[]>) => {
        return {
          ...state,
          list:action.payload
        }
      })
      .addCase(fetchAsyncInsert.fulfilled,(state:EffectLevelState,action:PayloadAction<{}>) => {
        return {
          ...state,
          asyncStateus:'SUCCESS'
        }
      })
      .addCase(fetchAsyncInsert.pending,(state:EffectLevelState,action:PayloadAction<unknown>) => {
        return {
          ...state,
          asyncStateus:'LOADING...'
        }
      })
      .addCase(fetchAsyncInsert.rejected,(state:EffectLevelState,action:PayloadAction<unknown>) => {
        return {
          ...state,
          asyncStateus:'FAILED'
        }
      })
      .addCase(fetchAsyncUpdate.fulfilled,(state:EffectLevelState,action:PayloadAction<{}>) => {
        return {
          ...state,
          asyncStateus:'SUCCESS'
        }
      })
      .addCase(fetchAsyncSelectedDetailList.fulfilled,(state:EffectLevelState,action:PayloadAction<EffectLevelDetail[]>) => {
        return {
          ...state,
          selectedDetailList:action.payload
        }
      })
      .addCase(fetchAsyncDetailList.fulfilled,(state:EffectLevelState,action:PayloadAction<EffectLevelDetail[]>) => {
        return {
          ...state,
          detailList:action.payload
        }
      })
      .addCase(fetchAsyncDetailInsert.fulfilled,(state:EffectLevelState,action) => {
        return {
          ...state,
          asyncStateus:action.payload
        }
      })
      .addCase(fetchAsyncDetailUpdate.fulfilled,(state:EffectLevelState,action) => {
        return {
          ...state,
          asyncStateus:action.payload
        }
      })
  }
});

export default effectLevelSlice;