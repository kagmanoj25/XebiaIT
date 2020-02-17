import {Map} from 'immutable';
import {get, post} from '../utils/api';
import * as apiEndpoints from '../utils/apiConfig';
import * as configuration from '../utils/configuration';
import Toast from 'react-native-simple-toast';
import {AllTexts} from '../modules/theme/css/Common';
import _ from 'lodash';

// TO set API_ROOT varible
const API_ROOT = apiEndpoints.api;
configuration.setConfiguration('API_ROOT', API_ROOT);

// 1. Login API 
const SESSION_LOGIN_SUCCESS = 'SESSION_LOGIN_SUCCESS';
const SESSION_LOGIN_FAIL = 'SESSION_LOGIN_FAIL';

// 2. Planet API 
const PLANET_SUCCESS = 'PLANET_SUCCESS';
const PLANET_FAIL = 'PLANET_FAIL';

// 1. Login API
export const loginSuccess = value => ({
  type: SESSION_LOGIN_SUCCESS,
  payload: JSON.stringify({ value })
});

export const loginFail = value => ({
  type: SESSION_LOGIN_FAIL,
  payload: JSON.stringify({ value })
});

// 2. Planet API
export const planetSuccess = value => ({
  type: PLANET_SUCCESS,
  payload: JSON.stringify({ value })
});

export const planetFail = value => ({
  type: PLANET_FAIL,
  payload: JSON.stringify({ value })
});

export const onUserLoginAsync = (props, username, password) => {
    console.log(username);
  return async dispatch => {
    get(`people/?search=${username}`, true)
      .then(responseData => {
        let people = _.filter(responseData.results, {name: username, birth_year: password});
        if (_.isEmpty(people)) {
            Toast.show(AllTexts.notMatch);
        } else {
          dispatch(loginSuccess(responseData))
          props.navigation.navigate('Planet');
        }
         return responseData;
      })
      .catch(e => {
          console.log('Error:', e);
          Toast.show(AllTexts.SomthingWentWrong);
      });
  };
};

export const onPlanetAPIAsync = (pageNumber) => {
  return async dispatch => {
    get(`planets/?page=${pageNumber}`, true)
      .then(responseData => {
        dispatch(planetSuccess(responseData.results))
        return responseData;
      })
      .catch(e => {
        console.log('Error:', e);
          Toast.show(AllTexts.SomthingWentWrong);
      });
  };
};

// Initial state
const initialState = Map({
  user: '',
  isUserLogIn: false,
  planetData:''
})

export default function APICallStateReducer(state = initialState, action) {
  switch (action.type) {
    // 1. Login
    case SESSION_LOGIN_SUCCESS:
      return state.set('user', action.payload).set('isUserLogIn', true);
    case SESSION_LOGIN_FAIL:
      return state.set('isUserLogIn', false);
    case PLANET_SUCCESS:
      return state.set('planetData', action.payload);
    case PLANET_FAIL:
      return state.set('planetData', '');
    default:
      return state;
  }
}