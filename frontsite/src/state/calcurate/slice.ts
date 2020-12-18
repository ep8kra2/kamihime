import { createSlice,PayloadAction } from '@reduxjs/toolkit';
import { Weapon } from '../weapon/type';
import { AttackAbility, AttackBurst, AttackNormal, CalcurateState,SelectedPhantom,SelectedWeapon } from './type';
import { hiroic,vigorous,pride,rebellion} from '../../domain/calcurate';
import { Phantom } from '../phantom/type';
import { Effect } from '../effect/type';
import { SkillEffect } from '../skill/type';
import { EffectLevel, EffectLevelDetail } from '../effectlevel/type';
import { CategoryDetail } from '../category/type';

type EffectCul = {
  effect:Effect,
  elementId:number,
  powerId:number,
  slot:number
}

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
  categoryDetailList:[] as CategoryDetail[]
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

const attackCalcurate = (cal:string,slot:number,at:number,hpRate:number) => {
  switch(cal){
    case 'hiroic':
      return hiroic(at,slot)
    case 'vigorous':
      return vigorous(at,hpRate)
    case 'pride':
      return pride(at,hpRate)
    case 'rebellion':
      return rebellion(at,hpRate)
  }
  return at
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
      categoryDetailList:CategoryDetail[]
    }>) => {
      state.effectList = action.payload.effectList
      state.skillEffectList = action.payload.skillEffectList
      state.effectLevelList = action.payload.effectLevelList
      state.effectLevelDetailList = action.payload.effectLevelDetailList
      state.categoryDetailList = action.payload.categoryDetailList

      return state
    },
    calcurate: (state:CalcurateState,action) => {
      const skillList = state.listWeapon.reduce((result,row) => {
        if(row.weapon === undefined) { return result}
        if(row.weapon.slot1SkillId !== undefined) {
          result.push({slot:row.slot,
            skillId:row.weapon.slot1SkillId,
            powerId:row.weapon.slot1PowerId,
            elementId:row.weapon.elementId, 
            level:row.level})
        }

        if(row.weapon.slot2SkillId) {
          result.push({slot:row.slot,
            skillId:row.weapon.slot2SkillId,
            powerId:row.weapon.slot2PowerId,
            elementId:row.weapon.elementId, 
            level:row.level})
        }
        return result
      },[{slot:0 ,skillId:0,powerId:0,elementId:0,level:0}])

      const skillEffectList = state.skillEffectList.map((row) => {return{...row}})
      const effectList = state.effectList.map((row) => {return{...row}})
      
      const selectedSkillEffectList = (id:number) =>{
        return skillEffectList.filter((row) => row.skillId === id)
      };

      const selectedEffectList = (id:number,elementId:number,powerId:number,slot:number) => {
        return  {effect:effectList.find((row) => row.id === id),elementId:elementId,powerId:powerId,slot:slot} as EffectCul
      }

      const selectedeffectlist = skillList.reduce((result:EffectCul[],row) => {
        result = result.concat(selectedSkillEffectList(row.skillId).map((rowEffect) => {
          return selectedEffectList(rowEffect.effectId,row.elementId,row.powerId,row.slot)
        }))
        return result
      },[] as EffectCul[]);

      const effectLevelList = state.effectLevelList.map((row) => {return {...row}})
      const efffectLevelDetailList = state.effectLevelDetailList.map((row) =>{return {...row}})

      const effectLevel = (effectId:number,powerId:number) => effectLevelList.find((row) => row.effectId === effectId && row.powerId === powerId) as EffectLevel
      const effectLevelDetail = (effectLevelId:number,level:number) => efffectLevelDetailList.find((row) => row.effectLevelId === effectLevelId && row.level === level) as EffectLevelDetail

      const normalAttackList = initialAttackList<AttackNormal>();
      const attackParameters = selectedeffectlist.reduce((result:AttackNormal[],row) => {
        const attack = effectLevelDetail(effectLevel(row.effect.id,row.powerId).id,1);

        (result.find((find) => row.elementId === find.elementId) as AttackNormal)
        [
          row.effect.name] = attackCalcurate(row.effect.calcurate,row.slot,attack.value,1)

        return result
      },normalAttackList)

      console.log(selectedeffectlist)

      attackCalcurate('attack',1,100,1)
    }
  }
})

export default calcurateSlice;