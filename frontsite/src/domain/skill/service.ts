import { SelectedSkill, SelectedWeapon } from "../../state/calculate/type"

// 選択した武器一覧からスキル一覧を取得します
export const getSkillListFromSelectedWeaponList = (selectedWeaponList:SelectedWeapon[]):SelectedSkill[] => {
  return selectedWeaponList.reduce((result,row) => {
    if(row.weapon === undefined) { return result}
    if(row.weapon.slot1SkillId !== undefined) {
      result.push({slot:row.slot,
        skillId:row.weapon.slot1SkillId,
        powerId:row.weapon.slot1PowerId,
        elementId:row.weapon.elementId, 
        level:row.level})
    }

    if(row.weapon.slot2SkillId) {
      result.push({slot:row.slot,
        skillId:row.weapon.slot2SkillId,
        powerId:row.weapon.slot2PowerId,
        elementId:row.weapon.elementId, 
        level:row.level})
    }

    return result
  },[] as SelectedSkill[] )
}