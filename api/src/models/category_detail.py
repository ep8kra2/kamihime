from src.database import db, ma
from sqlalchemy.sql import text
from src.domain.value.category_detail import CategoryDetailValue

class CategoryDetail(db.Model):
  __tablename__ = 'category_details'

  id = db.Column(db.Integer, primary_key=True, autoincrement=True)
  name = db.Column(db.String(100))
  categoryId = db.Column(db.Integer)
  categoryName = db.Column(db.String(100))

  def selected_detail(category_id):
    lists =  db.session.query(CategoryDetail).filter(CategoryDetail.categoryId == category_id).order_by(CategoryDetail.id.asc()).all()

    return list(map(lambda row: CategoryDetailValue(
      id=row.id,
      name=row.name,
      categoryId=row.categoryId,
      categoryName=row.categoryName
    ), lists))

  def get_list():
    lists =  db.session.query(CategoryDetail).order_by(CategoryDetail.id.asc()).all()

    return list(map(lambda row: CategoryDetailValue(
      id=row.id,
      name=row.name,
      categoryId=row.categoryId,
      categoryName=row.categoryName
    ), lists))

  def insert(rowData):
    record = CategoryDetail(
      name = rowData['name'],
      categoryId = rowData['categoryId'],
      categoryName = rowData['categoryName']
    )

    db.session.add(record)
    db.session.commit()

    return 'success'

  def update(rowData):
    record = db.session.query(CategoryDetail).filter(CategoryDetail.id == rowData['id']).first()
    record.name = rowData['name']
    record.categoryId = rowData['categoryId']
    record.categoryName = rowData['categoryName']

    db.session.add(record)
    db.session.commit()

    return 'success'