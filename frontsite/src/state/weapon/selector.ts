import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';

export const useSelected = () => {
  return useSelector((state:RootState) => state.weapon.selected);
}

export const useList = () => {
  return useSelector((state:RootState) => state.weapon.list) ;
}
