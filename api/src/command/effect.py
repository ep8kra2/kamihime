from src.models.effect import Effect
from src.domain.service.effect import EffectService
from src.models.effect_level import EffectLevel
from src.models.effect_level_detail import EffectLevelDetail

class EffectCommand:
  def getEffectPowerList(skillList):
    
    data = list(map(lambda item: Effect.getEffectPowerList(item), skillList))

    result=[]
    for items in data:
      for item in items:
        if(item): 
          result.append(item)

    return result

  def insert(effect_new):
    if(EffectService.check):
      return EffectService.insert(effect_new,Effect.insert)    

    return 'failed'

  def update(effect_new):
    if(EffectService.check):
      return EffectService.update(effect_new,Effect.update)    

    return 'failed'

  def insert_level(rowData):
    return EffectService.insert_level(rowData,EffectLevel.insert)    

  def update_level(rowData):
    return EffectService.update_level(rowData,EffectLevel.update)    

  def insert_level_detail(rowData):
    return EffectService.insert_level_detail(rowData,EffectLevelDetail.insert)    

  def update_level_detail(rowData):
    return EffectService.update_level_detail(rowData,EffectLevelDetail.update)    

