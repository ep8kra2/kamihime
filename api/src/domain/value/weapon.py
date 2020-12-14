import dataclasses

@dataclasses.dataclass(frozen=True)
class WeaponValue:
  id: int
  name: str
  slot1SkillId: int
  slot1SkillName: str
  slot1PowerId:int
  slot1PowerName:str
  slot2SkillId: int
  slot2SkillName: str
  slot2PowerId: int
  slot2PowerName: str
  elementId:int
  elementName:str
  rarityId:int
  rarityName:str
  typeId:int
  typeName:str
  maxHp:int
  maxAt:int
  weaponIdBeforeLimitBreak:int
