import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { Calculation } from './type';

export const useList = ():Calculation[] => {
  return useSelector((state:RootState) => state.calculation.list) as Calculation[]
}

export const useSelected = ():Calculation => {
  return useSelector((state:RootState) => state.calculation.selected);
}
