export interface Weapon{
  id:number,
  name:string,
  slot1PowerId:number,  
  slot1PowerName:string, 
  slot1SkillId:number,
  slot1SkillName:string, 
  slot2PowerId:number,
  slot2PowerName:string,  
  slot2SkillId:number,
  slot2SkillName:string,  
  beforeWeaponId:number,
  elementId:number,
  elementName:string,
  typeId:number,
  typeName:string,
  rarityId:number,
  rarityName:string,  
  maxHp:number,
  maxAt:number,
  weaponIdBeforeLimitBreak:number
}

export interface WeaponState{
  selected:Weapon,
  list:Weapon[]
}