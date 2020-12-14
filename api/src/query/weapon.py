from src.models.weapon import WeaponList

class WeaponQuery:
  def get_list():
    return WeaponList.get_list()
