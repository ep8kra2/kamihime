import { Attack, Parameter, SelectedEffect, SelectedPhantom, SelectedWeapon } from '../../state/calculate/type';
import { Calculation } from '../../state/calculation/type';
import {CalculateParameter} from './type';
import {Element} from '../../state/element/type';
import { Impact } from '../../state/impact/type';
import { resultExpression } from '../expression/service';
import { getPhantomAt } from '../phantom/service';

export const setAttackData = (selectedEffectList:SelectedEffect[],culculationList:Calculation[],parameter:Parameter, weaponList:SelectedWeapon[],phantomList:SelectedPhantom[]):SelectedEffect[] => {
  return selectedEffectList.map((row) => {
    const culculationParameter = {
      slot:row.slot,
      hpRate:parameter.hpRate,
      skillLevel:row.level,
      weaponList:weaponList,
      phantomList:phantomList,
      elementId:row.elementId
    } as CalculateParameter
    const culculation = culculationList.find((line) => line.effectId === row.effect.id && line.powerId === row.powerId)
    if(culculation === undefined){ return row};
    return {
      ...row,
      impactValue:resultExpression(culculation.expressionName,row.level,culculationParameter)
    }
  })
}

// 通常攻撃リストに含めるのか？
const isNormal = (categoryId:number) => {
  return categoryId === 1 || categoryId === 2 ? true : false
}

// バースト攻撃リストに含めるのか？
const isBarst = (categoryId:number) => {
  return categoryId === 1 || categoryId === 3 ? true : false
}

// パラメータから必要値をセットして属性ごとのリストを初期化する
const getInitAttackList = (initAttack:Attack,parameter:Parameter,elementList:Element[],impactList:Impact[]):Attack[] => {
  // 属性分ループ
  return elementList.map((row):Attack => {
    // 各パラメータ値から通常攻撃データを初期化します
    return {
      ...initAttack,
      elementId:row.id,
      elementName:row.name,
      attack:row.id === parameter.elementId? parameter.attack : 0
    } as Attack
  })
}

// 選択武器リストから攻撃力を反映します
const updateAttackListFromWeaponList = (attackList:Attack[],weaponList:SelectedWeapon[],parameter:Parameter):Attack[] => {
  return attackList.map((row) => {
    if(weaponList === undefined){ return row}
    return{
      ...row,
      attack: row.attack + weaponList.filter((line) => {
        if(line.weapon === undefined){ return false}
        return true
      }).reduce((result,line2) => {
        const power = (row.elementId === parameter.elementId && (line2.weapon.typeId === parameter.goodAtWeapon1 || line2.weapon.typeId === parameter.goodAtWeapon2))? 1.2 : 1
        result += line2.weapon.maxAt * power
        return result
      },0)
    }
  })
}

// 幻獣選択リストから攻撃力を反映します
const updateAttackListFromPhantomList = (attackList:Attack[],phantomList:SelectedPhantom[],parameter:Parameter):Attack[] => {
  return attackList.map((row) => {
    if(phantomList === undefined){ return row}
    return{
      ...row,
      attack: row.attack + phantomList.filter((line) => {
        if(line.phantom === undefined){ return false}
        return true
      }).reduce((result,line2) => {
        const power = (row.elementId === parameter.elementId && line2.phantom.elementId === parameter.elementId)? 1.1 : 1
        result += getPhantomAt(line2.phantom,line2.level) * power
        return result
      },0)
    }
  })
}

// 効果値をリストに追加します
const resultAttackFromSelectedWeaponList = (attackList:Attack[],effectList:SelectedEffect[]):Attack[] => {
  return attackList.map((row:Attack) => {
    return effectList.reduce((result,line) => {
      if(result.elementId === line.elementId && line.effect.impactName in result){
        result[line.effect.impactName] = Number(result[line.effect.impactName]) + Number(line.impactValue)
      }
      return result
    },row)
  })
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
  const attackList = getInitAttackList(initAttackNormal,parameter,elementList,impactList)
  const attackListWithWeapon = updateAttackListFromWeaponList(attackList,weaponList,parameter)
  const attackListWithWeaponAndPhantom = updateAttackListFromPhantomList(attackListWithWeapon,phantomList,parameter)
  return resultAttackFromSelectedWeaponList(attackListWithWeaponAndPhantom,effectNormalList)
}

// バースト攻撃リストを返します
export const resultBarstAttackList = (parameter:Parameter, effectList:SelectedEffect[],impactList:Impact[],elementList:Element[],weaponList:SelectedWeapon[],phantomList:SelectedPhantom[]):Attack[] => {
  const effectBarstList = effectList.filter((row) => isBarst(row.effect.categoryId))

  const initBarstNormal = impactList.reduce((result,row) => {
    if(isBarst(row.categoryId)){
      result[row.name] = 0
    }
    return result;
  },{} as Attack )

  // 影響値をセット
  const attackList = getInitAttackList(initBarstNormal,parameter,elementList,impactList)
  const attackListWithWeaponStatus = updateAttackListFromWeaponList(attackList,weaponList,parameter)
  console.log(phantomList)
  return resultAttackFromSelectedWeaponList(attackListWithWeaponStatus,effectBarstList)
}

// 敵防御値から減衰前の数値を算出します
export const getUncontrolledValue = (totalValue:number,parameter:Parameter):number => {
  return totalValue / (parameter.enemyDefence * (1 - (parameter.debufferDefence / 100)))
}

// 減衰後の数値を算出します
export const getRealValueNormal = (uncontrolledValue:number,limitBreakRate:number) => {
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