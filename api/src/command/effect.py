from src.model.effect import Effect
from src.domain.service.effect import EffectService

class EffectCommand:
  def insert(effect_new):
    if(EffectService.check):
      return EffectService.insert(effect_new,Effect.insert)    

    return 'failed'

  def update(effect_new):
    if(EffectService.check):
      return EffectService.update(effect_new,Effect.update)    

    return 'failed'
