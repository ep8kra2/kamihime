import dataclasses

@dataclasses.dataclass(frozen=True)
class CalculationValue:
  id: int
  name: str
  expressionName: str
  expression: str
  marks: str

