import {Hiroic,Vigorous,Pride,Rebellion} from './type';

export const hiroic:Hiroic = (at:number,slot:number) => {
  return slot === 1? at:0
}

export const vigorous:Vigorous = (at:number,hp_rate:number) => {
  return at * (hp_rate * 0.5) * 2 as number
}

export const pride:Pride = (at:number,hp_rate:number) => {
  return at * (1- hp_rate) as number
}

export const rebellion:Rebellion = (at:number,hp_rate:number) => {
  return at * (1- hp_rate) as number
}



