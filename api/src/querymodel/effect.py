from src.database import db
from src.tool.common import to_dict_from_sql_record
from src.domain.value.effect import EffectValue

class Effect(db.Model):
  __tablename__ = 'query_effects'

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(100))
  impactId = db.Column(db.Integer)
  impactName = db.Column(db.String(100))
  impactTypeId = db.Column(db.Integer)
  impactTypeName = db.Column(db.String(100))
  categoryId = db.Column(db.Integer)
  categoryName = db.Column(db.String(100))
  limitValue = db.Column(db.Integer)
  calculationId = db.Column(db.Integer)
  calculationName = db.Column(db.String(100))
  expressionName = db.Column(db.String(100))
  expression = db.Column(db.String(100))
  marks = db.Column(db.String(100))

  def get_list():
    lists =  db.session.query(Effect).order_by(Effect.id.asc()).all()
    return list(map(lambda row: EffectValue(**to_dict_from_sql_record(row)), lists))