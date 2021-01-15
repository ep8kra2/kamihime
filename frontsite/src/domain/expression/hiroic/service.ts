import { Parameter, SelectedEffect } from "../../../state/calculate/type"
import { Expression } from "../type"

// 英霊武器(攻撃威力UP)
export const hiroicAttackUp:Expression= (effect:SelectedEffect,effectList:SelectedEffect[],parameter:Parameter):number => {
  return  effect.slot === 1? 10 + effect.level : 0
}

// 英霊武器(HPUP)
export const hiroicHpUp:Expression= (effect:SelectedEffect,effectList:SelectedEffect[],parameter:Parameter):number => {
  return  effect.slot === 1? 10 + effect.level : 0
}