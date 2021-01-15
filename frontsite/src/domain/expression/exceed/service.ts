import { Parameter, SelectedEffect } from "../../../state/calculate/type"
import { CoefficientAndConstant, Expression } from "../type"
import { 
  coefficientAndConstantOfBarstAttackUpList, 
  coefficientAndConstantOfBarstLimitUpList } from "./const"

// エクシード(バースト威力UP)
export const exceedBarstAttackUp:Expression= (effect:SelectedEffect,effectList:SelectedEffect[],parameter:Parameter):number => {
  const {coefficient,constant} = coefficientAndConstantOfBarstAttackUpList.find((row) => row.powerId === effect.powerId) as CoefficientAndConstant
  return coefficient? constant + coefficient * effect.level : 0
}

// エクシード(バースト上限UP)
export const exceedBarstLimitUp:Expression= (effect:SelectedEffect,effectList:SelectedEffect[],parameter:Parameter):number => {
  const {coefficient,constant} = coefficientAndConstantOfBarstLimitUpList.find((row) => row.powerId === effect.powerId) as CoefficientAndConstant
  return coefficient? constant + coefficient * effect.level : 0
}