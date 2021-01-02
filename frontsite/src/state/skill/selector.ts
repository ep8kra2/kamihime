import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';

export const useSelected = () => {
  return useSelector((state:RootState) => state.skill.selected);
}

export const useList = () => {
  return useSelector((state:RootState) => state.skill.list);
}

export const useWeaponList = () => {
  return useSelector((state:RootState) => state.skill.list.filter((row) => row.skillCategoryId === 1));
}

export const usePhantomList = () => {
  return useSelector((state:RootState) => state.skill.list.filter((row) => row.skillCategoryId === 2));
}

export const useSelectedListEffect = () => {
  return useSelector((state:RootState) => state.skill.selectedEffectList)
}

export const useListEffect = () => {
  return useSelector((state:RootState) => state.skill.listEffect)
}