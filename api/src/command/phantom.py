from src.domain.service.phantom import PhantomService
from src.model.phantom import Phantom

class PhantomCommand:
  def insert(rowData):
    if(PhantomService.check):
      return PhantomService.insert(rowData,Phantom.insert)    

    return 'failed'

  def update(rowData):
    if(PhantomService.check):
      return PhantomService.update(rowData,Phantom.update)    

    return 'failed'