import { SelectedEffect } from "../../../state/calculate/type"
import { ExpressionMatchElement } from "../type"

export const matchElementEqual:ExpressionMatchElement= (effect:SelectedEffect,targetOfElementId:number) => {
    return targetOfElementId === effect.elementId || effect.elementId === 7 ? true : false;
}

export const matchElementAll:ExpressionMatchElement= (effect:SelectedEffect,targetOfElementId:number) => {
  return true
}

export const matchFireAndWater:ExpressionMatchElement = (effect:SelectedEffect,targetOfElementId:number) => {
  return targetOfElementId === 1 || targetOfElementId === 2 ? true : false;
}

export const matchFireAndDark:ExpressionMatchElement = (effect:SelectedEffect,targetOfElementId:number) => {
  return targetOfElementId === 1 || targetOfElementId === 6 ? true : false;
}

export const matchThunderAndLight:ExpressionMatchElement = (effect:SelectedEffect,targetOfElementId:number) => {
  return targetOfElementId === 4 || targetOfElementId === 5 ? true : false;
}

export const matchThunderAndDark:ExpressionMatchElement = (effect:SelectedEffect,targetOfElementId:number) => {
  return targetOfElementId === 4 || targetOfElementId === 6 ? true : false;
}

export const matchWaterAndWindAndLight:ExpressionMatchElement = (effect:SelectedEffect,targetOfElementId:number) => {
  return targetOfElementId === 2 || targetOfElementId === 3 || targetOfElementId === 5 ? true : false;
}

export const matchWindAndThunderAndDark:ExpressionMatchElement= (effect:SelectedEffect,targetOfElementId:number) => {
  return targetOfElementId === 3 || targetOfElementId === 4 || targetOfElementId === 6 ? true : false;
}
