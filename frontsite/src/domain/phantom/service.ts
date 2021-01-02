import { Phantom } from "../../state/phantom/type";

export const getPhantomHp = (phantom:Phantom,level:number) => {
  if(phantom === undefined){ return 0}
  const maxLevel = phantom.limitBreak === 1 ? 150 : 100
  return phantom.minHp + (phantom.maxHp - phantom.minHp) / (maxLevel - 1) * (level - 1)
}

export const getPhantomAt = (phantom:Phantom,level:number) => {
  if(phantom === undefined){ return 0}
  const maxLevel = phantom.limitBreak === 1 ? 150 : 100
  return phantom.minAt + (phantom.maxAt - phantom.minAt) / (maxLevel -1)  * (level - 1)
}