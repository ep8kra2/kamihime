from src.model.calculation import Calculation
from src.domain.service.calculation import CalculationService

class CalculationCommand:

  def insert(rowData):
    return CalculationService.insert(rowData,Calculation.insert)    

  def update(rowData):
    return CalculationService.update(rowData,Calculation.update)    
