import { call, put, takeEvery } from "redux-saga/effects";

// Project Redux States
import {
  GET_PROJECTS,
 
  ADD_NEW_PROJECT,
  DELETE_PROJECT,
  UPDATE_PROJECT,

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

  getProjects,
  addnewProject,
  updateProject,
  deleteProject,
  
  // getProductComents as getProductComentsApi,
  // onLikeComment as onLikeCommentApi,
  // onLikeReply as onLikeReplyApi,
  // onAddReply as onAddReplyApi,
  // onAddComment as onAddCommentApi,
} from "../../helpers/fakebackend_helper";

// toast
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



function* fetchProjects() {
  try {
    const response = yield call(getProjects);
    yield put(getProjectsSuccess(response));
  } catch (error) {
    yield put(getProjectsFail(error));
  }
}


function* onUpdateProject({ payload: order, modalCallback }) {
  try {
    const response = yield call(updateProject, order);
    yield put(updateProjectSuccess(response.data));
    toast.success("Order Updated Successfully", { autoClose: 2000 });
    if (modalCallback) modalCallback();
  } catch (error) {
    yield put(updateProjectFail(error));
    toast.error("Order Update Failed", { autoClose: 2000 });
    if (modalCallback) modalCallback();
  }
}

function* onDeleteProject({ payload: order }) {
  try {
    const response = yield call(deleteProject, order);
    yield put(deleteProjectuccess(response));
    toast.success(`Order Delete Successfully`, { autoClose: 2000 });
  } catch (error) {
    yield put(deleteProjectfail(error));
    toast.error("Order Delete Failed", { autoClose: 2000 });
  }
}

function* onAddNewProject({ payload: order, modalCallback }) {
  try {
    const response = yield call(addnewProject, order);
    console.log("response in saga", response);
    yield put(addProjectSuccess(response.data));
    toast.success("Order Added Successfully", { autoClose: 2000 });
    if (modalCallback) modalCallback();
  } catch (error) {
    yield put(addProjectFail(error));
    toast.error("Order Added Failed", { autoClose: 2000 });
    if (modalCallback) modalCallback();
  }
}



function* ProjectSaga() {
  yield takeEvery(GET_PROJECTS, fetchProjects);
  
  yield takeEvery(ADD_NEW_PROJECT, onAddNewProject);
  yield takeEvery(UPDATE_PROJECT, onUpdateProject);
  yield takeEvery(DELETE_PROJECT, onDeleteProject);
}

export default ProjectSaga;
