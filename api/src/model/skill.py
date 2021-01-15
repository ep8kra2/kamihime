from src.database import db, ma
from src.domain.value.skill import SkillValue

class Skill(db.Model):
  __tablename__ = 'skills'

  id = db.Column(db.Integer, primary_key=True, autoincrement=True)
  name = db.Column(db.String(100))
  skillCategoryId = db.Column(db.Integer)
  elements = db.Column(db.String(100))

  def insert(rowData):
    record = Skill(
      name = rowData['name'],
      skillCategoryId = rowData['skillCategoryId'],
      elements = rowData['elements']
    )

    db.session.add(record)
    db.session.commit()

    return 'success'

  def update(rowData):
    record = db.session.query(Skill).filter(Skill.id==rowData['id']).first()
    record.name = rowData['name']
    record.skillCategoryId = rowData['skillCategoryId']
    record.elements = rowData['elements']

    db.session.add(record)
    db.session.commit()

    return 'success'
