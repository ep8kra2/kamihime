import dataclasses

@dataclasses.dataclass(frozen=True)
class EffectValue:
  id: int
  name: str
  categoryId:int
  categoryName:str
  impactId:int
  impactName:str
  impactTypeId:int
  impactTypeName:str
  calculationId:int
  calculationName:str
  limitValue:int
  expressionName: str
  expression: str
  marks: str

