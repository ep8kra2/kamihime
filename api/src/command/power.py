from src.models.power import Power
from src.domain.service.power import PowerService

class PowerCommand:

  def insert(rowData):
    return PowerService.insert(rowData,Power.insert)    

  def update(rowData):
    return PowerService.update(rowData,Power.update)    
