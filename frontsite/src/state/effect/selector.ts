import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { Effect } from './type';

export const useList = () => {
  return useSelector((state:RootState) => state.effect.list) as Effect[]
}

export const useSelected = () => {
  return useSelector((state:RootState) => state.effect.selected);
}
