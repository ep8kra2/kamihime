import { Parameter, SelectedEffect } from "../../../state/calculate/type"
import { Expression, ExpressionSkillEnhance, ReturnSkillEnhance } from "../type"

// カタス(攻撃威力UP)
export const catasAttackUp:Expression= (effect:SelectedEffect,effectList:SelectedEffect[],parameter:Parameter):number => {
   return effect.level * 20
}

// カタスウエポンスキル倍率アップ
export const catasSkillEnhance:ExpressionSkillEnhance = (effect:SelectedEffect):ReturnSkillEnhance => {
  return (selectedEffect:SelectedEffect) => {
    return (selectedEffect.elementId === effect.elementId && selectedEffect.skill.skillCategoryId === 1)? 50 : 0
  }
}