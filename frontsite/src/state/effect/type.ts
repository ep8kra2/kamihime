import { CalcurateParameter } from "../../domain/type"

export type Effect = {
  id:number,
  name:string,
  categoryId:number,
  categoryName:string,
  impactId:number,
  impactName:string,
  calcurate:string,
  cal:(x:number,y:CalcurateParameter) => number
}

export type EffectPower = {
  id: number,
  effectId: number,
  effectName:string,
  elementId:number,
  slot:number,
  power:number
}

export type EffectState = {
  selected:Effect,
  list:Effect[]
}