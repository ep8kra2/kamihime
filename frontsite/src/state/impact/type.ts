export type Impact={
  id:number,
  name:string,
}

export type ImpactState={
  selected:Impact,
  list:Impact[],
  asyncStatus:string
}
