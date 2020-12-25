import {Hiroic,Vigorous,Pride,Rebellion, CalcurateParameter} from './type';

export const hiroic:Hiroic = (at:number,parameter:CalcurateParameter) => {
  return parameter.slot === 1? at:0
}

export const vigorous:Vigorous = (at:number,parameter:CalcurateParameter) => {
  return at * (parameter.hpRate * 0.5) * 2 as number
}

export const pride:Pride = (at:number,parameter:CalcurateParameter) => {
  return at * (1- parameter.hpRate) as number
}

export const rebellion:Rebellion = (at:number,parameter:CalcurateParameter) => {
  return at * (1- parameter.hpRate) as number
}



