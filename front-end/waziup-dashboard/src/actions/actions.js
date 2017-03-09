import * as types from './actionTypes';
import axios from 'axios'

function requestSensors() {
    return {type: types.REQ_SENSORS}
};

function receiveSensors(json) {
    return{
          type: types.RECV_SENSORS,
          data: json
        }
};

function receiveError(json) {
    return {
          type: types.RECV_ERROR,
          data: json
        }
};

export function fetchSensors() {
// curl http://broker.waziup.io/v2/entities --header 'Fiware-ServicePath:/#' --header 'Fiware-Service:waziup' -X GET
    return function(dispatch) {
          dispatch(requestSensors());
          return axios.get('http://orion.waziup.io/v1/data/entities',{
            
                  method: 'get',
                  headers: {
                    'Fiware-ServicePath':'/#',
                    'Fiware-Service':'waziup',
                  },
                })
            .then(function(response) {
              dispatch(receiveSensors(response.data));
            })
            .catch(function(response){
              dispatch(receiveError(response.data));
            })
        }
};
export function createSensor(sensor) {
    return function(dispatch) {
          dispatch({type: types.REQ_SENSORS});
          return axios.post('http://orion.waziup.io/v1/data/entities',{
                  method: 'post',
                  data:sensor,
                  headers: {
                    'Content-Type': 'application/json',
                    'Fiware-ServicePath':'/C4A',
                    'Fiware-Service':'waziup',
                  },
  
                })
            .then(function(response) {
              dispatch(createSensorSuccess(response.data));
            })
            .catch(function(response){
              dispatch(createSensorError(response.data));
            })
        }

};

export function createSensorSuccess(json) {
    return{
          type: types.RECV_SENSORS,
          data: json
        }
};

export function createSensorError(json) {
    return {
          type: types.RECV_ERROR,
          data: json
        }
};
