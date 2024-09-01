import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  PERFORM_SEARCH_REQUEST,
  PERFORM_SEARCH_SUCCESS,
  PERFORM_SEARCH_FAIL,
} from "./actionTypes";
import { performSearchSuccess, performSearchFail } from "./actions";

function* performSearchSaga(action) {
  try {
    const { searchTerm, selectedFields } = action.payload;
    const response = yield call(axios.get, "https://api.example.com/search", {
      params: {
        searchTerm,
        selectedFields,
      },
    });
    yield put(performSearchSuccess(response.data));
  } catch (error) {
    yield put(performSearchFail(error.message));
  }
}

export default function* watchSearchSaga() {
  yield takeLatest(PERFORM_SEARCH_REQUEST, performSearchSaga);
}
