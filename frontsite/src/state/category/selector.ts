import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { Category } from './type';

export const useList = () => {
  return useSelector((state:RootState) => state.category.list) as Category[]
}

export const useSelected = () => {
  return useSelector((state:RootState) => state.category.selected);
}

export const useDetailSelected = () => {
  return useSelector((state:RootState) => state.category.detailSelected);
}

export const useDetailList = () => {
  return useSelector((state:RootState) => state.category.detailList);
}