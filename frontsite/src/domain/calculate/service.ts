import { Attack, Parameter, SelectedEffect, SelectedPhantom, SelectedWeapon } from '../../state/calculate/type';
import { Calculation } from '../../state/calculation/type';
import {Element} from '../../state/element/type';
import { Impact } from '../../state/impact/type';
import { resultExpression, resultExpressionSkillEnhance, resultExpressionWeaponEnhance } from '../expression/service';
import { getPhantomAt } from '../phantom/service';
import { ReturnWeaponEnhance } from '../expression/type';
import { Weapon } from '../../state/weapon/type';


// 通常攻撃リストに含めるのか？
const isNormal = (categoryId:number) => {
  return categoryId === 1 || categoryId === 2 ? true : false;
}

// バースト攻撃リストに含めるのか？
const isBarst = (categoryId:number) => {
  return categoryId === 1 || categoryId === 3 ? true : false;
}

// スキル性能用効果なのか？
const isSkillEnhance = (categoryId:number) => {
  return categoryId === 7 ? true : false;
}

// 武器性能UP効果？
const isWeaponEnhance = (categoryId:number) => {
  return categoryId === 8 ? true : false;
}

const isPhantomElement = (elementId:number) => {
  return elementId === 7 ? true : false;
} 

export const setAttackData = (selectedEffectList:SelectedEffect[],culculationList:Calculation[],parameter:Parameter, weaponList:SelectedWeapon[],phantomList:SelectedPhantom[]):SelectedEffect[] => {
  return selectedEffectList.map((row) => {
    const culculation = culculationList.find((line) => line.effectId === row.effect.id && line.powerId === row.powerId)
    if(culculation === undefined){ return row};
    if(isSkillEnhance(row.effect.categoryId)) {
      const expression = resultExpressionSkillEnhance(culculation.expressionName,row)
      return {
        ...row,
        skillEnhance: expression 
      }      
    }

    if(isWeaponEnhance(row.effect.categoryId)) {
      return {
        ...row,
        weaponEnhance: resultExpressionWeaponEnhance(culculation.expressionName,row)
      }
    }

    const expression = resultExpression(culculation.expressionName,row,selectedEffectList,parameter,weaponList,phantomList)
    return {
      ...row,
      impactValue: expression 
    }
  })
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

// ウェポンエンハンス効果
const weaponEnhanceValue = (weaponTypeId:number,weaponEnhanceList:SelectedEffect[]):number => {
  const enhance = weaponEnhanceList.find((row) => row.weapon.typeId === weaponTypeId)
  return enhance? (enhance.weaponEnhance as ReturnWeaponEnhance)(weaponTypeId).attackEnhance / 100 + 1 : 1
} 

// 得意武器効果
const gootAtWeaponValue = (parameter:Parameter,weapon:Weapon):number => {
  return (weapon.typeId === parameter.goodAtWeapon1 || weapon.typeId === parameter.goodAtWeapon2)? 1.2 : 1
}

// 選択武器リストから攻撃力を反映します
const updateAttackListFromWeaponList = (attackList:Attack[],weaponList:SelectedWeapon[],parameter:Parameter,weaponEnhanceList:SelectedEffect[]):Attack[] => {
  return attackList.map((row) => {
    if(weaponList === undefined){ return row}
    return{
      ...row,
      attack: row.attack + weaponList.filter((line) => {
        if(line.weapon === undefined){ return false}
        return true
      }).reduce((result,line2) => {
        result += line2.weapon.maxAt * weaponEnhanceValue(line2.weapon.typeId,weaponEnhanceList) * gootAtWeaponValue(parameter,line2.weapon)
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

// 効果値の倍率を算出
const skillEnhanceValue = (powerList:SelectedEffect[],selectedEffect:SelectedEffect) => {
  return powerList.reduce((result,row) => {
    if(row.skillEnhance !== undefined){
      result += row.skillEnhance(selectedEffect)
    }
    return result
  },0)
}

const limitValue = (impactList:Impact[],impactId:number) => {
  const value = impactList.find((row) => row.id === impactId)?.limitValue 
  return value? value : 9999
}

// 効果値をリストに追加します
const resultAttackFromSelectedWeaponList = (attackList:Attack[],effectList:SelectedEffect[],powerList:SelectedEffect[],impactList:Impact[]):Attack[] => {
  return attackList.map((row:Attack) => {
    return effectList.reduce((result,line) => {
      if((result.elementId === line.elementId || isPhantomElement(line.elementId)) && line.effect.impactName in result){
        const value = Number(result[line.effect.impactName]) + (Number(line.impactValue) * (1 + skillEnhanceValue(powerList,line) / 100))
        result[line.effect.impactName] = (limitValue(impactList,line.effect.impactId) < value)? limitValue(impactList,line.effect.impactId) : value
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
  const skillEnhanceList = effectList.filter((row) => isSkillEnhance(row.effect.categoryId))
  const weaponEnhanceList = effectList.filter((row) => isWeaponEnhance(row.effect.categoryId))
  const attackList = getInitAttackList(initAttackNormal,parameter,elementList,impactList)
  const attackListWithWeapon = updateAttackListFromWeaponList(attackList,weaponList,parameter,weaponEnhanceList)
  const attackListWithWeaponAndPhantom = updateAttackListFromPhantomList(attackListWithWeapon,phantomList,parameter)
  return resultAttackFromSelectedWeaponList(attackListWithWeaponAndPhantom,effectNormalList,skillEnhanceList,impactList)
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
  const attackList = getInitAttackList(initAttackBarst,parameter,elementList,impactList)
  const attackListWithWeapon = updateAttackListFromWeaponList(attackList,weaponList,parameter,weaponEnhanceList)
  const attackListWithWeaponAndPhantom = updateAttackListFromPhantomList(attackListWithWeapon,phantomList,parameter)
  return resultAttackFromSelectedWeaponList(attackListWithWeaponAndPhantom,effectBarstList,skillEnhanceList,impactList)
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