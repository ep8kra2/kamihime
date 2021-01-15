import { Attack, Parameter, SelectedEffect, SelectedPhantom, SelectedWeapon } from '../../state/calculate/type';
import {Element} from '../../state/element/type';
import { resultExpression, resultExpressionMatchElement, resultExpressionSkillEnhance, resultExpressionWeaponEnhance } from '../expression/service';
import { getPhantomAt } from '../phantom/service';
import { ReturnWeaponEnhance } from '../expression/type';
import { Weapon } from '../../state/weapon/type';
import { getWeaponAt } from '../weapon/service';

// スキル性能用効果なのか？
export const isSkillEnhance = (categoryId:number) => {
  return categoryId === 7 ? true : false;
}

// 武器性能UP効果？
export const isWeaponEnhance = (categoryId:number) => {
  return categoryId === 8 ? true : false;
}

export const isPhantomElement = (elementId:number) => {
  return elementId === 7 ? true : false;
} 

export const setAttackData = (selectedEffectList:SelectedEffect[],parameter:Parameter, weaponList:SelectedWeapon[],phantomList:SelectedPhantom[]):SelectedEffect[] => {
  return selectedEffectList.map((row) => {
    if(isSkillEnhance(row.effect.categoryId)) {
      const expression = resultExpressionSkillEnhance(row.effect.expressionName,row)
      return {
        ...row,
        skillEnhance: expression 
      }      
    }
    if(isWeaponEnhance(row.effect.categoryId)) {
      return {
        ...row,
        weaponEnhance: resultExpressionWeaponEnhance(row.effect.expressionName,row)
      }
    }

    const expression = resultExpression(row.effect.expressionName,row,selectedEffectList,parameter,weaponList,phantomList)
    return {
      ...row,
      impactValue: expression 
    }
  })
}

// パラメータから必要値をセットして属性ごとのリストを初期化する
export const getInitAttackList = (initAttack:Attack,parameter:Parameter,elementList:Element[]):Attack[] => {
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
export const updateAttackListFromWeaponList = (attackList:Attack[],weaponList:SelectedWeapon[],parameter:Parameter,weaponEnhanceList:SelectedEffect[]):Attack[] => {
  return attackList.map((row) => {
    if(weaponList === undefined){ return row}
    return{
      ...row,
      attack: row.attack + weaponList.filter((line) => {
        if(line.weapon === undefined){ return false}
        return true
      }).reduce((result,line2) => {
        result += getWeaponAt(line2.weapon,line2.level) * weaponEnhanceValue(line2.weapon.typeId,weaponEnhanceList) * gootAtWeaponValue(parameter,line2.weapon)
        return result
      },0)
    }
  })
}

// 幻獣選択リストから攻撃力を反映します
export const updateAttackListFromPhantomList = (attackList:Attack[],phantomList:SelectedPhantom[],parameter:Parameter):Attack[] => {
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


const isMatchElement = (effect:SelectedEffect,elementId:number):boolean => {
  return resultExpressionMatchElement(effect,elementId)
}

// 効果値をリストに追加します
export const resultAttackFromSelectedWeaponList = (attackList:Attack[],effectList:SelectedEffect[],powerList:SelectedEffect[]):Attack[] => {
  return attackList.map((row:Attack) => {
    return effectList.reduce((result,line) => {
      if(isMatchElement(line,result.elementId) && line.effect.impactName in result){
        const value = Number(result[line.effect.impactName]) + (Number(line.impactValue) * (1 + skillEnhanceValue(powerList,line) / 100))
        result[line.effect.impactName] = (line.effect.limitValue < value)? line.effect.limitValue : value
      }
      return result
    },row)
  })
}

// 敵防御値から減衰前の数値を算出します
export const getUncontrolledValue = (totalValue:number,parameter:Parameter):number => {
  return totalValue / (parameter.enemyDefence * (1 - (parameter.debufferDefence / 100)))
}