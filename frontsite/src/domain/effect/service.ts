import { SelectedEffect, SelectedSkill } from "../../state/calculate/type"
import { Effect } from "../../state/effect/type"
import { SkillEffect } from "../../state/skill/type"

// スキル一覧からエフェクト一覧を取得します
export const getEffectListFromSkillList = (list:SelectedSkill[],skillEffectList:SkillEffect[],effectList:Effect[]):SelectedEffect[] => {
  // スキル　→　エフェクト
  const getSkillEffect = (skillId:number) => { return skillEffectList.filter((row) => row.skillId === skillId) as SkillEffect[] }
  // エフェクト情報
  const getEffect = (effectId:number) => { return effectList.find((row) => row.id === effectId) as Effect}

  return list.reduce((result,row) => {
    return result.concat(getSkillEffect(row.skillId).map((rowEffect) => {
      return {
        effect:getEffect(rowEffect.effectId),
        slot:row.slot,
        skillId:row.skillId,
        powerId:row.powerId,
        elementId:row.elementId,
        level:row.level,
        impactValue:0
      }
    }))
  },[] as SelectedEffect[]);
}