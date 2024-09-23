// saga.js
import { call, put, takeEvery } from "redux-saga/effects";
import { FETCH_NOTIFICATIONS_REQUEST } from "./actionTypes";
import {
  fetchNotificationsSuccess,
  fetchNotificationsFailure,
} from "./actions";

import { post } from "../../helpers/api_Lists";

//helper function
const apiUrl = import.meta.env.VITE_BASE_API_URL;
const getNotifications = async () => {
  try {
    const response = await post(apiUrl + "notification");
    return response;
  } catch (error) {
    console.log(error); // Handle any errors
  }
};

// Fetch notifications API call
function* fetchNotificationsSaga() {
  try {
    const response = yield call(getNotifications);
    yield put(fetchNotificationsSuccess(response));
  } catch (error) {
    yield put(fetchNotificationsFailure(error.message));
  }
}

// Watcher Saga
export default function* notificationSaga() {
  yield takeEvery(FETCH_NOTIFICATIONS_REQUEST, fetchNotificationsSaga);
}
