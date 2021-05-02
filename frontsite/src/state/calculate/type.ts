import { Weapon } from '../weapon/type'
import { Phantom } from '../phantom/type'; 
import { Effect } from '../effect/type';
import { Skill } from '../skill/type';
import { ReturnSkillEnhance, ReturnWeaponEnhance } from '../../domain/expression/type';

export type SelectedWeapon = {
  slot:number,
  weapon:Weapon,
  level:number,
  skillLevel:number,
  marks:string
}

export type SelectedPhantom = {
  slot:number,
  phantom:Phantom,
  level:number,
  rank:number,
  marks:string
}

export type EffectValue = {
  name:string,
  categoryId:number,
  impactTypeId:number,
  value:number
}

export type Parameter = {
  [key:string]:EffectValue,
  playerRank:EffectValue,
  elementId:EffectValue,
  goodAtWeapon1:EffectValue,
  goodAtWeapon2:EffectValue,
  hpRate:EffectValue,
  enemyDefence:EffectValue,
  debufferDefence:EffectValue,
  attack:EffectValue,
  hp:EffectValue,
  barstRate:EffectValue,
  barstLimitUp:EffectValue,
}

export type Attack = { 
  elementId:number,
  elementName:string,
  values:EffectValue[]
};

export type SelectedSkill = {
  slot:number,
  skill:Skill,
  phantom:Phantom,
  weapon:Weapon,
  powerId:number,
  elementId:number, 
  level:number,
  skillType:number
}

export type SelectedEffect = {
  slot:number,
  skill:Skill,
  phantom:Phantom,
  weapon:Weapon,
  powerId:number,
  elementId:number,
  level:number,
  effect:Effect,
  impactValue:number,
  skillType:number,
  skillEnhance?:ReturnSkillEnhance,
  weaponEnhance?:ReturnWeaponEnhance,
  matchElement?:(elementId:number) => boolean
}

export type CalcurateState = {
  selectedWeapon:SelectedWeapon,
  listWeapon:SelectedWeapon[],
  selectedPhantom:SelectedPhantom,
  listPhantom:SelectedPhantom[],
  parameter:Parameter
}
