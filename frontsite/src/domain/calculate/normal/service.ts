import { Attack, Parameter } from "../../../state/calculate/type";
import { getUncontrolledValue } from "../service";

// 通常攻撃リストに含めるのか？
export const isNormal = (categoryId:number) => {
  return categoryId === 1 || categoryId === 2 ? true : false;
}

// 減衰後の数値を算出します
export const getRealValue = (uncontrolledValue:number,limitBreakRate:number) => {
  // 第1減衰
  const firstLimit = (350000 * (1 + limitBreakRate ))
  const secondLimit = (450000 * (1 + limitBreakRate ))
  const thirdLimit = (550000 * (1 + limitBreakRate ))
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

// 総合攻撃力
export const resultValue = (rowData:Attack) => {
  return rowData.values.filter((row) => isNormal(row.categoryId) && row.impactTypeId === 1).reduce((result,row) => {
    result = result * (row.name === "攻撃"? Number(row.value) :1 + Number(row.value) / 100)
    return result
  },1 )
}

// 減衰前ダメージ
export const uncontrolledValue = (rowData:Attack,parameter:Parameter):number => {
  return getUncontrolledValue(resultValue(rowData),parameter)
}

// 減衰後ダメージ
export const realValue = (rowData:Attack,parameter:Parameter):number => {
  const limitBreak = rowData.values.filter((row) => isNormal(row.categoryId) && row.impactTypeId === 3).reduce((result,row) => {
    result =  (Number(row.value) / 100)
    return result
  },0 )

  const limitBreakValue = (limitBreak === undefined)? 0 : Number(limitBreak)
  return getRealValue(uncontrolledValue(rowData,parameter),limitBreakValue)
}