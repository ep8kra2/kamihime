from src.database import db, ma
from sqlalchemy.sql import text
from src.tool.common import to_dict_from_sql_record
from src.domain.value.effect import EffectPower
from src.domain.value.effect import EffectValue

class Effect(db.Model):
  __tablename__ = 'effects'

  id = db.Column(db.Integer, primary_key=True, autoincrement=True)
  name = db.Column(db.String(100))
  categoryId = db.Column(db.Integer)
  categoryDetailId = db.Column(db.Integer)
  calcurate = db.Column(db.String(100))

  def insert(effect_new):
    effect = Effect(
      name = effect_new['name'],
      categoryId = effect_new['categoryId'],
      categoryDetailId = effect_new['categoryDetailId'],
      calcurate = effect_new['calcurate']
    )

    db.session.add(effect)
    db.session.commit()
    
    return 'success'

  def update(effect_new):
    effect = db.session.query(Effect).filter(Effect.id==effect_new['id']).first()
    effect.name = effect_new['name']
    effect.categoryId = effect_new['categoryId']
    effect.categoryDetailId = effect_new['categoryDetailId']
    effect.calcurate = effect_new['calcurate']
    db.session.add(effect)
    db.session.commit()

    return 'success'

  def get_list():
    cmd = """select a.id,
                a.name,
                a.categoryId,
                b.name as categoryName,
                a.categoryDetailId,
                c.name as categoryDetailName,
                a.calcurate
              from effects a
              inner join categories b on a.categoryId = b.id
              inner join category_details c on a.categoryDetailId = c.id
              order by a.id"""
  
    records = db.session.connection().execute(text(cmd))
    return list(map(lambda row: EffectValue(**dict(row)), records))

  def getEffectPowerList(effectData):

    cmd = """select c.id,
                  b.id as effectId,
                  b.name as effectName,
                  :bindElementId as elementId,
                  b.slot,
                  c.power 
            from  SkillEffects a
            inner join Effects b on a.effectId = b.id
            inner join EffectLevels c on a.effectId = c.effectId 
            where a.skillId = :bindSkillId
            and c.powerLevel = :bindPowerLevel
            and c.level = :bindLevel"""
    connection = db.session.connection()
    effectPowers = connection.execute(text(cmd),
      bindElementId=effectData['elementId'],
      bindSkillId=effectData['id'],
      bindPowerLevel=effectData['powerLevel'],
      bindLevel=effectData['level'])

    effectpowerlist = list(map(lambda row: EffectPower(id=row.id,effectId=row.effectId,effectName=row.effectName,elementId=row.elementId,slot=row.slot,power=row.power), effectPowers))

    return effectpowerlist
