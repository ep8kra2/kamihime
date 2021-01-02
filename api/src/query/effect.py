from src.model.effect import Effect
from src.model.effect_level import EffectLevel
from src.model.effect_level_detail import EffectLevelDetail

class EffectQuery:
  def get_list():
    return Effect.get_list()

  def get_list_level():
    return EffectLevel.get_list()

  def selected_list_level_detail(id):
    return EffectLevelDetail.selected_list(id)

  def get_list_level_detail():
    return EffectLevelDetail.get_list()