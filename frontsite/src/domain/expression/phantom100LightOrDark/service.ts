import { Parameter, SelectedEffect, SelectedPhantom, SelectedWeapon } from "../../../state/calculate/type"
import { Expression } from "../type"

// 100幻(攻撃威力UP)
export const phantom100LightOrDarkAttackUp:Expression = (effect:SelectedEffect,effectList:SelectedEffect[],parameter:Parameter,weaponList?:SelectedWeapon[],phantomList?:SelectedPhantom[]):number => {
  if(effectList === undefined) {return 0}
  return 80 + (effect.level === 6 ? 15 : 0)  + (3 + effect.level) * (phantomList? phantomList.filter((row) => row.slot >= 3 && (row.phantom? row.phantom.elementId === effect.elementId : false)).length : 0)
}