from src.database import db, ma
from sqlalchemy.sql import text

class Effect(db.Model):
  __tablename__ = 'effects'

  id = db.Column(db.Integer, primary_key=True, autoincrement=True)
  name = db.Column(db.String(100))
  impactId = db.Column(db.Integer)
  calculationId = db.Column(db.Integer)

  def insert(effect_new):
    effect = Effect(
      name = effect_new['name'],
      impactId = effect_new['impactId'],
      calculationId = effect_new['calculationId'],
    )

    db.session.add(effect)
    db.session.commit()
    
    return 'success'

  def update(effect_new):
    effect = db.session.query(Effect).filter(Effect.id==effect_new['id']).first()
    effect.name = effect_new['name']
    effect.impactId = effect_new['impactId']
    effect.calculationId = effect_new['calculationId']
    db.session.add(effect)
    db.session.commit()

    return 'success'

