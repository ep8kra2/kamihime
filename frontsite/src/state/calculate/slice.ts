import { createSlice,PayloadAction } from '@reduxjs/toolkit';
import { Weapon } from '../weapon/type';
import { CalcurateState,Parameter,SelectedPhantom,SelectedWeapon } from './type';
import { Phantom } from '../phantom/type';

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
    {...{} as SelectedPhantom,slot:1,marks:'メイン'},
    {...{} as SelectedPhantom,slot:2,marks:'フレンド'},
    {...{} as SelectedPhantom,slot:3},
    {...{} as SelectedPhantom,slot:4},
    {...{} as SelectedPhantom,slot:5},
    {...{} as SelectedPhantom,slot:6},
    {...{} as SelectedPhantom,slot:7},

  ] as SelectedPhantom[],
  parameter:{playerRank:1,
    elementId:1, 
    goodAtWeapon1:1, 
    goodAtWeapon2:0, 
    attack:1,
    hp:1,
    barstRate:5.5,
    barstLimitUp:0,
    hpRate:100,
    enemyDefence:10,
    debufferDefence:0} as Parameter
}

export const calcurateSlice = createSlice({
  name: 'calcurate',
  initialState: initialCalcurateState,
  reducers: {
    changedWeapon: (state:CalcurateState,action:PayloadAction<{slot:number,weapon:Weapon}>) => {
      state.listWeapon[action.payload.slot-1] = {
        ...state.listWeapon[action.payload.slot-1],
        weapon: action.payload.weapon,
        skillLevel:action.payload.weapon.weaponIdBeforeLimitBreak > 0 ? 30 : 20,
        level:action.payload.weapon.weaponIdBeforeLimitBreak > 0 ? 150 : 125
      }
      return state
    },
    selectedWeapon: (state:CalcurateState,action:PayloadAction<number>) => {
      state.selectedWeapon = state.listWeapon.filter((row) => row.slot === action.payload)[0]
      return state
    },
    deleteWeapon: (state:CalcurateState, action:PayloadAction<number>) => {
      state.listWeapon[action.payload - 1] = {...{} as SelectedWeapon,slot:action.payload,marks:state.listWeapon[action.payload - 1].marks}
      return state
    },
    editWeapon: (state:CalcurateState,action:PayloadAction<SelectedWeapon>) => {
      state.listWeapon[action.payload.slot-1] = {
        ...state.listWeapon[action.payload.slot-1],
        level:action.payload.level
      }
      return state
    },
    changedPhantom: (state:CalcurateState,action:PayloadAction<{slot:number,phantom:Phantom}>) => {
      state.listPhantom[action.payload.slot-1] = {
        ...state.listPhantom[action.payload.slot-1],
        phantom: action.payload.phantom,
        rank: action.payload.phantom.limitBreak === 1? 6 : 5,
        level:action.payload.phantom.limitBreak === 1? 150 : 100
      }
      return state
    },
    deletePhantom: (state:CalcurateState, action:PayloadAction<number>) => {
      state.listPhantom[action.payload - 1] = {...{} as SelectedPhantom,slot:action.payload,marks:state.listPhantom[action.payload - 1].marks}
      return state
    },
    selectedPhantom: (state:CalcurateState,action:PayloadAction<number>) => {
      state.selectedPhantom = state.listPhantom.filter((row) => row.slot === action.payload)[0]
      return state
    },
    editPhantom: (state:CalcurateState,action:PayloadAction<SelectedPhantom>) => {
      state.listPhantom[action.payload.slot-1] = {
        ...state.listPhantom[action.payload.slot-1],
        rank: action.payload.rank,
        level:action.payload.level
      }
      return state
    },
  
    setParameter: (state:CalcurateState,action:PayloadAction<Parameter>) => {
      return {
        ...state,
        parameter: action.payload
      }
    }
  }
})

export default calcurateSlice;