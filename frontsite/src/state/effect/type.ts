
export type Effect = {
  id:number,
  name:string,
  categoryId:number,
  categoryName:string,
  impactId:number,
  impactName:string,
  impactTypeId:number,
  impactTypeName:string,
  limitValue:number,
  calculationId:number,
  calculationName:string,
  expressionName:string,
  expression:string,
  marks:string
}

export type EffectState = {
  selected:Effect,
  list:Effect[]
}