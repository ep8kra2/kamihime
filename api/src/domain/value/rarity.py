import dataclasses

@dataclasses.dataclass(frozen=True)
class RarityValue:
  id: int
  name: str
