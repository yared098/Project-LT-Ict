// actions.js
import {
    FETCH_NOTIFICATIONS_REQUEST,
    FETCH_NOTIFICATIONS_SUCCESS,
    FETCH_NOTIFICATIONS_FAILURE,
  } from './actionTypes';
  
  export const fetchNotificationsRequest = () => ({
    type: FETCH_NOTIFICATIONS_REQUEST,
  });
  
  export const fetchNotificationsSuccess = (data) => ({
    type: FETCH_NOTIFICATIONS_SUCCESS,
    payload: data,
  });
  
  export const fetchNotificationsFailure = (error) => ({
    type: FETCH_NOTIFICATIONS_FAILURE,
    payload: error,
  });
  