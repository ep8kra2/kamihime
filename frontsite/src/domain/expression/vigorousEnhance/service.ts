import { SelectedEffect } from "../../../state/calculate/type"
import { ExpressionSkillEnhance, ReturnSkillEnhance } from "../type"

// 反極スキル倍率アップ
export const vigorousSkillEnhance:ExpressionSkillEnhance = (effect:SelectedEffect):ReturnSkillEnhance => {
  return (selectedEffect:SelectedEffect) => {
    return (selectedEffect.elementId === effect.elementId && selectedEffect.effect.id === 4 )? 50 : 0
  }
}