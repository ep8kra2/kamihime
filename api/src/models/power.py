from src.database import db, ma
from src.tool.common import to_dict_from_sql_record
from src.domain.value.power import PowerValue

class Power(db.Model):
  __tablename__ = 'powers'

  id = db.Column(db.Integer, primary_key=True, autoincrement=True)
  name = db.Column(db.String(100))

  def get_list():
    record =  db.session.query(Power).order_by(Power.id.asc()).all()
    return list(map(lambda row: PowerValue(**to_dict_from_sql_record(row)) , record))

  def insert(rowData):
    record = Power(
      name = rowData['name']
    )
    db.session.add(record)
    db.session.commit()
    return 'success'

  def update(rowData):
    record = db.session.query(Power).filter(Power.id==rowData['id']).first()
    record.name = rowData['name']
    db.session.add(record)
    db.session.commit()
    return 'success'