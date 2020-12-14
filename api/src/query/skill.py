from src.models.skill import Skill
from src.models.skill_effect import SkillEffect

class SkillQuery:
  def get_list():
    return Skill.get_list()

  def get_list_effect(id):
    return SkillEffect.get_list(id)