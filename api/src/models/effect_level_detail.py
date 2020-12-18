from src.database import db, ma
from sqlalchemy.sql import text
from src.tool.common import to_dict_from_sql_record
from src.domain.value.effect import EffectLevelDetailValue

class EffectLevelDetail(db.Model):
  __tablename__ = 'effect_level_details'

  id = db.Column(db.Integer, primary_key=True, autoincrement=True)
  effectLevelId = db.Column(db.Integer)
  level = db.Column(db.Integer)
  value = db.Column(db.Float)

  def insert(rowData):
    record = EffectLevelDetail(
      effectLevelId = rowData['effectLevelId'],
      level = rowData['level'],
      value = rowData['value']
    )

    db.session.add(record)
    db.session.commit()
    
    return 'success'

  def update(rowData):
    record = db.session.query(EffectLevelDetail).filter(EffectLevelDetail.id==rowData['id']).first()
    record.effectLevelId = rowData['effectLevelId']
    record.level = rowData['level']
    record.value = rowData['value']
    db.session.add(record)
    db.session.commit()

    return 'success'

  def get_list(id):
    records =  db.session.query(EffectLevelDetail).filter(EffectLevelDetail.effectLevelId == id).order_by(EffectLevelDetail.level.asc()).all()
    return list(map(lambda row: EffectLevelDetailValue(**to_dict_from_sql_record(row)), records))
 
  def get_list():
    records =  db.session.query(EffectLevelDetail).order_by(EffectLevelDetail.level.asc()).all()
    return list(map(lambda row: EffectLevelDetailValue(**to_dict_from_sql_record(row)), records))
 
   