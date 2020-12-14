from src.models.skill import Skill
from src.models.skill_effect import SkillEffect
from src.domain.service.skill import SkillService

class SkillCommand:

  def insert(rowData):
    return SkillService.insert(rowData,Skill.insert)    

  def update(rowData):
    return skillService.update(rowData,Skill.update)    

  def insert_effect(rowData):
    return SkillService.insert_effect(rowData,SkillEffect.insert)

  def update_effect(rowData):
    return SkillService.update_effect(rowData,SkillEffect.update)

    