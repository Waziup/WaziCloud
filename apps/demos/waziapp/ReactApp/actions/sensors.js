/**
 * Biller Actions
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
'use strict';
import Store from 'rn-json-store';
import AppConfig from '../config'

import {SensorsService} from '../database/services'
//Biller list
export const FETCH_SENSORS = 'FETCH_SENSORS';
export const FETCH_SENSORS_SUCCESS = 'FETCH_SENSORS_SUCCESS';
export const FETCH_SENSORS_FAILURE = 'FETCH_SENSORS_FAILURE';

export function fetchSensor() {
  return dispatch => {
    fetch(AppConfig.baseApi+'sensors/getAll')
          .then(res => res.json())
          .then(
            data => {
              SensorsService.save(Store,data);
              dispatch(fetchSensorsSuccess(data))
            },
            err => dispatch(fetchSensorsFailure(err))
          );
    }
}

export function fetchSensorsSuccess(sensors) {
  return {
    type: FETCH_SENSORS_SUCCESS,
    payload: sensors
  };
}

export function fetchSensorsFailure(error) {
  SensorsService.findAll(Store).then(
    b => {
      if (b.length>0) {
          dispatch(fetchSensorsSuccess(b))
      }else{
        return {
          type: FETCH_SENSORS_FAILURE,
          payload: error
        };
      }
    }
  );
}
