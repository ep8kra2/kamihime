export type Category = {
  id:number,
  name:string
}

export type CategoryDetail = {
  id:number,
  name:string,
  categoryId:number,
  categoryName:string
}

export type CategoryState = {
  selected:Category,
  list:Category[],
  detailSelected:CategoryDetail,
  detailList:CategoryDetail[]
}