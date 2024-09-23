// reducer.js
import {
  FETCH_NOTIFICATIONS_REQUEST,
  FETCH_NOTIFICATIONS_SUCCESS,
  FETCH_NOTIFICATIONS_FAILURE,
} from "./actionTypes";

const initialState = {
  notifications: [],
  previledge: {},
  loading: false,
  error: null,
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_NOTIFICATIONS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        notifications: action.payload.data,
        previledge: action.payload.previledge,
      };
    case FETCH_NOTIFICATIONS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default notificationReducer;
