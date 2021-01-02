from src.database import db, ma
from src.tool.common import to_dict_from_sql_record
from src.domain.value.weapon_type import WeaponTypeValue

class WeaponType(db.Model):
  __tablename__ = 'weapon_types'

  id = db.Column(db.Integer, primary_key=True, autoincrement=True)
  name = db.Column(db.String(100))

  def get_list():
    records =  db.session.query(WeaponType).order_by(WeaponType.id.asc()).all()
    return list(map(lambda record: WeaponTypeValue(**to_dict_from_sql_record(record)) , records))
