import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';

export const useList = () => {
  return useSelector((state:RootState) => state.effectLevel.list) 
}

export const useSelected = () => {
  return useSelector((state:RootState) => state.effectLevel.selected);
}

export const useSelectedDetailList = () => {
  return useSelector((state:RootState) => state.effectLevel.selectedDetailList) 
}

export const useDetailList = () => {
  return useSelector((state:RootState) => state.effectLevel.detailList) 
}
