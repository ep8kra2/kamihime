import { createSlice,PayloadAction } from '@reduxjs/toolkit';
import { Weapon } from '../weapon/type';
import { CalcurateState,Parameter,SelectedPhantom,SelectedWeapon } from './type';
import { Phantom } from '../phantom/type';
import { Effect } from '../effect/type';
import { SkillEffect } from '../skill/type';
import { EffectLevel, EffectLevelDetail } from '../effectlevel/type';
import { Impact } from '../impact/type';

const initialCalcurateState: CalcurateState = {
  selectedWeapon:{} as SelectedWeapon,
  listWeapon:[
    {...{} as SelectedWeapon,slot:1,marks:'英霊'},
    {...{} as SelectedWeapon,slot:2},
    {...{} as SelectedWeapon,slot:3},
    {...{} as SelectedWeapon,slot:4},
    {...{} as SelectedWeapon,slot:5},
    {...{} as SelectedWeapon,slot:6},
    {...{} as SelectedWeapon,slot:7},
    {...{} as SelectedWeapon,slot:8},
    {...{} as SelectedWeapon,slot:9},
    {...{} as SelectedWeapon,slot:10}
  ] as SelectedWeapon[],
  selectedPhantom:{} as SelectedPhantom,
  listPhantom:[

  ] as SelectedPhantom[],
  parameter:{playerRank:1,attackShinki:1,hpShinki:1,hpRate:100} as Parameter,
  effectList:[] as Effect[],
  skillEffectList:[] as SkillEffect[],
  effectLevelList:[] as EffectLevel[],
  effectLevelDetailList:[] as EffectLevelDetail[],
  impactList:[] as Impact[]
}

export const calcurateSlice = createSlice({
  name: 'calcurate',
  initialState: initialCalcurateState,
  reducers: {
    changedWeapon: (state:CalcurateState,action:PayloadAction<{slot:number,weapon:Weapon}>) => {
      state.listWeapon[action.payload.slot-1] = {
        ...state.listWeapon[action.payload.slot-1],
        weapon: action.payload.weapon,
        level:action.payload.weapon.weaponIdBeforeLimitBreak > 0 ? 30 : 20
      }
      return state
    },
    selectedWeapon: (state:CalcurateState,action:PayloadAction<number>) => {
      state.selectedWeapon = state.listWeapon.filter((row) => row.slot === action.payload)[0]
      return state
    },
    changedPhantom: (state:CalcurateState,action:PayloadAction<{slot:number,phantom:Phantom}>) => {
      state.listPhantom[action.payload.slot-1] = {
        ...state.listPhantom[action.payload.slot-1],
        phantom: action.payload.phantom,
        level:5
      }
      return state
    },
    selectedPhantom: (state:CalcurateState,action:PayloadAction<number>) => {
      state.selectedPhantom = state.listPhantom.filter((row) => row.slot === action.payload)[0]
      return state
    },
    setParameter: (state:CalcurateState,action:PayloadAction<Parameter>) => {
      return {
        ...state,
        parameter: action.payload
      }
    },
    setParams: (state:CalcurateState,action:PayloadAction<{
      effectList:Effect[], 
      skillEffectList:SkillEffect[],
      effectLevelList:EffectLevel[],
      effectLevelDetailList:EffectLevelDetail[],
      impactList:Impact[]
    }>) => {
      state.effectList = action.payload.effectList
      state.skillEffectList = action.payload.skillEffectList
      state.effectLevelList = action.payload.effectLevelList
      state.effectLevelDetailList = action.payload.effectLevelDetailList
      state.impactList = action.payload.impactList

      return state
    }
  }
})

export default calcurateSlice;