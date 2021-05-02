import { Attack } from "../../../state/calculate/type";

// 回復関連？
export const isAscension = (categoryId:number) => {
  return categoryId === 6 ? true : false;
}
 
// 回復性能
export const resultAscension = (rowData:Attack) => {
  return rowData.values.filter((row) => isAscension(row.categoryId) && row.impactTypeId === 1).reduce((result,row) => {
    result = result + Number(row.value) 
    return result
  },100 )
}

// 回復上限
export const resultAscensionLimit = (rowData:Attack) => {
  return rowData.values.filter((row) => isAscension(row.categoryId) && row.impactTypeId === 3).reduce((result,row) => {
    result = result + Number(row.value) 
    console.log(result)
    return result
  },100 )
}