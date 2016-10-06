
from waziup_commons.models.observation import Observation
from waziup_commons.models.measure import Measure
from waziup_commons.models.measure_metadata import MeasureMetadata

def get_observation(entity: dict) -> Observation:
  try:
    measure = entity['measure']
    value            = measure['value']
    measure_metadata = measure['metadata']
    dimension = measure_metadata['dimension']['value']
    unit      = measure_metadata['unit']['value']
    timestamp = measure_metadata['timestamp']['value']

    my_measure = Measure(value = value,
                         metadata = MeasureMetadata(dimension = dimension,
                                                    unit = unit,
                                                    timestamp = timestamp))
    my_obs = Observation(id = entity['id'],
                         type = entity['type'],
                         measure = measure)
    return my_obs
  except KeyError:
    print('I got a KeyError')
    pass

