import { CalculateParameter } from "../calculate/type";

export type Expression =  (level:number,parameter:CalculateParameter) => number

export type ExpressionPower = (level:number,parameter:CalculateParameter) => (elementId:number,skillCategoryId:number) => number
