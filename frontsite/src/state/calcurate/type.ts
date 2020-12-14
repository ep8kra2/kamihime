import { Weapon } from '../weapon/type'
import { Phantom } from '../phantom/type'; 
import {Hiroic,Vigorous,Pride,Rebellion} from '../../domain/type';

export type Calcurate = {
  hiroic:Hiroic,
  vigorous:Vigorous,
  pride:Pride,
  rebellion:Rebellion,
}

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
  attackShinki:number,
  hpShinki:number,
  hpRate:number
}

export type AttackNormal = {
  elementName:string,
  attack:number,
  assault:number,
  element:number,
  vigorous:number,
  rebellion:number,
  special:number,
  technica:number
}

export type AttackBurst = {
  elementName:string,
  attack:number,
  assault:number,
  element:number,
  vigorous:number,
  rebellion:number,
  special:number,
  exceed:number
}

export type AttackAbility = {
  elementName:string,
  attack:number,
  assault:number,
  element:number,
  vigorous:number,
  rebellion:number,
  special:number,
  elaborate:number
}

export type CalcurateState = {
  selectedWeapon:SelectedWeapon,
  listWeapon:SelectedWeapon[],
  selectedPhantom:SelectedPhantom,
  listPhantom:SelectedPhantom[],
  attackNormal:AttackNormal[],
  attackBurst:AttackBurst[],
  attackAbility:AttackAbility[],
  calcurate:Calcurate
}
