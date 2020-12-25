from src.database import db, ma
from sqlalchemy.sql import text
from src.domain.value.impact import ImpactValue

class Impact(db.Model):
  __tablename__ = 'impacts'

  id = db.Column(db.Integer, primary_key=True, autoincrement=True)
  name = db.Column(db.String(100))

  def selected(id):
    records =  db.session.query(Impact).filter(Impact.id == id).order_by(Impact.id.asc()).all()

    return list(map(lambda row: CategoryDetailValue(
      id=row.id,
      name=row.name
    ), records))

  def get_list():
    records =  db.session.query(Impact).order_by(Impact.id.asc()).all()

    return list(map(lambda row: ImpactValue(
      id=row.id,
      name=row.name
    ), records))

  def insert(rowData):
    record = Impact(
      name = rowData['name']
    )

    db.session.add(record)
    db.session.commit()

    return 'success'

  def update(rowData):
    record = db.session.query(Impact).filter(Impact.id == rowData['id']).first()
    record.name = rowData['name']
    db.session.add(record)
    db.session.commit()

    return 'success'