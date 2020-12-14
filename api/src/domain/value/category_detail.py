import dataclasses

@dataclasses.dataclass(frozen=True)
class CategoryDetailValue:
  id: int
  name: str
  categoryId:int
  categoryName:str
