import { Parameter, SelectedEffect } from "../../../state/calculate/type"
import { CoefficientAndConstant, Expression } from "../type"
import { 
  coefficientAndConstantList,  } from "./const"

// HPUP
export const defender:Expression= (effect:SelectedEffect,effectList:SelectedEffect[],parameter:Parameter):number => {
  const {coefficient,constant} = coefficientAndConstantList.find((row) => row.powerId === effect.powerId) as CoefficientAndConstant
  return coefficient? constant + coefficient * effect.level : 0
}
