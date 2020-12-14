import dataclasses

@dataclasses.dataclass(frozen=True)
class WeaponTypeValue:
  id: int
  name: str