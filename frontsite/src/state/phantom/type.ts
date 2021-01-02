export type Phantom = {
  id:number,
  name:string,
  rarityId:number,
  rarityName:string,
  elementId:number,
  elementName:string,
  mainSkillId:number,
  mainSkillName:string,
  subSkillId:number,
  subSkillName:string,
  minHp:number,
  maxHp:number,
  minAt:number,
  maxAt:number,
  limitBreak:number
}

export type PhantomState = {
  selected:Phantom,
  list:Phantom[],
  asyncStatus:string
}