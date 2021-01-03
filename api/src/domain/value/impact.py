import dataclasses

@dataclasses.dataclass(frozen=True)
class ImpactValue:
  id: int
  name: str
  categoryId: int
  categoryName: str
  impactTypeId: int
  impactTypeName: str
  limitValue: int
