export type Effect = {
  id:number,
  name:string,
  categoryId:number,
  categoryName:string,
  categoryDetailId:number,
  categoryDetailName:string,
  calcurate:string,
  cal:(x:number,y:number) => number
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