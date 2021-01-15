import { Parameter, SelectedEffect } from "../../../state/calculate/type"
import { CoefficientAndConstant, Expression } from "../type"
import { 
  coefficientAndConstantOfAttackUpList,  } from "./const"

// アサルト(攻撃威力UP)
export const assaultAttackUp:Expression= (effect:SelectedEffect,effectList:SelectedEffect[],parameter:Parameter):number => {
  const {coefficient,constant} = coefficientAndConstantOfAttackUpList.find((row) => row.powerId === effect.powerId) as CoefficientAndConstant
  return coefficient? constant + coefficient * effect.level : 0
}
