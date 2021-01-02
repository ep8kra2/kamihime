import { SelectedPhantom, SelectedWeapon } from "../../state/calculate/type"

export type CalculateParameter = {
  slot:number,
  hpRate:number,
  weaponList:SelectedWeapon[],
  phantomList:SelectedPhantom[],
  skillLevel:number,
  elementId:number
}
