import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';

export const useSelectedPage = () => {
  return useSelector((state:RootState) => state.page.selected);
}
