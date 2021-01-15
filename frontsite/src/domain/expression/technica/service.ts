import { Parameter, SelectedEffect } from "../../../state/calculate/type"
import { CoefficientAndConstant, Expression } from "../type"
import { coefficientAndConstantOfAttackUpList, coefficientAndConstantOfLimitUpList } from "./const"

// テクニカ(通常攻撃威力UP)
export const technicaNormalAttackUp:Expression= (effect:SelectedEffect,effectList:SelectedEffect[],parameter:Parameter):number => {
  const {coefficient,constant} = coefficientAndConstantOfAttackUpList.find((row) => row.powerId === effect.powerId) as CoefficientAndConstant
  return coefficient? coefficient * effect.level + constant : 0
}

// テクニカ(通常攻撃上限UP)
export const technicaNormalLimitUp:Expression= (effect:SelectedEffect,effectList:SelectedEffect[],parameter:Parameter):number => {
  const {constant} = coefficientAndConstantOfLimitUpList.find((row) => row.powerId === effect.powerId) as CoefficientAndConstant
  return constant? constant : 0
}