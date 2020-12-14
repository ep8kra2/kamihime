export type Rarity={
  id:number,
  name:string,
}

export type RarityState={
  selected:Rarity,
  list:Rarity[],
  asyncStatus:string
}
