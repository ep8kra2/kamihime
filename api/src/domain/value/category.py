import dataclasses

@dataclasses.dataclass(frozen=True)
class CategoryValue:
  id: int
  name: str
