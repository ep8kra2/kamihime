from src.database import db, ma
from src.tool.common import to_dict_from_sql_record
from src.domain.value.rarity import RarityValue

class Rarity(db.Model):
  __tablename__ = 'rarities'

  id = db.Column(db.Integer, primary_key=True, autoincrement=True)
  name = db.Column(db.String(100))

  def get_list():
    records =  db.session.query(Rarity).order_by(Rarity.id.asc()).all()
    return list(map(lambda row: RarityValue(**to_dict_from_sql_record(row)) , records))
