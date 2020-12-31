import { elementList } from "./paramenter"
import { Element } from "./type";

export const useList = ():Element[] => {
  return elementList
}

export const useListWithOutPhantom = ():Element[] => {
  return elementList.filter((row) => row.name !== '幻')
}