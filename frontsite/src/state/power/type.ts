export type Power={
  id:number,
  name:string,
}

export type PowerState={
  selected:Power,
  list:Power[],
  asyncStatus:string
}
