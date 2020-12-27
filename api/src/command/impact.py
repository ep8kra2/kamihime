from src.domain.service.impact import ImpactService
from src.models.impact import Impact

class ImpactCommand:
  def insert(rowData):
    if(ImpactService.check):
      return ImpactService.insert(rowData,Impact.insert)    

    return 'failed'

  def update(rowData):
    if(ImpactService.check):
      return ImpactService.update(rowData,Impact.update)    

    return 'failed'