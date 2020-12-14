import dataclasses

@dataclasses.dataclass(frozen=True)
class SkillValue:
  id: int
  name: str

@dataclasses.dataclass(frozen=True)
class SkillEffectValue:
  id: int
  skillId: int
  skillName: str
  effectId: int
  effectName: str
