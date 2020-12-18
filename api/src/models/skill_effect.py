from src.database import db, ma
from sqlalchemy.sql import text
from src.domain.value.skill import SkillEffectValue

class SkillEffect(db.Model):
  __tablename__ = 'skill_effects'

  id = db.Column(db.Integer, primary_key=True, autoincrement=True)
  skillId = db.Column(db.Integer)
  effectId = db.Column(db.Integer)

  def insert(rowData):
    print(rowData['skillId'])
    record = SkillEffect(
      skillId = rowData['skillId'],
      effectId = rowData['effectId'],
    )

    db.session.add(record)
    db.session.commit()
    print(record.skillId)
    print(record.effectId)
    return 'success'

  def update(rowData):
    record = db.session.query(SkillEffect).filter(SkillEffect.id==rowData['id']).first()
    record.skillId = rowData['skillId']
    record.effectId = rowData['effectId']
    db.session.add(record)
    db.session.commit()
    return 'success'

  def get_list(skillId):
    cmd = """select a.id,
                a.skillId,
                b.name as skillName,
                a.effectId,
                c.name as effectName
              from skill_effects a
              inner join skills b on a.skillId = b.id
              inner join effects c on a.effectId = c.id
              where skillId = :bindSkillId
              order by a.id"""
  
    records = db.session.connection().execute(text(cmd),bindSkillId = skillId)

    return list(map(lambda row: SkillEffectValue(**dict(row)), records))

  def get_list_all():
    cmd = """select a.id,
                a.skillId,
                b.name as skillName,
                a.effectId,
                c.name as effectName
              from skill_effects a
              inner join skills b on a.skillId = b.id
              inner join effects c on a.effectId = c.id
              order by a.id"""
  
    records = db.session.connection().execute(text(cmd))

    return list(map(lambda row: SkillEffectValue(**dict(row)), records))