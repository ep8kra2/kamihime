from src.models.effect import Effect
from src.models.effect_level import EffectLevel
from src.models.effect_level_detail import EffectLevelDetail

class EffectQuery:
  def get_list():
    return Effect.get_list()

  def get_list_level():
    return EffectLevel.get_list()

  def get_list_level_detail(id):
    return EffectLevelDetail.get_list(id)