import { call, put, takeEvery } from "redux-saga/effects";

// Project Redux States
import {
  GET_PROJECTS_STATUS,
  ADD_NEW_PROJECT_STATUS,
  DELETE_PROJECT_STATUS,
  UPDATE_PROJECT_STATUS

} from "./actionTypes";
import {
  getProjectsFail,
  getProjectsSuccess,

  addProjectFail,
  addProjectSuccess,

  updateProjectSuccess,
  updateProjectFail,

  deleteProjectuccess,
  deleteProjectfail,


} from "./actions";

//Include Both Helper File with needed methods
import {

  getProjectsStatus,
  addnewProjectStatus,
  updateProjectStatus,
  deleteProjectStatus,
  
  // getProductComents as getProductComentsApi,
  // onLikeComment as onLikeCommentApi,
  // onLikeReply as onLikeReplyApi,
  // onAddReply as onAddReplyApi,
  // onAddComment as onAddCommentApi,
} from "../../helpers/Project_Backend";

// toast
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



function* fetchProjectsStatus() {
  try {
    const response = yield call(getProjectsStatus);

    yield put(getProjectsSuccess(response));
    // toast.success(`Projects Loading  Successfully`, { autoClose: 2000 });
  } catch (error) {
    yield put(getProjectsFail(error));
    toast.success(`Projects Loading Failed`, { autoClose: 2000 });
  }
}


function* onUpdateProjectStatus({ payload: project, modalCallback }) {
  try {
    const response = yield call(updateProjectStatus, project);
    yield put(updateProjectSuccess(response.data));
    toast.success(`Project ${project.prs_id} Is Updated Successfully`, { autoClose: 2000 });
    if (modalCallback) modalCallback();
  } catch (error) {
    yield put(updateProjectFail(error));
    toast.error(`Project ${project.prs_id} Is Update Failed`, { autoClose: 2000 });
    if (modalCallback) modalCallback();
  }
}

function* onDeleteProjectStatus({ payload: project }) {
  try {
    const response = yield call(deleteProjectStatus, project);
    yield put(deleteProjectuccess(response));
    toast.success(`Project ${project} Is Delete Successfully`, { autoClose: 2000 });
  } catch (error) {
    yield put(deleteProjectfail(error));
    toast.error(`Project ${project.prs_id} Is Delete Failed`, { autoClose: 2000 });
  }
}

function* onAddNewProjectStatus({ payload: project, modalCallback }) {
  try {
    const response = yield call(addnewProjectStatus, project);

    yield put(addProjectSuccess(response.data));
    toast.success(`Project ${project.prs_id} Is Added Successfully`, { autoClose: 2000 });
    if (modalCallback) modalCallback();
  } catch (error) {
    yield put(addProjectFail(error));
    toast.error("Project Added Failed", { autoClose: 2000 });
    if (modalCallback) modalCallback();
  }
}



function* ProjectStatusSaga() {
  yield takeEvery(GET_PROJECTS_STATUS, fetchProjectsStatus);
  
  yield takeEvery(ADD_NEW_PROJECT_STATUS, onAddNewProjectStatus);
  yield takeEvery(UPDATE_PROJECT_STATUS, onUpdateProjectStatus);
  yield takeEvery(DELETE_PROJECT_STATUS, onDeleteProjectStatus);
}

export default ProjectStatusSaga;
