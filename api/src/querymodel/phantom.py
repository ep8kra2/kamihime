from src.database import db
from sqlalchemy.sql import text
from src.tool.common import to_dict_from_sql_record
from src.domain.value.phantom import PhantomValue

class Phantom(db.Model):
  __tablename__ = 'query_phantoms'

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(100))
  rarityId = db.Column(db.Integer)
  rarityName = db.Column(db.String(100))
  elementId = db.Column(db.Integer)
  elementName = db.Column(db.String(100))
  minAt = db.Column(db.Integer)
  maxAt = db.Column(db.Integer)
  minHp = db.Column(db.Integer)
  maxHp = db.Column(db.Integer)
  mainSkillId = db.Column(db.Integer)
  mainSkillName = db.Column(db.String(100))
  subSkillId = db.Column(db.Integer)
  subSkillName = db.Column(db.String(100))
  limitBreak = db.Column(db.Integer)

  def get_list():
    records =  db.session.query(Phantom).order_by(Phantom.id.desc()).all()
    print(records)
    return list(map(lambda row: PhantomValue(**to_dict_from_sql_record(row)) , records))
