import { Weapon } from '../weapon/type'
import { Phantom } from '../phantom/type'; 
import { Effect } from '../effect/type';
import { Skill } from '../skill/type';

export type SelectedWeapon = {
  slot:number,
  weapon:Weapon,
  level:number,
  marks:string
}

export type SelectedPhantom = {
  slot:number,
  phantom:Phantom,
  level:number,
  rank:number,
  marks:string
}

export type Parameter = {
  playerRank:number,
  elementId:number,
  goodAtWeapon1:number,
  goodAtWeapon2:number,
  attack:number,
  hp:number,
  hpRate:number,
  enemyDefence:number,
  debufferDefence:number
}

export type Attack = { 
  [index: string] : string | number,
  elementId:number,
  elementName:string,
  attack:number 
};

export type SelectedSkill = {
  slot:number,
  skill:Skill,
  powerId:number,
  elementId:number, 
  level:number,
  skillType:number
}

export type SelectedEffect = {
  slot:number,
  skill:Skill,
  powerId:number,
  elementId:number,
  level:number,
  effect:Effect,
  impactValue:number,
  skillType:number,
  powerValue?:(x:number,y:number) => number
}

export type CalcurateState = {
  selectedWeapon:SelectedWeapon,
  listWeapon:SelectedWeapon[],
  selectedPhantom:SelectedPhantom,
  listPhantom:SelectedPhantom[],
  parameter:Parameter
}
