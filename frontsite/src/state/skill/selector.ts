import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';

export const useSelected = () => {
  return useSelector((state:RootState) => state.skill.selected);
}

export const useList = () => {
  return useSelector((state:RootState) => state.skill.list);
}

export const useSelectedListEffect = () => {
  return useSelector((state:RootState) => state.skill.selectedEffectList)
}
