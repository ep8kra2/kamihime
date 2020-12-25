export type Category = {
  id:number,
  name:string
}

export type CategoryState = {
  selected:Category,
  list:Category[]
}