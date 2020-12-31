export type Calculation = {
  id: number,
  name:string,
  effectId: number,
  effectName: string,
  powerId: number,
  powerName: string,
  expressionName: string,
  expression: string,
  marks: string
}

export type CalculationState = {
  selected:Calculation,
  list: Calculation[]
}