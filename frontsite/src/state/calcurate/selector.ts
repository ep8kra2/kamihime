import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { hiroic,vigorous,pride,rebellion} from '../../domain/calcurate';
import { Effect } from '../effect/type';
import { EffectLevelDetail } from '../effectlevel/type';
import { SkillEffect } from '../skill/type';
import { AttackNormal, SelectedWeapon } from './type';

type selectedSkillList = {
  slot:number,
  skillId:number,
  powerId:number,
  elementId:number, 
  level:number
}

type SelectedEffectList = {
  slot:number,
  skillId:number,
  powerId:number,
  elementId:number,
  level:number,
  effect:Effect,
  attack:EffectLevelDetail
}

const attackCalcurate = (cal:string,slot:number,at:number,hpRate:number) => {
  switch(cal){
    case 'hiroic':
      return hiroic(at,{slot:slot,hpRate:hpRate})
    case 'vigorous':
      return vigorous(at,{slot:slot,hpRate:hpRate})
    case 'pride':
      return pride(at,{slot:slot,hpRate:hpRate})
    case 'rebellion':
      return rebellion(at,{slot:slot,hpRate:hpRate})
  }
  return at
}


export const useListWeapon = () => {
  return useSelector((state:RootState) => state.calcurate.listWeapon) 
}

export const useListPhantom = () => {
  return useSelector((state:RootState) => state.calcurate.listPhantom) 
}

export const useSelectedWeapon = () => {
  return useSelector((state:RootState) => state.calcurate.selectedWeapon) 
}

export const useSelectedPhantom = () => {
  return  useSelector((state:RootState) => state.calcurate.selectedPhantom) 
}

export const useAttackNormal = () => {
  return  useSelector((state:RootState) => state.calcurate.attackNormal) 
}

export const useAttackData = () => {
  const useSkillEffectList = useSelector((state:RootState) => state.calcurate.skillEffectList)
  const useEffectList = useSelector((state:RootState) => state.calcurate.effectList)
  const useEffectLevelList = useSelector((state:RootState) => state.calcurate.effectLevelList)
  const useEfffectLevelDetailList = useSelector((state:RootState) => state.calcurate.effectLevelDetailList)


  // エフェクトリスト取得
  const getEffectListFromSkillList = (list:selectedSkillList[]) => {
    // スキル　→　エフェクト
    const getSkillEffect = (skillId:number) => { return useSkillEffectList.filter((row) => row.skillId === skillId) as SkillEffect[] }

    // エフェクト情報
    const getEffect = (effectId:number) => { return useEffectList.find((row) => row.id === effectId) as Effect}

    return list.reduce((result,row) => {
      return result.concat(getSkillEffect(row.skillId).map((rowEffect) => {
        return {effect:getEffect(rowEffect.effectId),slot:row.slot,skillId:row.skillId,powerId:row.powerId,elementId:row.elementId,level:row.level,attack:{} as EffectLevelDetail}
      }))
    },[] as SelectedEffectList[]);
  }

  const getSkillListfromWeapon = (list:SelectedWeapon[]) => {
    return list.reduce((result,row) => {
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
    },[] as selectedSkillList[] )
  }

  // 威力取得
  const getAttack = (effectList:SelectedEffectList[]) => {
    return effectList.map((row) => {
      const attack = useEfffectLevelDetailList.find((filterDetail) => useEffectLevelList.filter((filter) => filter.powerId === row.powerId && filter.effectId === row.effect.id)[0].id === filterDetail.effectLevelId && row.level === filterDetail.level)
      return {...row,attack:attack as EffectLevelDetail} as SelectedEffectList
    })
  } 

  // 攻撃ノーマル
  const getAttackNormal = (attackList: SelectedEffectList[]) => {
    attackList.reduce((result,row) => {
      if(isNormal(row.effect.categoryId)){
        const line = result.find((res) => res.elementId === row.elementId) as AttackNormal
        return [...result,line]
      }else{
        return result
      }
    },[
      {...{} as AttackNormal,  elementName:'火',elementId:1},
      {...{} as AttackNormal,  elementName:'水',elementId:2},
      {...{} as AttackNormal,  elementName:'風',elementId:3},
      {...{} as AttackNormal,  elementName:'雷',elementId:4},
      {...{} as AttackNormal,  elementName:'光',elementId:5},
      {...{} as AttackNormal,  elementName:'闇',elementId:6},
    ] as AttackNormal[],)
  }

  const isNormal = (id:number) =>{
    return id === 1 || id === 4? true : false
  }
  
  const setAttackParameter = (row:AttackNormal,attackData:SelectedEffectList) => {
    const at = attackData.effect.cal(attackData.attack.value,{slot:attackData.slot,hpRate:1})
    return [] as SelectedEffectList[]
  }
  

  const listWeapon = useSelector((state:RootState) => state.calcurate.listWeapon)
  const skillList = getSkillListfromWeapon(listWeapon)
  const effectList = getEffectListFromSkillList(skillList)
  const attackList = getAttack(effectList)
 
  // 属性値、攻撃種別ごとに値をセットします
  return getAttackNormal(attackList)
}