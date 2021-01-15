import { Parameter, SelectedEffect } from "../../../state/calculate/type"
import { Expression } from "../type"

// 100幻(攻撃威力UP)
export const phantom100AttackUp:Expression = (effect:SelectedEffect,effectList:SelectedEffect[],parameter:Parameter):number => {
  return effectList? effect.level * 5 + 95 + (effect.level === 6 ? 15 : 0) : 0 
}