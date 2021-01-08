import { Parameter, SelectedEffect, SelectedPhantom, SelectedWeapon } from "../../state/calculate/type";
import { Expression, ExpressionSkillEnhance, ExpressionWeaponEnhance, ReturnSkillEnhance, ReturnWeaponEnhance } from "./type";

const assault = (level:number,coefficient:number,constant:number) => {
  return level * coefficient + constant;
}

const assaultS:Expression =  (effect:SelectedEffect,effectList:SelectedEffect[],parameter:Parameter):number => {
  return assault(effect.level,0.5,0);
}

const assaultM:Expression =  (effect:SelectedEffect,effectList:SelectedEffect[],parameter:Parameter):number => {
  return assault(effect.level,0.5,3);
}

const assaultL:Expression =  (effect:SelectedEffect,effectList:SelectedEffect[],parameter:Parameter):number => {
  return assault(effect.level,0.5,6);
}

const assaultXL:Expression =  (effect:SelectedEffect,effectList:SelectedEffect[],parameter:Parameter):number => {
  return assault(effect.level,0.7,9);
}

const assaultXXL:Expression =  (effect:SelectedEffect,effectList:SelectedEffect[],parameter:Parameter):number => {
  return assault(effect.level,1,10);
}

const pride = (level:number,coefficient:number,constant:number,hpRate:number):number => {
  return level * coefficient + constant *  (1- hpRate / 100) 
}

const prideS:Expression =  (effect:SelectedEffect,effectList:SelectedEffect[],parameter:Parameter):number => {
  return pride(effect.level,0.35,12,parameter.hpRate)
}

const prideM:Expression =  (effect:SelectedEffect,effectList:SelectedEffect[],parameter:Parameter):number => {
  return pride(effect.level,0.35,12,parameter.hpRate)
}

const prideL:Expression =  (effect:SelectedEffect,effectList:SelectedEffect[],parameter:Parameter):number => {
  return pride(effect.level,0.35,12,parameter.hpRate)
}

const vigorous = (level:number,coefficient:number,constant:number,hpRate:number) => {
  const resultAttack = Math.pow(level * coefficient + constant , (hpRate / 100)) - Math.pow(level * coefficient + constant,0.5) as number
  return resultAttack > 0 ? resultAttack : 0
}

const vigorousS:Expression =  (effect:SelectedEffect,effectList:SelectedEffect[],parameter:Parameter):number => {
  return vigorous(effect.level,0.2,8,parameter.hpRate)
}

const vigorousM:Expression =  (effect:SelectedEffect,effectList:SelectedEffect[],parameter:Parameter):number => {
  return vigorous(effect.level,0.2,12,parameter.hpRate)
}

const vigorousL:Expression =  (effect:SelectedEffect,effectList:SelectedEffect[],parameter:Parameter):number => {
  return vigorous(effect.level,0.2,16,parameter.hpRate)
}

const rebellion = (level:number,coefficient:number,constant:number,hpRate:number):number => {
  return (level * coefficient + constant) *  (1- hpRate / 100) 
}

const rebellionS:Expression =  (effect:SelectedEffect,effectList:SelectedEffect[],parameter:Parameter):number => {
  return rebellion(effect.level,0.35,12,parameter.hpRate)
}

const rebellionM:Expression =  (effect:SelectedEffect,effectList:SelectedEffect[],parameter:Parameter):number => {
  return rebellion(effect.level,0.35,12,parameter.hpRate)
}

const rebellionL:Expression =  (effect:SelectedEffect,effectList:SelectedEffect[],parameter:Parameter):number => {
  return rebellion(effect.level,0.35,12,parameter.hpRate)
}

const technica = (level:number,coefficient:number,constant:number):number => {
  return (level * coefficient + constant)
}

const technicaS:Expression =  (effect:SelectedEffect,effectList:SelectedEffect[],parameter:Parameter):number => {
  return technica(effect.level,0.4,2)
}

const technicaM:Expression = (effect:SelectedEffect,effectList:SelectedEffect[],parameter:Parameter):number => {
  return technica(effect.level,0.4,6)
}

const technicaL:Expression = (effect:SelectedEffect,effectList:SelectedEffect[],parameter:Parameter):number => {
  return technica(effect.level,0.4,10)
}

const technicaLimitUp = (constant:number) => {
  return constant
}

const technicaLimitUpS = (effect:SelectedEffect,effectList:SelectedEffect[],parameter:Parameter):number => {
  return technicaLimitUp(5)
}

const technicaLimitUpM = (effect:SelectedEffect,effectList:SelectedEffect[],parameter:Parameter):number => {
  return technicaLimitUp(7.5)
}

const technicaLimitUpL =  (effect:SelectedEffect,effectList:SelectedEffect[],parameter:Parameter):number => {
  return technicaLimitUp(10)
}

const hiroic:Expression = (effect:SelectedEffect,effectList:SelectedEffect[],parameter:Parameter):number => {
  return effect.slot === 1? effect.level * 1 + 10 : 0;
}

const phantom140:Expression = (effect:SelectedEffect,effectList:SelectedEffect[],parameter:Parameter,weaponList?:SelectedWeapon[],phantomList?:SelectedPhantom[]):number => {
  if(effectList === undefined) {return 0}
  return effect.level * 5 + 95 +  (phantomList? phantomList.filter((row) => row.slot >= 3 && (row.phantom? row.phantom.elementId === effect.elementId : false)).length * 8 : 0)
}

const phantom100:Expression = (effect:SelectedEffect,effectList:SelectedEffect[],parameter:Parameter):number => {
  if(effectList === undefined) {return 0}
  return effect.level * 5 + 95 + (effect.level === 6 ? 15 : 0) 
}

const phantom100LD:Expression = (effect:SelectedEffect,effectList:SelectedEffect[],parameter:Parameter,weaponList?:SelectedWeapon[],phantomList?:SelectedPhantom[]):number => {
  if(effectList === undefined) {return 0}
  return 80 + (effect.level === 6 ? 15 : 0)  + (3 + effect.level) * (phantomList? phantomList.filter((row) => row.slot >= 3 && (row.phantom? row.phantom.elementId === effect.elementId : false)).length : 0)
}

const catasAssault:Expression =  (effect:SelectedEffect,effectList:SelectedEffect[],parameter:Parameter):number => {
  return  effect.level * 20
}

const calamityAassaultL:Expression = (effect:SelectedEffect,effectList:SelectedEffect[],parameter:Parameter,weaponList?:SelectedWeapon[]):number => {
  if(effectList === undefined){ return 0}
  const weaponCount = weaponList? weaponList.filter((row) => (row.weapon? row.weapon.typeId : 0) === effect.weapon.typeId).length : 0
  return (weaponCount >= 6)? assault(effect.level,0.5,6) : 0
}

export const useCalculationList = [
  {key:"assaultS",value:assaultS},
  {key:"assaultM",value:assaultM},
  {key:"assaultL",value:assaultL},
  {key:"assaultXL",value:assaultXL},
  {key:"assaultXXL",value:assaultXXL},
  {key:"prideS",value:prideS},
  {key:"prideM",value:prideM},
  {key:"prideL",value:prideL},
  {key:"vigorousS",value:vigorousS},
  {key:"vigorousM",value:vigorousM},
  {key:"vigorousL",value:vigorousL},
  {key:"rebellionS",value:rebellionS},
  {key:"rebellionM",value:rebellionM},
  {key:"rebellionL",value:rebellionL},
  {key:"technicaS",value:technicaS},
  {key:"technicaM",value:technicaM},
  {key:"technicaL",value:technicaL},
  {key:"technicaLimitUpS",value:technicaLimitUpS},
  {key:"technicaLimitUpM",value:technicaLimitUpM},
  {key:"technicaLimitUpL",value:technicaLimitUpL},
  {key:"hiroic",value:hiroic},
  {key:"phantom100",value:phantom100},
  {key:"phantom100LD",value:phantom100LD},
  {key:"phantom140",value:phantom140},
  {key:"catasAssault",value:catasAssault},
  {key:"calamityAassaultL",value:calamityAassaultL}
]

export const resultExpression = (expressionName:string,effect:SelectedEffect,effectList:SelectedEffect[],parameter:Parameter,weaponList?:SelectedWeapon[],phantomList?:SelectedPhantom[]):number => {
  const result = useCalculationList.find((row) => row.key === expressionName)?.value(effect,effectList,parameter,weaponList,phantomList)
  return result? result : 0
}

// 守護幻獣スキル倍率アップ
const guardianSkillEnhance:ExpressionSkillEnhance = (effect:SelectedEffect):ReturnSkillEnhance => {
  return  (selectedeffect:SelectedEffect) => {
    return (selectedeffect.elementId === effect.elementId && selectedeffect.skill.skillCategoryId === 1)? effect.level * 5 + 15 : 0
  }
}

// カタスウエポンスキル倍率アップ
const catasSkillEnhance:ExpressionSkillEnhance = (effect:SelectedEffect):ReturnSkillEnhance => {
  return (selectedEffect:SelectedEffect) => {
    return (selectedEffect.elementId === effect.elementId && selectedEffect.skill.skillCategoryId === 1)? 50 : 0
  }
}

// 旺極スキル倍率アップ
const vigorousSkillEnhance:ExpressionSkillEnhance = (effect:SelectedEffect):ReturnSkillEnhance => {
  return (selectedEffect:SelectedEffect) => {
    return (selectedEffect.elementId === effect.elementId && selectedEffect.effect.id === 4 )? 50 : 0
  }
}

// 反極スキル倍率アップ
const prideSkillEnhance:ExpressionSkillEnhance = (effect:SelectedEffect):ReturnSkillEnhance => {
  return (selectedEffect:SelectedEffect) => {
    return (selectedEffect.elementId === effect.elementId && selectedEffect.effect.id === 3 )? 50 : 0
  }
}

const useCalculationSkillEnchancerList = [
  {key:"catasSkillEnhance",value:catasSkillEnhance},
  {key:"guardianSkillEnhance",value:guardianSkillEnhance},
  {key:"vigorousSkillEnhance",value:vigorousSkillEnhance},
  {key:"prideSkillEnhance",value:prideSkillEnhance}
]

export const resultExpressionSkillEnhance = (expressionName:string,effect:SelectedEffect):ReturnSkillEnhance => {
  const result = useCalculationSkillEnchancerList.find((row) => row.key === expressionName) as {key:string,value:ExpressionSkillEnhance}
  return result.value(effect)
}


// カラミティエンハンス
const calamityWeaponEnhance:ExpressionWeaponEnhance = (effect:SelectedEffect):ReturnWeaponEnhance => {
  return  (weaponTypeId:number) => {
    return (weaponTypeId === effect.weapon.typeId)? {attackEnhance: 30 , hpEnhance : 45} : {attackEnhance: 0, hpEnhance: 0}
  }
}

const useCalculationWeaponEnhanceList = [
  {key:"calamityWeaponEnhance",value:calamityWeaponEnhance}
]

export const resultExpressionWeaponEnhance = (expressionName:string,effect:SelectedEffect):ReturnWeaponEnhance => {
  const result = useCalculationWeaponEnhanceList.find((row) => row.key === expressionName) as {key:string,value:ExpressionWeaponEnhance}
  return result.value(effect)
}