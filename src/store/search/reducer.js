import {
  PERFORM_SEARCH_REQUEST,
  PERFORM_SEARCH_SUCCESS,
  PERFORM_SEARCH_FAIL,
} from "./actionTypes";

const initialState = {
  searchResults: [],
  loading: false,
  error: null,
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case PERFORM_SEARCH_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case PERFORM_SEARCH_SUCCESS:
      return {
        ...state,
        searchResults: action.payload,
        loading: false,
      };

    case PERFORM_SEARCH_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default searchReducer;
