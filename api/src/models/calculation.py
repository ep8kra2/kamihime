from src.database import db, ma
from sqlalchemy.sql import text
from src.domain.value.calculation import CalculationValue

class Calculation(db.Model):
  __tablename__ = 'calculations'

  id = db.Column(db.Integer, primary_key=True, autoincrement=True)
  name = db.Column(db.String(100))
  effectId = db.Column(db.Integer)
  powerId = db.Column(db.Integer)
  expressionName = db.Column(db.String(100))
  expression = db.Column(db.String(100))
  marks = db.Column(db.String(100)) 

  def get_list():
    cmd = """select a.id,
                a.name,
                a.effectId,
                b.name as effectName,
                d.id as powerId,
                d.name as powerName,
                a.expressionName,
                a.expression,
                a.marks
              from calculations a
              inner join effects b on a.effectId = b.id
              inner join powers d on a.powerId = d.id
              order by b.id"""
  
    records = db.session.connection().execute(text(cmd))
    return list(map(lambda row: CalculationValue(**dict(row)), records))

  def insert(rowData):
    record = Calculation(
      name = rowData['name'],
      effectId = rowData['effectId'],
      powerId = rowData['powerId'],
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
    record.effectId = rowData['effectId']
    record.powerId = rowData['powerId']
    record.expressionName = rowData['expressionName']
    record.expression = rowData['expression']
    record.marks = rowData['marks'] 

    db.session.add(record)
    db.session.commit()

    return 'success'