from src.database import db, ma

class Slot(db.Model):
  __tablename__ = 'slots'

  id = db.Column(db.Integer, primary_key=True, autoincrement=True)
  name = db.Column(db.String(100))


class SlotSchema(ma.SQLAlchemyAutoSchema):
  class Meta:
    model = Slot

