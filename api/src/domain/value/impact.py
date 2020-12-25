import dataclasses

@dataclasses.dataclass(frozen=True)
class ImpactValue:
  id: int
  name: str
