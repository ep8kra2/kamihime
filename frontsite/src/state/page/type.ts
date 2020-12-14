export type Page={
  id:number,
  name:string,
  title:string,
}

export type PageState={
  selected:Page,
  list:Page[],
}