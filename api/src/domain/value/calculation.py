import dataclasses

@dataclasses.dataclass(frozen=True)
class CalculationValue:
  id: int
  name: str
  effectId: int
  effectName: str
  powerId: int
  powerName: str
  expressionName: str
  expression: str
  marks: str

