import { Weapon } from '../weapon/type'
import { Phantom } from '../phantom/type'; 
import {Hiroic,Vigorous,Pride,Rebellion} from '../../domain/type';
import { Effect } from '../../state/effect/type';
import { SkillEffect } from '../skill/type';
import { EffectLevel, EffectLevelDetail } from '../effectlevel/type';
import { CategoryDetail } from '../category/type';

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
  elementId:number,
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
  elementId:number,
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
  elementId:number,
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
  calcurate:Calcurate,
  effectList:Effect[],
  skillEffectList:SkillEffect[],
  effectLevelList:EffectLevel[],
  effectLevelDetailList:EffectLevelDetail[],
  categoryDetailList:CategoryDetail[]
}
