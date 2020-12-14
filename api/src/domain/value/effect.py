import dataclasses

@dataclasses.dataclass(frozen=True)
class EffectValue:
  id: int
  name: str
  categoryId:int
  categoryName:str
  categoryDetailId:int
  categoryDetailName:str
  calcurate:str

@dataclasses.dataclass(frozen=True)
class EffectLevelValue:
  id: int
  effectId: int
  effectName: str
  categoryDetailId: int
  categoryDetailName: str
  powerId: int
  powerName: str
  calcuration: str

@dataclasses.dataclass(frozen=True)
class EffectLevelDetailValue:
  id: int
  effectLevelId: int
  level: int
  value: float

@dataclasses.dataclass(frozen=True)
class EffectPower:
  id: int
  effectId: int
  effectName:str
  elementId:int
  slot:int
  power:float

