import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';

export const useListWeapon = () => {
  return useSelector((state:RootState) => state.calcurate.listWeapon) 
}

export const useListPhantom = () => {
  return useSelector((state:RootState) => state.calcurate.listPhantom) 
}

export const useSelectedWeapon = () => {
  return useSelector((state:RootState) => state.calcurate.selectedWeapon) 
}

export const useSelectedPhantom = () => {
  return  useSelector((state:RootState) => state.calcurate.selectedPhantom) 
}

export const useAttackNormal = () => {
  return  useSelector((state:RootState) => state.calcurate.attackNormal) 
}