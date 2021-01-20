import { Parameter, SelectedEffect } from "../../../state/calculate/type"
import { Expression } from "../type"

// 40幻(攻撃威力UP)
export const phantom20AttackUp:Expression = (effect:SelectedEffect,effectList:SelectedEffect[],parameter:Parameter):number => {
  return effectList? effect.level * 5 + 15 : 0
}

export const phantom20_30AttackUp:Expression = (effect:SelectedEffect,effectList:SelectedEffect[],parameter:Parameter):number => {
  return effectList? Math.floor(effect.level / 2) * 5 + 20 : 0
}
