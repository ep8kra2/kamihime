import { SelectedEffect } from "../../../state/calculate/type"
import { ExpressionSkillEnhance, ReturnSkillEnhance } from "../type"

// 守護幻獣スキル倍率アップ
export const guardianSkillEnhance:ExpressionSkillEnhance = (effect:SelectedEffect):ReturnSkillEnhance => {
  return  (selectedeffect:SelectedEffect) => {
    return (selectedeffect.elementId === effect.elementId && selectedeffect.skill.skillCategoryId === 1)? effect.level * 5 + 15 : 0
  }
}