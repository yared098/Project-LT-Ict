import {
  
  GET_PROJECTS_FAIL,
  GET_PROJECTS_SUCCESS,

  ADD_PROJECT_SUCCESS,
  ADD_PROJECT_FAIL,
  UPDATE_PROJECT_SUCCESS,
  UPDATE_PROJECT_FAIL,
  DELETE_PROJECT_SUCCESS,
  DELETE_PROJECT_FAIL,
 
} from "./actionTypes";

const INIT_STATE = {
  projects: {
    data: [],
    previledge: {},
  },
  error: {},
  loading: true,
};

const ProjectReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    

    case GET_PROJECTS_SUCCESS:
      return {
        ...state,
        projects: {
          data: action.payload.data, 
          previledge: action.payload.previledge, 
        },
        loading: false,
      };

    case GET_PROJECTS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false, 
      };

    case ADD_PROJECT_SUCCESS:
      return {
        ...state,
        projects: {
          ...state.projects,
          data: [action.payload, ...state.projects.data], 
        },
      };

    case ADD_PROJECT_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case UPDATE_PROJECT_SUCCESS:
      return {
        ...state,
        projects: {
          ...state.projects,
          data: state.projects.data.map((PROJECT) =>
            PROJECT.prs_id.toString() === action.payload.prs_id.toString()
              ? { ...PROJECT, ...action.payload } // Update the specific PROJECT
              : PROJECT
          ),
        },
      };

    case UPDATE_PROJECT_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case DELETE_PROJECT_SUCCESS:
      return {
        ...state,
        projects: {
          ...state.projects,
          data: state.projects.data.filter(
            (PROJECT) =>
              PROJECT.prs_id.toString() !== action.payload.deleted_id.toString()
          ),
        },
      };

    case DELETE_PROJECT_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    
    default:
      return state;
  }
};

export default ProjectReducer;
