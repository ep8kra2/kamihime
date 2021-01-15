import { Parameter, SelectedEffect, SelectedPhantom, SelectedWeapon } from "../../../state/calculate/type"
import { Expression } from "../type"

// 140幻(攻撃威力UP)
export const phantom140AttackUp:Expression = (effect:SelectedEffect,effectList:SelectedEffect[],parameter:Parameter,weaponList?:SelectedWeapon[],phantomList?:SelectedPhantom[]):number => {
  if(effectList === undefined) {return 0}
  return effect.level * 5 + 95 +  (phantomList? phantomList.filter((row) => row.slot >= 3 && (row.phantom? row.phantom.elementId === effect.elementId : false)).length * 8 : 0)
}