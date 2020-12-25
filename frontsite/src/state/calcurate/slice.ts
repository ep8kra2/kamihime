import { createSlice,PayloadAction } from '@reduxjs/toolkit';
import { Weapon } from '../weapon/type';
import { AttackAbility, AttackBurst, AttackNormal, CalcurateState,SelectedPhantom,SelectedWeapon } from './type';
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
  attackNormal:[
    {...{} as AttackNormal,  elementName:'火',elementId:1},
    {...{} as AttackNormal,  elementName:'水',elementId:2},
    {...{} as AttackNormal,  elementName:'風',elementId:3},
    {...{} as AttackNormal,  elementName:'雷',elementId:4},
    {...{} as AttackNormal,  elementName:'光',elementId:5},
    {...{} as AttackNormal,  elementName:'闇',elementId:6},
  ] as AttackNormal[],
  attackBurst:[
    {...{} as AttackBurst,  elementName:'火',elementId:1},
    {...{} as AttackBurst,  elementName:'水',elementId:2},
    {...{} as AttackBurst,  elementName:'風',elementId:3},
    {...{} as AttackBurst,  elementName:'雷',elementId:4},
    {...{} as AttackBurst,  elementName:'光',elementId:5},
    {...{} as AttackBurst,  elementName:'闇',elementId:6},
  ] as AttackBurst[],
  attackAbility:[
    {...{} as AttackAbility,  elementName:'火',elementId:1},
    {...{} as AttackAbility,  elementName:'水',elementId:2},
    {...{} as AttackAbility,  elementName:'風',elementId:3},
    {...{} as AttackAbility,  elementName:'雷',elementId:4},
    {...{} as AttackAbility,  elementName:'光',elementId:5},
    {...{} as AttackAbility,  elementName:'闇',elementId:6},
  ] as AttackAbility[],
  effectList:[] as Effect[],
  skillEffectList:[] as SkillEffect[],
  effectLevelList:[] as EffectLevel[],
  effectLevelDetailList:[] as EffectLevelDetail[],
  impactList:[] as Impact[]
}

function initialAttackList<T>(){
  return(
    [
      {...{} as T,  elementName:'火',elementId:1} as T,
      {...{} as T,  elementName:'水',elementId:2} as T,
      {...{} as T,  elementName:'風',elementId:3} as T,
      {...{} as T,  elementName:'雷',elementId:4} as T,
      {...{} as T,  elementName:'光',elementId:5} as T,
      {...{} as T,  elementName:'闇',elementId:6} as T
    ] as T[]
  )
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