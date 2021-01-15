import { Parameter, SelectedEffect, SelectedWeapon } from "../../../state/calculate/type"
import { Expression, ExpressionWeaponEnhance, ReturnWeaponEnhance } from "../type"

// カラミティ(攻撃威力UP)
export const calamityAttackUp:Expression = (effect:SelectedEffect,effectList:SelectedEffect[],parameter:Parameter,weaponList?:SelectedWeapon[]):number => {
  if(effectList === undefined){ return 0}
  const weaponCount = weaponList? weaponList.filter((row) => (row.weapon? row.weapon.typeId : 0) === effect.weapon.typeId).length : 0
  return (weaponCount >= 6)? effect.level * 0.5 + 6 : 0
}

// カラミティ武器エンハンス
export const calamityWeaponEnhance:ExpressionWeaponEnhance = (effect:SelectedEffect):ReturnWeaponEnhance => {
  return  (weaponTypeId:number) => {
    return (weaponTypeId === effect.weapon.typeId)? {attackEnhance: 30 , hpEnhance : 45} : {attackEnhance: 0, hpEnhance: 0}
  }
}