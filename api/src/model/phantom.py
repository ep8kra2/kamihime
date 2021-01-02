from src.database import db, ma
from sqlalchemy.sql import text
from src.domain.value.phantom import PhantomValue

class Phantom(db.Model):
  __tablename__ = 'phantoms'

  id = db.Column(db.Integer, primary_key=True, autoincrement=True)
  name = db.Column(db.String(100))
  rarityId = db.Column(db.Integer)
  elementId = db.Column(db.Integer)
  minAt = db.Column(db.Integer)
  maxAt = db.Column(db.Integer)
  minHp = db.Column(db.Integer)
  maxHp = db.Column(db.Integer)
  mainSkillId = db.Column(db.Integer)
  subSkillId = db.Column(db.Integer)
  limitBreak = db.Column(db.Integer)

  def insert(rowData):
    record = Phantom(
      name = rowData['name'],
      rarityId = rowData['rarityId'],
      elementId = rowData['elementId'],
      minAt = rowData['minAt'],
      maxAt = rowData['maxAt'],
      minHp = rowData['minHp'],
      maxHp = rowData['maxHp'],
      mainSkillId = rowData['mainSkillId'],
      subSkillId = rowData['subSkillId'] if 'subSkillId' in rowData else 0,
      limitBreak = rowData['limitBreak'] if 'limitBreak' in rowData else 0
    )

    db.session.add(record)
    db.session.commit()

    return 'success'

  def update(rowData):
    record = db.session.query(Phantom).filter(Phantom.id == rowData['id']).first()
    record.name = rowData['name']
    record.rarityId = rowData['rarityId']
    record.elementId = rowData['elementId']
    record.minAt = rowData['minAt']
    record.maxAt = rowData['maxAt']
    record.minHp = rowData['minHp']
    record.maxHp = rowData['maxHp']
    record.mainSkillId = rowData['mainSkillId'],
    record.subSkillId = rowData['subSkillId'],
    record.limitBreak = rowData['limitBreak']

    db.session.add(record)
    db.session.commit()

    return 'success'