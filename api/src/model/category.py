from src.database import db, ma
from sqlalchemy.sql import text
from src.tool.common import to_dict_from_sql_record
from ..domain.value.category import CategoryValue

class Category(db.Model):
  __tablename__ = 'categories'

  id = db.Column(db.Integer, primary_key=True, autoincrement=True)
  name = db.Column(db.String(100))

  def get_list():
    lists =  db.session.query(Category).order_by(Category.id.asc()).all()
    return list(map(lambda row: CategoryValue(**to_dict_from_sql_record(row)), lists))

  def insert(category_new):
    category = Category(
      name = category_new['name']
    )

    db.session.add(category)
    db.session.commit()

    return 'success'

  def update(category_new):
    category = db.session.query(Category).filter(Category.id==category_new['id']).first()
    category.name = category_new['name']

    db.session.add(category)
    db.session.commit()

    return 'success'