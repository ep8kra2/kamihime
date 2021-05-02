import { Parameter, SelectedEffect } from "../../../state/calculate/type"
import { CoefficientAndConstant, Expression } from "../type"
import { 
  coefficientAndConstantOfAttackUpList,
  coefficientAndConstantOfLimitUpList  
} from "./const"

// 回復性能UP
export const ascensionUp:Expression= (effect:SelectedEffect,effectList:SelectedEffect[],parameter:Parameter):number => {
  const {coefficient,constant} = coefficientAndConstantOfAttackUpList.find((row) => row.powerId === effect.powerId) as CoefficientAndConstant
  return coefficient? constant + coefficient * effect.level : 0
}

// テクニカ(通常攻撃上限UP)
export const ascensionLimitUp:Expression= (effect:SelectedEffect,effectList:SelectedEffect[],parameter:Parameter):number => {
  const {coefficient,constant} = coefficientAndConstantOfLimitUpList.find((row) => row.powerId === effect.powerId) as CoefficientAndConstant
  return constant? constant + coefficient * effect.level : 0
}
