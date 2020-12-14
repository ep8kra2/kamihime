import { createSlice,PayloadAction } from '@reduxjs/toolkit';
import { Skill,SkillEffect,SkillState } from './type';
import { fetchAsyncList,
  fetchAsyncInsert,
  fetchAsyncUpdate,
  fetchAsyncSelectedListEffect,
  fetchAsyncInsertEffect,
  fetchAsyncUpdateEffect
} from './operation';

const initialSkillState: SkillState = {
  selected:{} as Skill,
  selectedEffect:{} as SkillEffect,
  selectedEffectList:[] as SkillEffect[],
  list:[] as Skill[]
}

const skillSlice = createSlice({
  name: 'skill',
  initialState: initialSkillState,
  reducers: {
    selected(state: SkillState,action:PayloadAction<Skill>) {
      state.selected = action.payload;
    },
  },
  extraReducers:(builder) => {
    builder.addCase(fetchAsyncList.fulfilled, (state, action) => {
      return {
        ...state,
        list: action.payload
      }
    })
    .addCase(fetchAsyncUpdate.fulfilled, (state, action) => {
      return {
        ...state
      }
    })
    .addCase(fetchAsyncInsert.fulfilled, (state, action) => {
      return {
        ...state
      }
    })
    .addCase(fetchAsyncSelectedListEffect.fulfilled, (state, action) => {
      return {
        ...state,
        selectedEffectList: action.payload
      }
    })
    .addCase(fetchAsyncInsertEffect.fulfilled, (state, action) => {
      return {
        ...state
      }
    })
    .addCase(fetchAsyncUpdateEffect.fulfilled, (state, action) => {
      return {
        ...state
      }
    })
  }
});

export default skillSlice;
