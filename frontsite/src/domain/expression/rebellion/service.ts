import { Parameter, SelectedEffect } from "../../../state/calculate/type"
import { CoefficientAndConstant, Expression } from "../type"
import { coefficientAndConstantOfAttackUpList } from "./const"

// リベリオン(攻撃威力UP)
export const rebellionAttackUp:Expression= (effect:SelectedEffect,effectList:SelectedEffect[],parameter:Parameter):number => {
  const {coefficient,constant} = coefficientAndConstantOfAttackUpList.find((row) => row.powerId === effect.powerId) as CoefficientAndConstant
  return coefficient? (constant?  (effect.level * coefficient + constant) * Math.pow(1 - parameter.hpRate.value / 100, 1.5) :0 ) : 0
}