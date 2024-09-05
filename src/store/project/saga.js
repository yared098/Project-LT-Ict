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
  toggleUpdateLoading,
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

function* onUpdateProject({ payload: project, modalCallback }) {
  try {
    yield put(toggleUpdateLoading(true));
    const response = yield call(updateProject, project);
    yield put(updateProjectSuccess(response.data));
    toast.success(`Project ${project.prs_id} Is Updated Successfully`, {
      autoClose: 2000,
    });
    if (modalCallback) modalCallback();
  } catch (error) {
    yield put(updateProjectFail(error));
    toast.error(`Project ${project.prs_id} Update Failed`, {
      autoClose: 2000,
    });

    if (modalCallback) modalCallback();
  } finally {
    yield put(toggleUpdateLoading(false));
  }
}

function* onDeleteProject({ payload: project }) {
  try {
    yield put(toggleUpdateLoading(false));
    const response = yield call(deleteProject, project);
    yield put(deleteProjectuccess(response));
    toast.success(`Project ${project.prs_id} Is Delete Successfully`, {
      autoClose: 2000,
    });
  } catch (error) {
    yield put(deleteProjectfail(error));
    toast.error(`Project ${project.prs_id} Is Delete Failed`, {
      autoClose: 2000,
    });
  } finally {
    yield put(toggleUpdateLoading(false));
  }
}

function* onAddNewProject({ payload: project, modalCallback }) {
  try {
    yield put(toggleUpdateLoading(true));
    const response = yield call(addnewProject, project);
    yield put(addProjectSuccess(response.data));
    toast.success(`Project ${response.data.prs_id} Is Added Successfully`, {
      autoClose: 2000,
    });
    if (modalCallback) modalCallback();
  } catch (error) {
    yield put(addProjectFail(error));
    toast.error("Project Added Failed", { autoClose: 2000 });
    if (modalCallback) modalCallback();
  } finally {
    yield put(toggleUpdateLoading(false));
  }
}

function* ProjectSaga() {
  yield takeEvery(GET_PROJECTS, fetchProjects);

  yield takeEvery(ADD_NEW_PROJECT, onAddNewProject);
  yield takeEvery(UPDATE_PROJECT, onUpdateProject);
  yield takeEvery(DELETE_PROJECT, onDeleteProject);
}

export default ProjectSaga;
