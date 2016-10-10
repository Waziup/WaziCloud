from waziup_commons.models.app import App
from waziup_commons.models.observation import Observation
from waziup_commons.models.measure import Measure
from waziup_commons.models.location import Location
from waziup_commons.models.measure_metadata import MeasureMetadata
from subprocess import call
import requests
import json
import controllers.utils
import config as CONFIG

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

    r = requests.get(CONFIG.conf.brokerurl + '/v2/entities')
    resp = []
    for entity in r.json():

        resp.append(controllers.utils.get_observation(entity))

    return str(list(filter(None, resp)))

def data_observations_post(body) -> str:

    print(body)
    try:
        id = body['id']
        type = body['type']
        measure_value = body.get('measure').get('value')

        #first check if the entity exists
        r = requests.get(CONFIG.conf.brokerurl + '/v2/entities/' + id )
        if(r.status_code == requests.codes.ok):

            #update the entity
            r = requests.put(CONFIG.conf.brokerurl + '/v2/entities/' + body.get('id') + '/attrs/measure/', json = {'value': str(measure_value)})
        else:

            #create a new entity
            measure = dict()
            measure['value'] = body.get('measure').get('value')
            measure['type'] = 'Number'
            measure['metadata'] = dict()
            measure['metadata']['dimension'] = dict()
            measure['metadata']['dimension']['value'] = body['measure']['metadata']['dimension']
            measure['metadata']['unit'] = dict()
            measure['metadata']['unit']['value'] = body['measure']['metadata']['unit']
            measure['metadata']['timestamp'] = dict()
            measure['metadata']['timestamp']['value'] = body['measure']['metadata']['timestamp']
            data = dict()
            data['id'] = body['id']
            data['type'] = body['type']
            data['measure'] = measure
            print(data)
            r = requests.post(CONFIG.conf.brokerurl + '/v2/entities', json=data)
            print(r.text)

        return r.text
    except KeyError:
        return 'Invalid body', 400

def data_observations_id_get(id) -> str:

    r = requests.get(CONFIG.conf.brokerurl + '/v2/entities/' + id)
    if(r.status_code == requests.codes.ok):

        try:
            return str(controllers.utils.get_observation(r.json()))

        except KeyError:
            return 'Invalid body', 400

    else:
        return 'Invalid id', 404


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
