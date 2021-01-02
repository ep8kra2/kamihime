import { CalculateParameter } from "../calculate/type";
import { Expression } from "./type";

const assault = (level:number,coefficient:number,constant:number) => {
  return level * coefficient + constant;
}

const assaultS:Expression = (level:number,parameter:{}):number => {
  return assault(level,0.5,0);
}

const assaultM:Expression = (level:number,parameter:{}):number => {
  return assault(level,0.5,3);
}

const assaultL:Expression = (level:number,parameter:{}):number => {
  return assault(level,0.5,6);
}

const assaultXL:Expression = (level:number,parameter:{}):number => {
  return assault(level,0.7,9);
}

const assaultXXL:Expression = (level:number,parameter:{}):number => {
  return assault(level,1,10);
}

const pride = (level:number,coefficient:number,constant:number,hpRate:number):number => {
  return level * coefficient + constant *  (1- hpRate / 100) 
}

const prideS:Expression = (level:number,parameter:CalculateParameter):number => {
  return pride(level,0.35,12,parameter.hpRate)
}

const prideM:Expression = (level:number,parameter:CalculateParameter):number => {
  return pride(level,0.35,12,parameter.hpRate)
}

const prideL:Expression = (level:number,parameter:CalculateParameter):number => {
  return pride(level,0.35,12,parameter.hpRate)
}

const vigorous = (level:number,coefficient:number,constant:number,hpRate:number) => {
  const resultAttack = Math.pow(level * coefficient + constant , (hpRate / 100)) - Math.pow(level * coefficient + constant,0.5) as number
  return resultAttack > 0 ? resultAttack : 0
}

const vigorousS:Expression = (level:number,parameter:CalculateParameter):number => {
  return vigorous(level,0.2,8,parameter.hpRate)
}

const vigorousM:Expression = (level:number,parameter:CalculateParameter):number => {
  return vigorous(level,0.2,12,parameter.hpRate)
}

const vigorousL:Expression = (level:number,parameter:CalculateParameter):number => {
  return vigorous(level,0.2,16,parameter.hpRate)
}

const rebellion = (level:number,coefficient:number,constant:number,hpRate:number):number => {
  return (level * coefficient + constant) *  (1- hpRate / 100) 
}

const rebellionS:Expression = (level:number,parameter:CalculateParameter):number => {
  return rebellion(level,0.35,12,parameter.hpRate)
}

const rebellionM:Expression = (level:number,parameter:CalculateParameter):number => {
  return rebellion(level,0.35,12,parameter.hpRate)
}

const rebellionL:Expression = (level:number,parameter:CalculateParameter):number => {
  return rebellion(level,0.35,12,parameter.hpRate)
}

const technica = (level:number,coefficient:number,constant:number):number => {
  return (level * coefficient + constant)
}

const technicaS:Expression = (level:number,parameter:CalculateParameter):number => {
  return technica(level,0.4,2)
}

const technicaM:Expression = (level:number,parameter:CalculateParameter):number => {
  return technica(level,0.4,6)
}

const technicaL:Expression = (level:number,parameter:CalculateParameter):number => {
  return technica(level,0.4,10)
}

const technicaLimitUp =(constant:number) => {
  return constant
}

const technicaLimitUpS = (level:number,parameter:CalculateParameter):number => {
  return technicaLimitUp(5)
}

const technicaLimitUpM = (level:number,parameter:CalculateParameter):number => {
  return technicaLimitUp(7.5)
}

const technicaLimitUpL = (level:number,parameter:CalculateParameter):number => {
  return technicaLimitUp(10)
}

const hiroic:Expression = (level:number,parameter:CalculateParameter):number => {
  return parameter.slot === 1? level * 1 + 10 : 0;
}

const phantom140:Expression = (level:number,parameter:CalculateParameter):number => {
  if(parameter.phantomList === undefined) {return 0}
  return level * 5 + 95 + parameter.phantomList.filter((row) => row.slot >= 3 && row.phantom !== undefined).filter((row) => row.phantom.elementId === parameter.elementId).length * 8
}

export const useCalculationList = [
  {key:"assaultS",value:assaultS},
  {key:"assaultM",value:assaultM},
  {key:"assaultL",value:assaultL},
  {key:"assaultXL",value:assaultXL},
  {key:"assaultXXL",value:assaultXXL},
  {key:"prideS",value:prideS},
  {key:"prideM",value:prideM},
  {key:"prideL",value:prideL},
  {key:"vigorousS",value:vigorousS},
  {key:"vigorousM",value:vigorousM},
  {key:"vigorousL",value:vigorousL},
  {key:"rebellionS",value:rebellionS},
  {key:"rebellionM",value:rebellionM},
  {key:"rebellionL",value:rebellionL},
  {key:"technicaS",value:technicaS},
  {key:"technicaM",value:technicaM},
  {key:"technicaL",value:technicaL},
  {key:"technicaLimitUpS",value:technicaLimitUpS},
  {key:"technicaLimitUpM",value:technicaLimitUpM},
  {key:"technicaLimitUpL",value:technicaLimitUpL},
  {key:"hiroic",value:hiroic},
  {key:"phantom140",value:phantom140}
]

export const resultExpression = (expressionName:string,level:number,parameter:CalculateParameter):number => {
   const result = useCalculationList.find((row) => row.key === expressionName)?.value(level,parameter)
    return result? result : 0
}
