import { createSlice,PayloadAction } from '@reduxjs/toolkit';
import { Weapon } from '../weapon/type';
import { AttackAbility, AttackBurst, AttackNormal, CalcurateState,SelectedPhantom,SelectedWeapon } from './type';
import { hiroic,vigorous,pride,rebellion} from '../../domain/calcurate';
import { Phantom } from '../phantom/type';

const initialCalcurateState: CalcurateState = {
  calcurate:{
    hiroic:hiroic,
    vigorous:vigorous,
    pride:pride,
    rebellion:rebellion
  },
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
    {...{} as AttackNormal,  elementName:'火'},
    {...{} as AttackNormal,  elementName:'水'},
    {...{} as AttackNormal,  elementName:'風'},
    {...{} as AttackNormal,  elementName:'雷'},
    {...{} as AttackNormal,  elementName:'光'},
    {...{} as AttackNormal,  elementName:'闇'},
  ] as AttackNormal[],
  attackBurst:[
    {...{} as AttackBurst,  elementName:'火'},
    {...{} as AttackBurst,  elementName:'水'},
    {...{} as AttackBurst,  elementName:'風'},
    {...{} as AttackBurst,  elementName:'雷'},
    {...{} as AttackBurst,  elementName:'光'},
    {...{} as AttackBurst,  elementName:'闇'},
  ] as AttackBurst[],
  attackAbility:[
    {...{} as AttackAbility,  elementName:'火'},
    {...{} as AttackAbility,  elementName:'水'},
    {...{} as AttackAbility,  elementName:'風'},
    {...{} as AttackAbility,  elementName:'雷'},
    {...{} as AttackAbility,  elementName:'光'},
    {...{} as AttackAbility,  elementName:'闇'},
  ] as AttackAbility[],
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
  }
})

export default calcurateSlice;