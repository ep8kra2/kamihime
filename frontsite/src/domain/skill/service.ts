import { SelectedPhantom, SelectedSkill, SelectedWeapon } from "../../state/calculate/type"

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

export const getPhantomMainSkillListFromPhantomList = (selectedPhantomList:SelectedPhantom[]):SelectedSkill[] => {
  return selectedPhantomList.filter((fil) => fil.slot === 1 || fil.slot === 2 ).reduce((result,row) => {
    if(row.phantom === undefined) { return result}
    if(row.phantom.mainSkillId !== undefined) {
      result.push({slot:row.slot,
        skillId:row.phantom.mainSkillId,
        powerId:1,
        elementId:row.phantom.elementId, 
        level:row.rank})
    }

    return result
  },[] as SelectedSkill[] )

}

export const getPhantomSubSkillListFromPhantomList = (selectedPhantomList:SelectedPhantom[]):SelectedSkill[] => {
  return selectedPhantomList.filter((fil) => fil.slot >= 3 ).reduce((result,row) => {
    if(row.phantom === undefined) { return result}
    if(row.phantom.subSkillId !== undefined) {
      result.push({slot:row.slot,
        skillId:row.phantom.subSkillId,
        powerId:1,
        elementId:row.phantom.elementId, 
        level:row.rank})
    }

    return result
  },[] as SelectedSkill[] )

}