export type Impact={
  id:number,
  name:string,
  categoryId:number,
  categoryName:string,
  impactTypeId:number,
  impactTypeName:string,
  limitValue:string
}

export type ImpactState={
  selected:Impact,
  list:Impact[],
  asyncStatus:string
}