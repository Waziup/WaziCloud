from waziup_commons.models.app import App
from waziup_commons.models.observation import Observation
from waziup_commons.models.measure import Measure
from waziup_commons.models.location import Location
from waziup_commons.models.measure_metadata import MeasureMetadata
from subprocess import call
import requests
import json

def gateways_get() -> str:
    return 'do some magic!'

def gateways_post(body) -> str:
    return 'do some magic!'

def gateways_id_get(id) -> str:
    return 'do some magic!'

def gateways_id_put(body, id) -> str:
    return 'do some magic!'

def gateways_id_delete(id) -> str:
    return 'do some magic!'

def gateways_id_devices_get(id) -> str:
    return 'do some magic!'


def data_observations_get() -> str:
    r = requests.get('http://localhost:1026/v2/entities')
    j = json.loads(r.text)
    print(json.dumps(j))
    print(r)
    measure = Measure(value = '20',
                      metadata = MeasureMetadata(unit = 'Degree', timestamp = '2016-06-08T18:20:27.873Z'))
    location = Location(type = "Point", 
                        coordinates = [[14.52839, 35.89389]])
    resp = Observation(id = 'id',
                       type = 'SensingDevice',
                       measure = measure,
                       location = location,
                       platform = 'UGB field')
    return [resp.to_dict()]

def data_observations_post(body) -> str:
    r = requests.post('http://localhost:1026/v2/entities')
    print(r)
    return r.text

def data_observations_id_get(id) -> str:
    return 'do some magic!'

def data_subscriptions_get() -> str:
    return 'do some magic!'

def data_subscriptions_post(body) -> str:
    return 'do some magic!'

def data_subscriptions_id_get(id) -> str:
    return 'do some magic!'

def data_subscriptions_id_delete(id) -> str:
    return 'do some magic!'

def apps_get() -> str:
    return [App('01/09/2016','cdupont','N/A','test','test','test').to_dict()]

def apps_post(body) -> str:
    return 'do some magic!'

def apps_id_get(id) -> str:
    return 'do some magic!'

def apps_id_put(body, id) -> str:
    return 'do some magic!'

def apps_id_post(body, id) -> str:
    return 'do some magic!'

def apps_id_delete(id) -> str:
    return 'do some magic!'

def apps_id_containers_get(id) -> str:
    return 'do some magic!'
