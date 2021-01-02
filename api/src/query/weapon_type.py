from src.model.weapon_type import WeaponType

class WeaponTypeQuery:
  def get_list():
    return WeaponType.get_list()
