from src.database import db
from src.domain.value.weapon import WeaponValue
from src.tool.common import to_dict_from_sql_record

class Weapon(db.Model):
  __tablename__ = 'query_weapons'

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(100))
  slot1SkillId = db.Column(db.Integer)
  slot1SkillName = db.Column(db.String(100))
  slot1PowerId = db.Column(db.Integer)
  slot1PowerName = db.Column(db.String(100))
  slot2SkillId = db.Column(db.Integer)
  slot2SkillName = db.Column(db.String(100))
  slot2PowerId = db.Column(db.Integer)
  slot2PowerName = db.Column(db.String(100))
  elementId = db.Column(db.Integer)
  elementName = db.Column(db.String(100))
  rarityId = db.Column(db.Integer)
  rarityName = db.Column(db.String(100))
  typeId = db.Column(db.Integer)
  typeName = db.Column(db.String(100))
  maxHp = db.Column(db.Integer)
  maxAt = db.Column(db.Integer)
  weaponIdBeforeLimitBreak = db.Column(db.Integer)

  def get_list():
    records =  db.session.query(Weapon).order_by(Weapon.id.desc()).all()
    print(records)
    return list(map(lambda row: WeaponValue(**to_dict_from_sql_record(row)) , records))



