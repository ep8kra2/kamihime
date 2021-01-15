from src.database import db
from src.tool.common import to_dict_from_sql_record
from src.domain.value.skill import SkillValue

class Skill(db.Model):
  __tablename__ = 'query_skills'

  id = db.Column(db.Integer, primary_key=True, autoincrement=True)
  name = db.Column(db.String(100))
  elements = db.Column(db.String(100))
  skillCategoryId = db.Column(db.Integer)
  skillCategoryName = db.Column(db.String(100))

  def get_list():
    lists =  db.session.query(Skill).order_by(Skill.id.asc()).all()

    return list(map(lambda row: SkillValue(**to_dict_from_sql_record(row)), lists))