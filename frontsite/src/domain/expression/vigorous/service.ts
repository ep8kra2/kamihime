import { Parameter, SelectedEffect } from "../../../state/calculate/type"
import { CoefficientAndConstant, Expression } from "../type"
import { coefficientAndConstantOfAttackUpList } from "./const"

// ヴィゴラス(攻撃威力UP)
export const vigorousAttackUp:Expression= (effect:SelectedEffect,effectList:SelectedEffect[],parameter:Parameter):number => {
  const {coefficient,constant} = coefficientAndConstantOfAttackUpList.find((row) => row.powerId === effect.powerId) as CoefficientAndConstant
  const result = coefficient?  Math.pow(effect.level * coefficient + constant , (parameter.hpRate.value / 100)) - Math.pow(effect.level * coefficient + constant,0.5) : 0
  return (result < 0 ? 0 : result)
}

