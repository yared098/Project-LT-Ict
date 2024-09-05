import {
  GET_PROJECTS,
  GET_PROJECTS_FAIL,
  GET_PROJECTS_SUCCESS,
  ADD_NEW_PROJECT,
  ADD_PROJECT_SUCCESS,
  ADD_PROJECT_FAIL,
  UPDATE_PROJECT,
  UPDATE_PROJECT_SUCCESS,
  UPDATE_PROJECT_FAIL,
  DELETE_PROJECT,
  DELETE_PROJECT_SUCCESS,
  DELETE_PROJECT_FAIL,
  
} from "./actionTypes"


export const getProjectsStatus = () => ({
  type: GET_PROJECTS,
})

export const getProjectsSuccess = PROJECTs => ({
  type: GET_PROJECTS_SUCCESS,
  payload: PROJECTs,
})

export const getProjectsFail = error => ({
  type: GET_PROJECTS_FAIL,
  payload: error,
})

export const addNewProjectStatus = PROJECT => ({
  type: ADD_NEW_PROJECT,
  payload: PROJECT,
})

export const addProjectSuccess = PROJECT => ({
  type: ADD_PROJECT_SUCCESS,
  payload: PROJECT,
})

export const addProjectFail = error => ({
  type: ADD_PROJECT_FAIL,
  payload: error,
})

export const updateProjectStatus = PROJECT => ({
  type: UPDATE_PROJECT,
  payload: PROJECT,
})

export const updateProjectSuccess = PROJECT => ({
  type: UPDATE_PROJECT_SUCCESS,
  payload: PROJECT,
})

export const updateProjectFail = error => ({
  type: UPDATE_PROJECT_FAIL,
  payload: error,
})

export const deleteProjectStatus = PROJECT => ({
  type: DELETE_PROJECT,
  payload: PROJECT,
})

export const deleteProjectuccess = PROJECT => ({
  type: DELETE_PROJECT_SUCCESS,
  payload: PROJECT,
})

export const deleteProjectfail = error => ({
  type: DELETE_PROJECT_FAIL,
  payload: error,
})
