export type Calculation = {
  id: number,
  name:string,
  expressionName: string,
  expression: string,
  marks: string
}

export type CalculationState = {
  selected:Calculation,
  list: Calculation[]
}