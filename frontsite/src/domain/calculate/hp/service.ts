import { Attack } from "../../../state/calculate/type";

// Hpリストに含めるのか？
export const isHp = (categoryId:number) => {
  return categoryId === 5 ? true : false;
}

// 総合HP
export const resultValue = (rowData:Attack) => {
  return rowData.values.filter((row) => isHp(row.categoryId) && row.impactTypeId === 1).reduce((result,row) => {
    result = result * (row.name === "HP"? Number(row.value) :1 + Number(row.value) / 100)
    return result
  },1 )
}