from src.models.category import Category

class CategoryQuery:
  def get_list():
    return Category.get_list()