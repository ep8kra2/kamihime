from src.model.calculation import Calculation

class CalculationQuery:
  def get_list():
    return Calculation.get_list()