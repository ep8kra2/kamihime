from src.model.weapon import Weapon
from src.domain.service.weapon import WeaponService

class WeaponCommand:

  def insert(rowData):
    return WeaponService.insert(rowData,Weapon.insert)    

  def update(rowData):
    return WeaponService.update(rowData,Weapon.update)    
