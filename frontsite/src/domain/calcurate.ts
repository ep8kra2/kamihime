import {Hiroic,Vigorous,Pride,Rebellion, CalcurateParameter} from './type';

export const hiroic:Hiroic = (at:number,parameter:CalcurateParameter) => {
  return parameter.slot === 1? at:0
}

export const vigorous:Vigorous = (at:number,parameter:CalcurateParameter) => {
  const resultAttack = Math.pow(at , (parameter.hpRate / 100)) - Math.pow(at,0.5) as number
  return resultAttack > 0 ? resultAttack : 0
}

export const pride:Pride = (at:number,parameter:CalcurateParameter) => {
  return at * (1- parameter.hpRate / 100) as number
}

export const rebellion:Rebellion = (at:number,parameter:CalcurateParameter) => {
  return at * (1- parameter.hpRate / 100 ) as number
}



