import dataclasses

@dataclasses.dataclass(frozen=True)
class EffectValue:
  id: int
  name: str
  categoryId:int
  categoryName:str
  impactId:int
  impactName:str
  calcurate:str

@dataclasses.dataclass(frozen=True)
class EffectLevelValue:
  id: int
  effectId: int
  effectName: str
  powerId: int
  powerName: str

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

