import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';

export const useSelected = () => {
  return useSelector((state:RootState) => state.weaponType.selected);
}

export const useList = () => {
  return useSelector((state:RootState) => state.weaponType.list) ;
}
