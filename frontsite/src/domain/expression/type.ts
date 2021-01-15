import { Parameter, SelectedEffect, SelectedPhantom, SelectedWeapon } from "../../state/calculate/type";

export type ReturnSkillEnhance = (selectedEffect:SelectedEffect) => number;

export type ReturnWeaponEnhance = (weaponTypeId:number) => {attackEnhance:number,hpEnhance:number};

export type Expression =  (effect:SelectedEffect,effectList:SelectedEffect[],parameter:Parameter,weaponList?:SelectedWeapon[],phantomList?:SelectedPhantom[]) => number;

export type ExpressionSkillEnhance = (effect:SelectedEffect) => ReturnSkillEnhance;

export type ExpressionWeaponEnhance = (effect:SelectedEffect) => ReturnWeaponEnhance;

export type ExpressionMatchElement = (effect:SelectedEffect,targetOfElementId:number) => boolean;

export type CoefficientAndConstant = {
  powerId:number,
  coefficient:number,
  constant:number
}