from src.model.power import Power

class PowerQuery:
  def get_list():
    return Power.get_list()

  def insert(rowData):
    return Power.insert(rowData)

  def update(rowData):
    return Power.update(rowData)