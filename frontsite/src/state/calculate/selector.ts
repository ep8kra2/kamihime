import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { useListWithOutPhantom as useElementListWithOutPhantom} from '../element/selector';
import { resultCulculate, setAttackData } from '../../domain/calculate/service';
import { getEffectListFromSkillList } from '../../domain/effect/service';
import { getPhantomMainSkillListFromPhantomList, getPhantomSubSkillListFromPhantomList, getSkillListFromSelectedWeaponList } from '../../domain/skill/service';

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

export const useParameter = () => {
  return useSelector((state:RootState) => state.calcurate.parameter)
}

export const useResultCalculate = () => {
  const listWeapon = useSelector((state:RootState) => state.calcurate.listWeapon)
  const listPhantom = useSelector((state:RootState) => state.calcurate.listPhantom)
  const useSkillEffectList = useSelector((state:RootState) => state.skill.listEffect)
  const useEffectList = useSelector((state:RootState) => state.effect.list)
  const useImpactList = useSelector((state:RootState) => state.impact.list)
  const elementList = useElementListWithOutPhantom();
  const useParameter = useSelector((state:RootState) => state.calcurate.parameter)
  const useSkillList = useSelector((state:RootState) => state.skill.list)

  const skillList = getSkillListFromSelectedWeaponList(listWeapon,useSkillList).concat(getPhantomMainSkillListFromPhantomList(listPhantom,useSkillList)).concat(getPhantomSubSkillListFromPhantomList(listPhantom,useSkillList))
  const effectList = getEffectListFromSkillList(skillList,useSkillEffectList,useEffectList)
  const effectListWithAttack = setAttackData(effectList,useParameter,listWeapon,listPhantom);

  // 計算結果リストを返します
  return resultCulculate(useParameter,effectListWithAttack,useImpactList,elementList,listWeapon,listPhantom)
}
