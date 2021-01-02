from src.model.category import Category

class CategoryQuery:
  def get_list():
    return Category.get_list()