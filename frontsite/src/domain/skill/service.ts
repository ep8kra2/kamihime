import { SelectedPhantom, SelectedSkill, SelectedWeapon } from "../../state/calculate/type"
import { Skill } from "../../state/skill/type"

// 選択した武器一覧からスキル一覧を取得します
export const getSkillListFromSelectedWeaponList = (selectedWeaponList:SelectedWeapon[],skillList:Skill[]):SelectedSkill[] => {
  return selectedWeaponList.reduce((result,row) => {
    if(row.weapon === undefined) { return result}
    if(row.weapon.slot1SkillId !== undefined) {
      result.push({slot:row.slot,
        skill:skillList.find((fl) => fl.id === row.weapon.slot1SkillId) as Skill,
        powerId:row.weapon.slot1PowerId,
        elementId:row.weapon.elementId, 
        level:row.level,
        skillType:1
      })
    }

    if(row.weapon.slot2SkillId) {
      result.push({slot:row.slot,
        skill:skillList.find((fl) => fl.id === row.weapon.slot2SkillId) as Skill,
        powerId:row.weapon.slot2PowerId,
        elementId:row.weapon.elementId, 
        level:row.level,
        skillType:1})
    }

    return result
  },[] as SelectedSkill[] )
}

export const getPhantomMainSkillListFromPhantomList = (selectedPhantomList:SelectedPhantom[],skillList:Skill[]):SelectedSkill[] => {
  return selectedPhantomList.filter((fil) => fil.slot === 1 || fil.slot === 2 ).reduce((result,row) => {
    if(row.phantom === undefined) { return result}
    if(row.phantom.mainSkillId !== undefined) {
      result.push({slot:row.slot,
        skill:skillList.find((fl) => fl.id === row.phantom.mainSkillId) as Skill,
        powerId:1,
        elementId:row.phantom.elementId, 
        level:row.rank,
        skillType:2})
    }

    return result
  },[] as SelectedSkill[] )

}

export const getPhantomSubSkillListFromPhantomList = (selectedPhantomList:SelectedPhantom[],skillList:Skill[]):SelectedSkill[] => {
  return selectedPhantomList.filter((fil) => fil.slot >= 3 ).reduce((result,row) => {
    if(row.phantom === undefined) { return result}
    if(row.phantom.subSkillId !== undefined) {
      result.push({slot:row.slot,
        skill:skillList.find((fl) => fl.id === row.phantom.subSkillId) as Skill,
        powerId:1,
        elementId:row.phantom.elementId, 
        level:row.rank,
        skillType:3})
    }

    return result
  },[] as SelectedSkill[] )

}