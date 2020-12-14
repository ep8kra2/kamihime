export interface WeaponType{
  id:number,
  name:string
}

export interface WeaponTypeState{
  selected:WeaponType,
  list:WeaponType[]
}