import { Parameter, SelectedEffect, SelectedWeapon, SelectedPhantom, Attack } from "../../../state/calculate/type";
import { Impact } from "../../../state/impact/type";
import {Element} from '../../../state/element/type';
import { getInitAttackList, isSkillEnhance, isWeaponEnhance, resultAttackFromSelectedWeaponList, updateAttackListFromPhantomList, updateAttackListFromWeaponList } from "../service";

// 通常攻撃リストに含めるのか？
const isNormal = (categoryId:number) => {
  return categoryId === 1 || categoryId === 2 ? true : false;
}

// 通常攻撃リストを返します
export const resultNormalAttackList = (parameter:Parameter, effectList:SelectedEffect[],impactList:Impact[],elementList:Element[],weaponList:SelectedWeapon[],phantomList:SelectedPhantom[]):Attack[] => {
  const effectNormalList = effectList.filter((row) => isNormal(row.effect.categoryId))
  const initAttackNormal = impactList.reduce((result,row) => {
    if(isNormal(row.categoryId)){
      result[row.name] = 0
    }
    return result;
  },{} as Attack )

  // 影響値をセット
  const skillEnhanceList = effectList.filter((row) => isSkillEnhance(row.effect.categoryId))
  const weaponEnhanceList = effectList.filter((row) => isWeaponEnhance(row.effect.categoryId))
  const attackList = getInitAttackList(initAttackNormal,parameter,elementList)
  const attackListWithWeapon = updateAttackListFromWeaponList(attackList,weaponList,parameter,weaponEnhanceList)
  const attackListWithWeaponAndPhantom = updateAttackListFromPhantomList(attackListWithWeapon,phantomList,parameter)
  return resultAttackFromSelectedWeaponList(attackListWithWeaponAndPhantom,effectNormalList,skillEnhanceList)
}

// 減衰後の数値を算出します
export const getRealValue = (uncontrolledValue:number,limitBreakRate:number) => {
  // 第1減衰
  const firstLimit = (350000 * (1 + limitBreakRate / 100))
  const secondLimit = (450000 * (1 + limitBreakRate / 100))
  const thirdLimit = (550000 * (1 + limitBreakRate / 100))
  const firstAttenuation = 0.5
  const secondAttenuation = 0.25
  const thirdAttenuation = 0.125

  // 第1減衰到達判断
  if(uncontrolledValue <= firstLimit){
    return uncontrolledValue
  }

  // 第1減衰適用後数値
  const firstLimitValue = firstLimit + (uncontrolledValue - firstLimit) * firstAttenuation

  // 第2減衰到達判断
  if(firstLimitValue <= secondLimit){
    return firstLimitValue
  }
  // 第2減衰適用後数値
  const secondLimitValue = secondLimit + (firstLimitValue - secondLimit) * secondAttenuation

  // 第3減衰到達判断
  if(secondLimitValue <= thirdLimit){
    return secondLimitValue
  }

  // 第3減衰適用後数値
  return (thirdLimit + (secondLimitValue - thirdLimit) * thirdAttenuation)
}