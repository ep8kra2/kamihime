import dataclasses

@dataclasses.dataclass(frozen=True)
class PhantomValue:
  id: int
  name: str
  rarityId: int
  rarityName: str
  elementId: int
  elementName: str
  mainSkillId: int
  mainSkillName: str
  subSkillId: int
  subSkillName: str
  minAt: int
  maxAt: int
  minHp: int
  maxHp: int
  limitBreak: int
