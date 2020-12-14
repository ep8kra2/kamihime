from src.database import db, ma
from src.domain.value.skill import SkillValue

class Skill(db.Model):
  __tablename__ = 'skills'

  id = db.Column(db.Integer, primary_key=True, autoincrement=True)
  name = db.Column(db.String(100))

  def get_list():
    lists =  db.session.query(Skill).order_by(Skill.id.asc()).all()

    return list(map(lambda row: SkillValue(id=row.id,name=row.name), lists))

  def insert(rowData):
    record = Skill(
      name = rowData['name']
    )

    db.session.add(record)
    db.session.commit()

    return 'success'

  def update(rowData):
    record = db.session.query(Skill).filter(Skill.id==rowData['id']).first()
    record.name = rowData['name']

    db.session.add(record)
    db.session.commit()

    return 'success'
