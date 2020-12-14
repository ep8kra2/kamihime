import dataclasses

@dataclasses.dataclass(frozen=True)
class PowerValue:
  id: int
  name: str


