import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';

export const useList = () => {
  return useSelector((state:RootState) => state.power.list);
}


