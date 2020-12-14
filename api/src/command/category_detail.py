from src.domain.service.category_detail import CategoryDetailService
from src.models.category_detail import CategoryDetail

class CategoryDetailCommand:
  def insert(category_detail_new):
    if(CategoryDetailService.check):
      return CategoryDetailService.insert(category_detail_new,CategoryDetail.insert)    

    return 'failed'

  def update(category_detail_new):
    if(CategoryDetailService.check):
      return CategoryDetailService.update(category_detail_new,CategoryDetail.update)    

    return 'failed'