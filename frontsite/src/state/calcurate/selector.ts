import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { hiroic,vigorous,pride,rebellion} from '../../domain/calcurate';
import { CalcurateParameter } from '../../domain/type';
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
      return hiroic(at,{...{} as CalcurateParameter, slot:slot})
    case 'vigorous':
      return vigorous(at,{...{} as CalcurateParameter, hpRate:hpRate})
    case 'pride':
      return pride(at,{...{} as CalcurateParameter,hpRate:hpRate})
    case 'rebellion':
      return rebellion(at,{...{} as CalcurateParameter,hpRate:hpRate})
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

export const useParameter = () => {
  return useSelector((state:RootState) => state.calcurate.parameter)
}

export const useAttackNormal = () => {
  const listWeapon = useSelector((state:RootState) => state.calcurate.listWeapon)
  const useSkillEffectList = useSelector((state:RootState) => state.calcurate.skillEffectList)
  const useEffectList = useSelector((state:RootState) => state.calcurate.effectList)
  const useEffectLevelList = useSelector((state:RootState) => state.calcurate.effectLevelList)
  const useEfffectLevelDetailList = useSelector((state:RootState) => state.calcurate.effectLevelDetailList)
  const useParameter = useSelector((state:RootState) => state.calcurate.parameter)


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
      const attack = useEfffectLevelDetailList.find((filterDetail) => {
        if(row === undefined || row.effect === undefined){ return false}
        const res = useEffectLevelList.find((filter) => filter.powerId === row.powerId && filter.effectId === row.effect.id);
        if(res === undefined) { return false }
        return (res.id === filterDetail.effectLevelId && row.level === filterDetail.level)
      })
      
      return {...row,attack:attack as EffectLevelDetail} as SelectedEffectList
    })
  } 

  const isNormal = (id:number) =>{
    return id === 1 || id === 4? true : false
  }

  const isAssault = (name:string) => {
    return ['アサルト','プライド固定','プライド変動'].find((row) => name === row) !== undefined ? true : false
  }

  const isElement = (name:string) => {
    return ['属性攻撃UP','英霊属性攻撃UP'].find((row) => name === row) !== undefined ? true : false
  }


  // 攻撃ノーマル
  const getAttackNormal = (attackList: SelectedEffectList[]) => {
    return attackList.reduce((result,row) => {
      if(row.attack !== undefined &&  isNormal(row.effect.categoryId)){
        result = [
          { attack:result[0].attack ,
            assault:result[0].assault +(isAssault(row.effect.name) && row.elementId === 1 ? attackCalcurate(row.effect.calcurate,row.slot,row.attack.value,useParameter.hpRate) : 0),
            element:result[0].element +(isElement(row.effect.name) && row.elementId === 1 ? attackCalcurate(row.effect.calcurate,row.slot,row.attack.value,useParameter.hpRate) : 0),
            vigorous:result[0].vigorous +(row.effect.name === 'ヴィゴラス' && row.elementId === 1? attackCalcurate(row.effect.calcurate,row.slot,row.attack.value,useParameter.hpRate) : 0),
            rebellion:result[0].rebellion +(row.effect.name === 'リベリオン' && row.elementId === 1? attackCalcurate(row.effect.calcurate,row.slot,row.attack.value,useParameter.hpRate) : 0),
            special:result[0].special +(row.effect.name === '特殊' && row.elementId === 1 ? attackCalcurate(row.effect.calcurate,row.slot,row.attack.value,useParameter.hpRate) : 0),
            technica:result[0].technica +(row.effect.name === 'テクニカ' && row.elementId === 1? attackCalcurate(row.effect.calcurate,row.slot,row.attack.value,useParameter.hpRate) : 0),
            elementName:'火',
            elementId:1 
          },
          { attack:result[1].attack ,
            assault:result[1].assault +(isAssault(row.effect.name) && row.elementId === 2 ? attackCalcurate(row.effect.calcurate,row.slot,row.attack.value,useParameter.hpRate) : 0),
            element:result[1].element +(isElement(row.effect.name) && row.elementId === 2 ? attackCalcurate(row.effect.calcurate,row.slot,row.attack.value,useParameter.hpRate) : 0),
            vigorous:result[1].vigorous +(row.effect.name === 'ヴィゴラス' && row.elementId === 2? attackCalcurate(row.effect.calcurate,row.slot,row.attack.value,useParameter.hpRate) : 0),
            rebellion:result[1].rebellion +(row.effect.name === 'リベリオン' && row.elementId === 2? attackCalcurate(row.effect.calcurate,row.slot,row.attack.value,useParameter.hpRate) : 0),
            special:result[1].special +(row.effect.name === '特殊' && row.elementId === 2 ? attackCalcurate(row.effect.calcurate,row.slot,row.attack.value,useParameter.hpRate) : 0),
            technica:result[1].technica +(row.effect.name === 'テクニカ' && row.elementId === 2? attackCalcurate(row.effect.calcurate,row.slot,row.attack.value,useParameter.hpRate) : 0),
            elementName:'水',
            elementId:2
          },
          { attack:result[2].attack ,
            assault:result[2].assault +(isAssault(row.effect.name) && row.elementId === 3 ? attackCalcurate(row.effect.calcurate,row.slot,row.attack.value,useParameter.hpRate) : 0),
            element:result[2].element +(isElement(row.effect.name) && row.elementId === 3 ? attackCalcurate(row.effect.calcurate,row.slot,row.attack.value,useParameter.hpRate) : 0),
            vigorous:result[2].vigorous +(row.effect.name === 'ヴィゴラス' && row.elementId === 3 ? attackCalcurate(row.effect.calcurate,row.slot,row.attack.value,useParameter.hpRate) : 0),
            rebellion:result[2].rebellion +(row.effect.name === 'リベリオン' && row.elementId === 3 ? attackCalcurate(row.effect.calcurate,row.slot,row.attack.value,useParameter.hpRate) : 0),
            special:result[2].special +(row.effect.name === '特殊' && row.elementId === 3 ? attackCalcurate(row.effect.calcurate,row.slot,row.attack.value,useParameter.hpRate) : 0),
            technica:result[2].technica +(row.effect.name === 'テクニカ' && row.elementId === 3 ? attackCalcurate(row.effect.calcurate,row.slot,row.attack.value,useParameter.hpRate) : 0),
            elementName:'風',
            elementId:3
          },
          { attack:result[3].attack ,
            assault:result[3].assault +(isAssault(row.effect.name) && row.elementId === 4 ? attackCalcurate(row.effect.calcurate,row.slot,row.attack.value,useParameter.hpRate) : 0),
            element:result[3].element +(isElement(row.effect.name) && row.elementId === 4 ? attackCalcurate(row.effect.calcurate,row.slot,row.attack.value,useParameter.hpRate) : 0),
            vigorous:result[3].vigorous +(row.effect.name === 'ヴィゴラス' && row.elementId === 4 ? attackCalcurate(row.effect.calcurate,row.slot,row.attack.value,useParameter.hpRate) : 0),
            rebellion:result[3].rebellion +(row.effect.name === 'リベリオン' && row.elementId === 4 ? attackCalcurate(row.effect.calcurate,row.slot,row.attack.value,useParameter.hpRate) : 0),
            special:result[3].special +(row.effect.name === '特殊' && row.elementId === 4 ? attackCalcurate(row.effect.calcurate,row.slot,row.attack.value,useParameter.hpRate) : 0),
            technica:result[3].technica +(row.effect.name === 'テクニカ' && row.elementId === 4 ? attackCalcurate(row.effect.calcurate,row.slot,row.attack.value,useParameter.hpRate) : 0),
            elementName:'雷',
            elementId:4
          },
          { attack:result[4].attack ,
            assault:result[4].assault +(isAssault(row.effect.name) && row.elementId === 5 ? attackCalcurate(row.effect.calcurate,row.slot,row.attack.value,useParameter.hpRate) : 0),
            element:result[4].element +(isElement(row.effect.name) && row.elementId === 5 ? attackCalcurate(row.effect.calcurate,row.slot,row.attack.value,useParameter.hpRate) : 0),
            vigorous:result[4].vigorous +(row.effect.name === 'ヴィゴラス' && row.elementId === 5 ? attackCalcurate(row.effect.calcurate,row.slot,row.attack.value,useParameter.hpRate) : 0),
            rebellion:result[4].rebellion +(row.effect.name === 'リベリオン' && row.elementId === 5 ? attackCalcurate(row.effect.calcurate,row.slot,row.attack.value,useParameter.hpRate) : 0),
            special:result[4].special +(row.effect.name === '特殊' && row.elementId === 5 ? attackCalcurate(row.effect.calcurate,row.slot,row.attack.value,useParameter.hpRate) : 0),
            technica:result[4].technica +(row.effect.name === 'テクニカ' && row.elementId === 5 ? attackCalcurate(row.effect.calcurate,row.slot,row.attack.value,useParameter.hpRate) : 0),
            elementName:'光',
            elementId:5 
          },
          { attack:result[5].attack ,
            assault:result[5].assault +(isAssault(row.effect.name) && row.elementId === 6 ? attackCalcurate(row.effect.calcurate,row.slot,row.attack.value,useParameter.hpRate) : 0),
            element:result[5].element +(isElement(row.effect.name) && row.elementId === 6 ? attackCalcurate(row.effect.calcurate,row.slot,row.attack.value,useParameter.hpRate) : 0),
            vigorous:result[5].vigorous +(row.effect.name === 'ヴィゴラス' && row.elementId === 6 ? attackCalcurate(row.effect.calcurate,row.slot,row.attack.value,useParameter.hpRate) : 0),
            rebellion:result[5].rebellion +(row.effect.name === 'リベリオン' && row.elementId === 6 ? attackCalcurate(row.effect.calcurate,row.slot,row.attack.value,useParameter.hpRate) : 0),
            special:result[5].special +(row.effect.name === '特殊' && row.elementId === 6 ? attackCalcurate(row.effect.calcurate,row.slot,row.attack.value,useParameter.hpRate) : 0),
            technica:result[5].technica +(row.effect.name === 'テクニカ' && row.elementId === 6 ? attackCalcurate(row.effect.calcurate,row.slot,row.attack.value,useParameter.hpRate) : 0),
            elementName:'闇',
            elementId:6
          }
        ]
      }
      return result
    },[
      {attack:0,assault:0,element:0,vigorous:0,rebellion:0,special:0,technica:0, elementName:'火',elementId:1},
      {attack:0,assault:0,element:0,vigorous:0,rebellion:0,special:0,technica:0, elementName:'水',elementId:2},
      {attack:0,assault:0,element:0,vigorous:0,rebellion:0,special:0,technica:0, elementName:'風',elementId:3},
      {attack:0,assault:0,element:0,vigorous:0,rebellion:0,special:0,technica:0, elementName:'雷',elementId:4},
      {attack:0,assault:0,element:0,vigorous:0,rebellion:0,special:0,technica:0, elementName:'光',elementId:5},
      {attack:0,assault:0,element:0,vigorous:0,rebellion:0,special:0,technica:0, elementName:'闇',elementId:6},
    ] as AttackNormal[],)
  }

  const getAttackNormalFromParameter = (weaponAttackNormal:AttackNormal[]) => {
    if(weaponAttackNormal[0] === undefined){ return weaponAttackNormal}
    const res = listWeapon.reduce((result,row) => {
      if(row.weapon === undefined) { return result}
      result = result.map((line) => {
        return{
          ...line,
          attack:line.attack +  (line.elementId === row.weapon.elementId? row.weapon.maxAt : 0)
        }
      })
      return result
    },weaponAttackNormal)

    if(res === undefined){return weaponAttackNormal}
    return res.map((row) => {
      return {
        ...row,
        attack:row.attack + (row.elementId === useParameter.elementShinki? useParameter.attackShinki : 0)
      }})
  }
  
  const skillList = getSkillListfromWeapon(listWeapon)
  const effectList = getEffectListFromSkillList(skillList)
  console.log(effectList)
  const attackList = getAttack(effectList)
 
  // 武器の属性値、攻撃種別ごとに値をセットします
  console.log(skillList)
  console.log(attackList)
  const weaponAttackNormal = getAttackNormal(attackList)

  // 基礎値など
  return getAttackNormalFromParameter(weaponAttackNormal)
  

}