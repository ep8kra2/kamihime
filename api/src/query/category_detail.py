from src.models.category_detail import CategoryDetail

class CategoryDetailQuery:
  def selected_detail(category_id):
    return CategoryDetail.selected_detail(category_id)

  def get_list():
    return CategoryDetail.get_list()

  