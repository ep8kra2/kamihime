from src.models.impact import Impact

class ImpactQuery:
  def selected(id):
    return Impact.selected(id)

  def get_list():
    return Impact.get_list()

  