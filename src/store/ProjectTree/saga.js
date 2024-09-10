import { call, put, takeEvery, select } from "redux-saga/effects";

// Project Redux States
import {
  FETCH_PROJECTSTREE_REQUEST,
//   ADD_PROJECTFOLDER_REQUEST,
//   DELETE_PROJECTFOLDER_REQUEST,
//   RENAME_PROJECTFOLDER_REQUEST,
} from "./actionTypes";

import { 
    getProjectsTreeSuccess,
    getProjectsTreeFail,
    
} from "../ProjectTree/actions";
import {
    getProjectTreeStatus,

  } from "../../helpers/Project_Backend";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function* fetchProjectsTree() {
    try {
      const response = yield call(getProjectTreeStatus);
      yield put(getProjectsTreeSuccess(response));
      toast.success(`Projects Loading  Successfully`, { autoClose: 2000 });
    } catch (error) {
      yield put(getProjectsTreeFail(error));
    }
  }

  function* ProjectTreeSaga() {
    yield takeEvery(FETCH_PROJECTSTREE_REQUEST, fetchProjectsTree);
  
  
  }
  
  export default ProjectTreeSaga;