import { Parameter, SelectedEffect, SelectedWeapon, SelectedPhantom, Attack } from "../../../state/calculate/type";
import { Impact } from "../../../state/impact/type";
import {Element} from '../../../state/element/type';
import { getInitAttackList, isSkillEnhance, isWeaponEnhance, resultAttackFromSelectedWeaponList, updateAttackListFromPhantomList, updateAttackListFromWeaponList } from "../service";

// バースト攻撃リストに含めるのか？
const isBarst = (categoryId:number) => {
  return categoryId === 1 || categoryId === 3 ? true : false;
}

// 神姫バースト倍率セット
const setBarstRate = (attackList:Attack[],parameter:Parameter):Attack[] => {
  const index = attackList.findIndex((row) => row.elementId === parameter.elementId) 
  attackList[index] = {...attackList[index],
    "バースト":Number(attackList[index]["バースト"]) + parameter.barstRate * 100,
    "バースト上限UP":Number(attackList[index]["バースト上限UP"]) + parameter.barstLimitUp
  }
  return attackList
}


// バースト攻撃リストを返します
export const resultBarstAttackList = (parameter:Parameter, effectList:SelectedEffect[],impactList:Impact[],elementList:Element[],weaponList:SelectedWeapon[],phantomList:SelectedPhantom[]):Attack[] => {
  const effectBarstList = effectList.filter((row) => isBarst(row.effect.categoryId))

  const initAttackBarst = impactList.reduce((result,row) => {
    if(isBarst(row.categoryId)){
      result[row.name] = 0
    }
    return result;
  },{} as Attack )

  // 影響値をセット
  const skillEnhanceList = effectList.filter((row) => isSkillEnhance(row.effect.categoryId))
  const weaponEnhanceList = effectList.filter((row) => isWeaponEnhance(row.effect.categoryId))
  const attackList = getInitAttackList(initAttackBarst,parameter,elementList)
  const attackListWithWeapon = updateAttackListFromWeaponList(attackList,weaponList,parameter,weaponEnhanceList)
  const attackListWithWeaponAndPhantom = updateAttackListFromPhantomList(attackListWithWeapon,phantomList,parameter)
  const resultBurstAttackList = resultAttackFromSelectedWeaponList(attackListWithWeaponAndPhantom,effectBarstList,skillEnhanceList)
  return setBarstRate(resultBurstAttackList,parameter)
}


// 減衰後の数値を算出します
export const getRealValue = (uncontrolledValue:number,limitBreakRate:number) => {
  // 第1減衰
  const firstLimit = (1000000 * (1 + limitBreakRate / 100))
  const firstAttenuation = 0.1

  // 第1減衰到達判断
  if(uncontrolledValue <= firstLimit){
    return uncontrolledValue
  }

  // 第1減衰適用後数値
  return firstLimit + (uncontrolledValue - firstLimit) * firstAttenuation

}