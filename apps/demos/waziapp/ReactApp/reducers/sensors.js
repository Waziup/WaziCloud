/**
 * Biller Reducer
 *
 */
'use strict';
import {
	 FETCH_SENSORS, FETCH_SENSORS_SUCCESS, FETCH_SENSORS_FAILURE,
 } from '../actions/sensors';

// Set initial state
const initialState = {
    sensorsList: {
      sensors: [],
      error:null,
      loading: false
    },
  };
export default function sensorsReducer(state = initialState, action) {
  let error;
  switch (action.type) {
    case FETCH_SENSORS:// start fetching posts and set loading = true
  	 return {
         ...state,
         sensorsList: {
           sensors:[],
           error: null,
           loading: true
         }
       };
    case FETCH_SENSORS_SUCCESS:// return list of posts and make loading = false
      return {
          ...state,
           sensorsList: {
             sensors:action.payload,
             error: null,
             loading: false
           }
        };
    case FETCH_SENSORS_FAILURE:// return error and make loading = false
      error = action.payload.data || {message: action.payload.message};//2nd one is network or server down errors
      return {
        ...state,
         sensorsList: {
           billers:[],
           error: null,
           loading: true
         }
      };
    default:
      return state
  }
}
