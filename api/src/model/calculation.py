from src.database import db, ma
from sqlalchemy.sql import text
from src.tool.common import to_dict_from_sql_record
from src.domain.value.calculation import CalculationValue

class Calculation(db.Model):
  __tablename__ = 'calculations'

  id = db.Column(db.Integer, primary_key=True, autoincrement=True)
  name = db.Column(db.String(100))
  expressionName = db.Column(db.String(100))
  expression = db.Column(db.String(100))
  marks = db.Column(db.String(100)) 

  def get_list():
    lists =  db.session.query(Calculation).order_by(Calculation.id.asc()).all()
    return list(map(lambda row: CalculationValue(**to_dict_from_sql_record(row)), lists))


  def insert(rowData):
    record = Calculation(
      name = rowData['name'],
      expressionName = rowData['expressionName'],
      expression = rowData['expression'],
      marks = rowData['marks'] 
    )

    db.session.add(record)
    db.session.commit()

    return 'success'

  def update(rowData):
    record = db.session.query(Calculation).filter(Calculation.id == rowData['id']).first()
    record.name = rowData['name']
    record.expressionName = rowData['expressionName']
    record.expression = rowData['expression']
    record.marks = rowData['marks'] 

    db.session.add(record)
    db.session.commit()

    return 'success'