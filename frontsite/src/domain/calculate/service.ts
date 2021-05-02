import { Attack, Parameter, SelectedEffect, SelectedPhantom, SelectedWeapon } from '../../state/calculate/type';
import {Element} from '../../state/element/type';
import { resultExpression, resultExpressionMatchElement, resultExpressionSkillEnhance, resultExpressionWeaponEnhance } from '../expression/service';
import { getPhantomAt, getPhantomHp } from '../phantom/service';
import { ReturnWeaponEnhance } from '../expression/type';
import { Weapon } from '../../state/weapon/type';
import { getWeaponAt, getWeaponHp } from '../weapon/service';
import { Impact } from '../../state/impact/type';

// スキル性能用効果？
export const isSkillEnhance = (categoryId:number) => {
  return categoryId === 7 ? true : false;
}

// 武器性能UP効果？
export const isWeaponEnhance = (categoryId:number) => {
  return categoryId === 8 ? true : false;
}

// 各値UP効果？
const isValue = (categoryId:number) => {
  return (!isSkillEnhance(categoryId) && !isWeaponEnhance(categoryId))
}

// 属性ごとの各リストを初期化する
const getInitAttackList = (impactList:Impact[],elementList:Element[]):Attack[] => {
  // 属性分ループ
  const list = elementList.map((row):Attack => {
    // 各パラメータ値から通常攻撃データを初期化します
    const values = impactList.filter((row) => isValue(row.categoryId)).map((row) => {
      return {
        name:row.name,
        categoryId:row.categoryId,
        impactTypeId:row.impactTypeId,
        value:0
      }
    })

    return {
      elementId:row.id,
      elementName:row.name,
      values: values
    } as Attack
  })

  return list
}

const setValuesFromParameter = (list:Attack[],parameter:Parameter):Attack[] => {
  const index = list.findIndex((row) => row.elementId === parameter.elementId.value) as number

  list[index] = {
      ...list[index],
      values:list[index].values.map((row) => {
        const value = Object.entries(parameter).map(([key,value]) => ({key,value})).find((line) => {return row.name === line.value.name})?.value

        return {
          ...row,
          value: row.value + (value? Number(value.value) : 0)
        }
      })
  }

  return list
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

// ウェポンエンハンス効果
const weaponEnhanceValue = (weaponTypeId:number,weaponEnhanceList:SelectedEffect[]):number => {
  const enhance = weaponEnhanceList.find((row) => row.weapon.typeId === weaponTypeId)
  return enhance? (enhance.weaponEnhance as ReturnWeaponEnhance)(weaponTypeId).attackEnhance / 100 + 1 : 1
} 

// 得意武器効果
const gootAtWeaponValue = (parameter:Parameter,weapon:Weapon):number => {
  return (weapon.typeId === parameter.goodAtWeapon1.value || weapon.typeId === parameter.goodAtWeapon2.value)? 1.2 : 1
}

// 選択武器リストから攻撃力を反映します
export const setValuesFromWeapon = (list:Attack[],weaponList:SelectedWeapon[],parameter:Parameter,weaponEnhanceList:SelectedEffect[]):Attack[] => {

  const resultValue = () => {
    return weaponList.reduce((result,row) => {
      if(row.weapon === undefined) { return result};
      result = { 
        at:result.at +  getWeaponAt(row.weapon,row.level) * weaponEnhanceValue(row.weapon.typeId,weaponEnhanceList) * gootAtWeaponValue(parameter,row.weapon),
        hp:result.hp + getWeaponHp(row.weapon,row.level) * weaponEnhanceValue(row.weapon.typeId,weaponEnhanceList) * gootAtWeaponValue(parameter,row.weapon)
      }

       return result
    },{at:0,hp:0})
  }

  const value = resultValue();

  return list.map((row) => {
    return {
      ...row,
      values:row.values.map((line) => {
        return {
          ...line,
          value: line.value + (line.name === "攻撃"? value.at : (line.name === "HP"? value.hp : 0) ) 
      }})
    }
  })
  
}

// 幻獣選択リストから攻撃力・HPを反映します
export const setValuesFromPhantom = (list:Attack[],phantomList:SelectedPhantom[],parameter:Parameter):Attack[] => {
  const resultValue = () => {
    return phantomList.reduce((result,row) => {
      if(row.phantom === undefined) { return result};
      result = { 
        at:result.at + getPhantomAt(row.phantom,row.level) * (parameter.elementId.value === row.phantom.elementId? 1.1 : 1),
        hp:result.hp + getPhantomHp(row.phantom,row.level)  * (parameter.elementId.value === row.phantom.elementId? 1.1 : 1)
      }

       return result
    },{at:0,hp:0})
  }

  const value = resultValue();

  return list.map((row) => {
    return {
      ...row,
      values:row.values.map((line) => {
        return {
          ...line,
          value: line.value + (line.name === "攻撃"? value.at : (line.name === "HP"? value.hp : 0) ) 
      }})
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
  },1)
}

const isMatchElement = (effect:SelectedEffect,elementId:number):boolean => {
  return resultExpressionMatchElement(effect,elementId)
}

// 効果値をリストに追加します
export const result = (attackList:Attack[],effectList:SelectedEffect[],powerList:SelectedEffect[]):Attack[] => {

  effectList.filter((row) => row.impactValue > 0).map((row) => 
    attackList.filter((line) => isMatchElement(row,line.elementId)).map((line) => 
      {
        const indx = line.values.findIndex((value) => value.name === row.effect.impactName);
        line.values[indx].value = line.values[indx].value + row.impactValue * (skillEnhanceValue(powerList,row));
        return line;
      }
    )
  )
  return attackList
}

// パラメータ値をセットします
export const setValue = (attackList:Attack[],elementId:number,effectName:string,value:number):Attack[] => {
  const index = attackList.findIndex((row) => row.elementId === elementId) 
  attackList[index] = {...attackList[index],
    values: attackList[index].values.map((row) => {
      return {
        ...row,
        value: row.value + (row.name === effectName? value : 0)
      }
    } )
  }

  return attackList
}

// 属性ごとの影響値を返します
export const resultCulculate = (parameter:Parameter, effectList:SelectedEffect[],impactList:Impact[],elementList:Element[],weaponList:SelectedWeapon[],phantomList:SelectedPhantom[]):Attack[] => {
  const list = effectList.filter((row) => isValue(row.effect.categoryId))

  // スキルエンハンス効果取得
  const skillEnhanceList = effectList.filter((row) => isSkillEnhance(row.effect.categoryId))
  
  // 武器エンハンス効果取得
  const weaponEnhanceList = effectList.filter((row) => isWeaponEnhance(row.effect.categoryId))

  // 属性別威力テーブルを初期化します
  const initList = getInitAttackList(impactList,elementList);

  // 各パラメータ値から値をセットします
  const listWithParameter = setValuesFromParameter(initList,parameter);

  // 武器の基礎攻撃力、基礎HPをセットします
  const listWithParameterAndWeapon = setValuesFromWeapon(listWithParameter,weaponList,parameter,weaponEnhanceList)

  // 幻獣の基礎攻撃力、基礎HPをセットします
  const listWithParamenterAndWeaponAndPhantom = setValuesFromPhantom(listWithParameterAndWeapon,phantomList,parameter)

  // 計算結果を返します
  return result(listWithParamenterAndWeaponAndPhantom,list,skillEnhanceList)
}


// 敵防御値から減衰前の数値を算出します
export const getUncontrolledValue = (totalValue:number,parameter:Parameter):number => {
  return totalValue / (parameter.enemyDefence.value * (1 - (parameter.debufferDefence.value / 100)))
}