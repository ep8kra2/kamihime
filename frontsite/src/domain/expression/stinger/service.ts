import { Parameter, SelectedEffect } from "../../../state/calculate/type"
import { CoefficientAndConstant, Expression } from "../type"
import { 
  coefficientAndConstantOfRateUpList,  } from "./const"

// 急所(攻撃威力UP)
export const stingerAttackUp:Expression= (effect:SelectedEffect,effectList:SelectedEffect[],parameter:Parameter):number => {
  return 20
}

// 急所(確率UP)
export const stingerRateUp:Expression= (effect:SelectedEffect,effectList:SelectedEffect[],parameter:Parameter):number => {
  const {coefficient,constant} = coefficientAndConstantOfRateUpList.find((row) => row.powerId === effect.powerId) as CoefficientAndConstant
  return coefficient? constant + coefficient * effect.level : 0
}

// 急所期待値
export const stingerExpectation:Expression= (effect:SelectedEffect,effectList:SelectedEffect[],parameter:Parameter):number => {
  return stingerRateUp(effect,effectList,parameter) * stingerAttackUp(effect,effectList,parameter) / 100
}


