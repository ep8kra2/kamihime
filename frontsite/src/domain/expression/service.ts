import { Parameter, SelectedEffect, SelectedPhantom, SelectedWeapon } from "../../state/calculate/type";
import { assaultAttackUp } from "./assault/service";
import { calamityAttackUp, calamityWeaponEnhance } from "./calamity/service";
import { catasAttackUp, catasSkillEnhance } from "./catas/service";
import { exceedBarstAttackUp, exceedBarstLimitUp } from "./exceed/service";
import { guardianSkillEnhance } from "./guardian/service";
import { hiroicAttackUp } from "./hiroic/service";
import { matchElementAll, matchElementEqual, matchFireAndDark, matchFireAndWater, matchThunderAndDark, matchThunderAndLight, matchWaterAndWindAndLight, matchWindAndThunderAndDark } from "./matchElement/service";
import { phantom100AttackUp } from "./phantom100/service";
import { phantom100LightOrDarkAttackUp } from "./phantom100LightOrDark/service";
import { phantom140AttackUp } from "./phantom140/service";
import { phantom20AttackUp, phantom20_30AttackUp } from "./phantom20/service";
import { phantom30AttackUp } from "./phantom30/service";
import { phantom40AttackUp } from "./phantom40/service";
import { prideAttackUp } from "./pride/service";
import { prideSkillEnhance } from "./prideenhance/service";
import { rebellionAttackUp } from "./rebellion/service";
import { stingerExpectation, stingerRateUp } from "./stinger/service";
import { subSkill5AttackUp, subSkill10AttackUp, subSkill20AttackUp } from "./subskill/service";
import { technicaNormalAttackUp, technicaNormalLimitUp } from "./technica/service";
import { ExpressionMatchElement, ExpressionSkillEnhance, ExpressionWeaponEnhance, ReturnSkillEnhance, ReturnWeaponEnhance } from "./type";
import { vigorousAttackUp } from "./vigorous/service";
import { vigorousSkillEnhance } from "./vigorousEnhance/service";

export const useCalculationList = [
  {key:"assaultAttackUp",value:assaultAttackUp},
  {key:"prideAttackUp",value:prideAttackUp},
  {key:"vigorousAttackUp",value:vigorousAttackUp},
  {key:"rebellionAttackUp",value:rebellionAttackUp},
  {key:"technicaNormalAttackUp",value:technicaNormalAttackUp},
  {key:"technicaNormalLimitUp",value:technicaNormalLimitUp},
  {key:"hiroicAttackUp",value:hiroicAttackUp},
  {key:"phantom100AttackUp",value:phantom100AttackUp},
  {key:"phantom100LightOrDarkAttackUp",value:phantom100LightOrDarkAttackUp},
  {key:"phantom140AttackUp",value:phantom140AttackUp},
  {key:"phantom20_30AttackUp",value:phantom20_30AttackUp},
  {key:"phantom20AttackUp",value:phantom20AttackUp},
  {key:"phantom30AttackUp",value:phantom30AttackUp},
  {key:"phantom40AttackUp",value:phantom40AttackUp},
  {key:"catasAttackUp",value:catasAttackUp},
  {key:"calamityAttackUp",value:calamityAttackUp},
  {key:"exceedBarstAttackUp",value:exceedBarstAttackUp},
  {key:"exceedBarstLimitUp",value:exceedBarstLimitUp},
  {key:"subSkill5AttackUp",value:subSkill5AttackUp},
  {key:"subSkill10AttackUp",value:subSkill10AttackUp},
  {key:"subSkill20AttackUp",value:subSkill20AttackUp},
  {key:"stingerRateUp",value:stingerRateUp},
  {key:"stingerExpectation",value:stingerExpectation}
]

export const resultExpression = (expressionName:string,effect:SelectedEffect,effectList:SelectedEffect[],parameter:Parameter,weaponList?:SelectedWeapon[],phantomList?:SelectedPhantom[]):number => {
  const result = useCalculationList.find((row) => row.key === expressionName)?.value(effect,effectList,parameter,weaponList,phantomList)
  return result? result : 0
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

const useCalculationWeaponEnhanceList = [
  {key:"calamityWeaponEnhance",value:calamityWeaponEnhance}
]

export const resultExpressionWeaponEnhance = (expressionName:string,effect:SelectedEffect):ReturnWeaponEnhance => {
  const result = useCalculationWeaponEnhanceList.find((row) => row.key === expressionName) as {key:string,value:ExpressionWeaponEnhance}
  return result.value(effect)
}

export const useCalculationMatchElementList = [
  {key:"default",value:matchElementEqual},
  {key:"all",value:matchElementAll},
  {key:"火水",value:matchFireAndWater},
  {key:"火闇",value:matchFireAndDark},
  {key:"雷光",value:matchThunderAndLight},
  {key:"雷闇",value:matchThunderAndDark},
  {key:"水風光",value:matchWaterAndWindAndLight},
  {key:"風雷闇",value:matchWindAndThunderAndDark}
]

export const resultExpressionMatchElement = (effect:SelectedEffect,targetOfElementId:number) => {
  const expressionName = effect.skill.elements?  effect.skill.elements : "default" 
  const result = useCalculationMatchElementList.find((row) => row.key === expressionName) as {key:string,value:ExpressionMatchElement}
  return result.value(effect,targetOfElementId)
}


