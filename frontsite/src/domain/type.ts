import { SelectedPhantom, SelectedWeapon } from "../state/calcurate/type"

export type Hiroic = (at:number,parameter:CalcurateParameter) => number
export type Vigorous = (at:number,parameter:CalcurateParameter) => number
export type Pride = (at:number,parameter:CalcurateParameter) => number
export type Rebellion = (at:number,parameter:CalcurateParameter) => number

export type CalcurateParameter = {
  slot:number,
  hpRate:number,
  weaponList:SelectedWeapon[],
  PhantomList:SelectedPhantom[],
  skillLevel:number
}