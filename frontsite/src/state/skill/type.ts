export type Skill={
  id:number,
  name:string,
  skillCategoryId:number,
  skillCategoryName:string
}

export type SkillEffect={
  id:number,
  skillId:number,
  skillName:string,
  effectId:number,
  effectName:string
}

export type SkillState={
  selected:Skill,
  selectedEffect:SkillEffect,
  selectedEffectList:SkillEffect[],
  list:Skill[],
  listEffect:SkillEffect[]
}
