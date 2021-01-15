from src.database import db
from src.domain.value.weapon import WeaponValue
from src.tool.common import to_dict_from_sql_record

class Weapon(db.Model):
  __tablename__ = 'weapons'

  id = db.Column(db.Integer,primary_key=True,autoincrement=True)
  name = db.Column(db.String(254))
  slot1SkillId = db.Column(db.Integer)
  slot1PowerId = db.Column(db.Integer)
  slot2SkillId = db.Column(db.Integer)
  slot2PowerId = db.Column(db.Integer)
  elementId = db.Column(db.Integer)
  rarityId = db.Column(db.Integer)
  typeId = db.Column(db.Integer)
  minHp = db.Column(db.Integer)
  maxHp = db.Column(db.Integer)
  minAt = db.Column(db.Integer)
  maxAt = db.Column(db.Integer)
  weaponIdBeforeLimitBreak = db.Column(db.Integer)

  def insert(rowData):
    record = Weapon(
      name = rowData['name'],
      slot1SkillId = rowData['slot1SkillId'] if 'slot1SkillId' in rowData else 0,
      slot1PowerId = rowData['slot1PowerId'] if 'slot1PowerId' in rowData else 0,
      slot2SkillId = rowData['slot2SkillId'] if 'slot2SkillId' in rowData else 0,
      slot2PowerId =  rowData['slot2PowerId'] if 'slot2PowerId' in rowData else 0,
      elementId =  rowData['elementId'],
      rarityId =  rowData['rarityId'],
      typeId =  rowData['typeId'],
      minHp =  rowData['minHp'],
      maxHp =  rowData['maxHp'],
      minAt =  rowData['minAt'],
      maxAt =  rowData['maxAt'],
      weaponIdBeforeLimitBreak =  rowData['weaponIdBeforeLimitBreak'] if 'weaponIdBeforeLimitBreak' in rowData else 0
    )
    db.session.add(record)
    db.session.commit()
    return 'success'

  def update(rowData):
    record = db.session.query(Weapon).filter(Weapon.id==rowData['id']).first()
    record.name = rowData['name']
    record.slot1SkillId = rowData['slot1SkillId'] if 'slot1SkillId' in rowData else 0,
    record.slot1PowerId = rowData['slot1PowerId'] if 'slot1PowerId' in rowData else 0,
    record.slot2SkillId = rowData['slot2SkillId'] if 'slot2SkillId' in rowData else 0
    record.slot2PowerId =  rowData['slot2PowerId'] if 'slot2PowerId' in rowData else 0
    record.elementId =  rowData['elementId']
    record.rarityId =  rowData['rarityId']
    record.typeId =  rowData['typeId']
    record.minHp =  rowData['minHp']
    record.maxHp =  rowData['maxHp']
    record.minAt =  rowData['minAt']
    record.maxAt =  rowData['maxAt']
    record.weaponIdBeforeLimitBreak = rowData['weaponIdBeforeLimitBreak']
    db.session.add(record)
    db.session.commit()

    return 'success'





