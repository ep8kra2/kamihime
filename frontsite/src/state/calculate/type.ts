import { Weapon } from '../weapon/type'
import { Phantom } from '../phantom/type'; 
import { Effect } from '../effect/type';

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
  marks:string
}

export type Parameter = {
  playerRank:number,
  elementShinki:number,
  attackShinki:number,
  hpShinki:number,
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
  skillId:number,
  powerId:number,
  elementId:number, 
  level:number
}

export type SelectedEffect = {
  slot:number,
  skillId:number,
  powerId:number,
  elementId:number,
  level:number,
  effect:Effect,
  impactValue:number
}

export type CalcurateState = {
  selectedWeapon:SelectedWeapon,
  listWeapon:SelectedWeapon[],
  selectedPhantom:SelectedPhantom,
  listPhantom:SelectedPhantom[],
  parameter:Parameter
}
