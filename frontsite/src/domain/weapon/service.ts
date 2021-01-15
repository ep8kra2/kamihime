import { Weapon } from "../../state/weapon/type";

export const getWeaponHp = (weapon:Weapon,level:number) => {
  if(weapon === undefined){ return 0}
  const maxLevel = weapon.weaponIdBeforeLimitBreak > 0 ? 150 : 125
  return weapon.minHp + (weapon.maxHp - weapon.minHp) / (maxLevel - 1) * (level - 1)
}

export const getWeaponAt = (weapon:Weapon,level:number) => {
  if(weapon === undefined){ return 0}
  const maxLevel = weapon.weaponIdBeforeLimitBreak > 0 ? 150 : 125
  return weapon.minAt + (weapon.maxAt - weapon.minAt) / (maxLevel -1)  * (level - 1)
}