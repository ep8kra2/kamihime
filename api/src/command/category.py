from src.domain.service.category import CategoryService
from src.models.category import Category


class CategoryCommand:
  def insert(category_new):
    if(CategoryService.check):
      return CategoryService.insert(category_new,Category.insert)    

    return 'failed'

  def update(category_new):
    if(CategoryService.check):
      return CategoryService.update(category_new,Category.update)    

    return 'failed'