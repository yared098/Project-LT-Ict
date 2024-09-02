import {
  PERFORM_SEARCH_REQUEST,
  PERFORM_SEARCH_SUCCESS,
  PERFORM_SEARCH_FAIL,
} from "./actionTypes";

const initialState = {
  searchTerm: {},
  selectedFields: [],
  results: [],
  error: null,
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case PERFORM_SEARCH_REQUEST:
      return {
        ...state,
        searchTerm: action.payload.searchTerm,
        selectedFields: action.payload.selectedFields,
      };

    case PERFORM_SEARCH_SUCCESS:
      return {
        ...state,
        results: action.payload,
      };

    case PERFORM_SEARCH_FAIL:
      return {
        ...state,
        error: action.payload.error,
      };

    default:
      return state;
  }
};

export default searchReducer;
