from src.database import db, ma
from sqlalchemy.sql import text
from src.domain.value.effect import EffectLevelValue
from src.tool.common import to_dict_from_sql_record

class EffectLevel(db.Model):
  __tablename__ = 'effect_levels'

  id = db.Column(db.Integer, primary_key=True, autoincrement=True)
  effectId = db.Column(db.Integer)
  categoryDetailId = db.Column(db.Integer)
  powerId = db.Column(db.Integer)


  def insert(rowData):
    record = EffectLevel(
      effectId = rowData['effectId'],
      categoryDetailId = rowData['categoryDetailId'],
      powerId = rowData['powerId']
    )

    db.session.add(record)
    db.session.commit()
    
    return 'success'

  def update(rowData):
    record = db.session.query(EffectLevel).filter(EffectLevel.id==rowData['id']).first()
    record.effectId = rowData['effectId']
    record.categoryDetailId = rowData['categoryDetailId']
    record.powerId = rowData['powerId']
    db.session.add(record)
    db.session.commit()

    return 'success'

  def get_list():
    cmd = """select a.id,
                a.effectId,
                b.name as effectName,
                c.id as categoryDetailId,
                c.name as categoryDetailName,
                d.id as powerId,
                d.name as powerName
              from effect_levels a
              inner join effects b on a.effectId = b.id
              inner join category_details c on a.categoryDetailId = c.id
              inner join powers d on a.powerId = d.id
              order by b.id"""
  
    records = db.session.connection().execute(text(cmd))

    return list(map(lambda row: EffectLevelValue(**dict(row)), records))
