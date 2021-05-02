import { Attack, Parameter } from "../../../state/calculate/type";
import { getUncontrolledValue } from "../service";

// バースト攻撃リストに含めるのか？
export const isBarst = (categoryId:number) => {
  return categoryId === 1 || categoryId === 3 ? true : false;
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

// 総合攻撃力
export const resultValue = (rowData:Attack) => {
  return rowData.values.filter((row) => isBarst(row.categoryId) && row.impactTypeId === 1).reduce((result,row) => {
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
  const limitBreak = rowData.values.filter((row) => isBarst(row.categoryId) && row.impactTypeId === 3).reduce((result,row) => {
    result =  (Number(row.value) / 100)
    return result
  },0 )

  const limitBreakValue = (limitBreak === undefined)? 0 : Number(limitBreak)
  return getRealValue(uncontrolledValue(rowData,parameter),limitBreakValue)
}