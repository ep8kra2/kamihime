import { Parameter, SelectedEffect } from "../../../state/calculate/type"
import { Expression } from "../type"
import { coefficientAndConstantOfAttackUpList } from "./const"

// プライド(攻撃威力UP)
export const prideAttackUp:Expression= (effect:SelectedEffect,effectList:SelectedEffect[],parameter:Parameter):number => {
  const coefficientAndConstant = coefficientAndConstantOfAttackUpList.find((row) => row.powerId === effect.powerId)
  return coefficientAndConstant? coefficientAndConstant.coefficient * effect.level + coefficientAndConstant.constant * ( 1 - parameter.hpRate.value / 100) : 0
}