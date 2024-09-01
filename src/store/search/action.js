import {
  PERFORM_SEARCH_REQUEST,
  PERFORM_SEARCH_SUCCESS,
  PERFORM_SEARCH_FAIL,
} from "./actionTypes";

export const performSearchRequest = (payload) => ({
  type: PERFORM_SEARCH_REQUEST,
  payload,
});

export const performSearchSuccess = (data) => ({
  type: PERFORM_SEARCH_SUCCESS,
  payload: data,
});

export const performSearchFail = (error) => ({
  type: PERFORM_SEARCH_FAIL,
  payload: error,
});
