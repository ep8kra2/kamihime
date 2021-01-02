from src.querymodel.skill import Skill
from src.model.skill_effect import SkillEffect

class SkillQuery:
  def get_list():
    return Skill.get_list()

  def get_list_effect_all():
    return SkillEffect.get_list_all()

  def get_list_effect(id):
    return SkillEffect.get_list(id)