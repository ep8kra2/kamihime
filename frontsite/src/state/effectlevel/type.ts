export type EffectLevel = {
  id: number,
  effectId: number,
  effectName: string,
  categoryDetailId: number,
  categoryDetailName: string,
  powerId: number,
  powerName: string,
  calcuration: string
}

export type EffectLevelDetail = {
  id: number,
  effectLevelId:number,
  level:number,
  value:number
}

export type EffectLevelState = {
  selected:EffectLevel,
  list:EffectLevel[],
  detailList:EffectLevelDetail[],
  asyncStatus:string
}