import {
  GET_BUDGET_REQUEST_FAIL,
  GET_BUDGET_REQUEST_SUCCESS,
  ADD_BUDGET_REQUEST_SUCCESS,
  ADD_BUDGET_REQUEST_FAIL,
  UPDATE_BUDGET_REQUEST_SUCCESS,
  UPDATE_BUDGET_REQUEST_FAIL,
  DELETE_BUDGET_REQUEST_SUCCESS,
  DELETE_BUDGET_REQUEST_FAIL,
  TOGGLE_UPDATE_LOADING,
} from "./actionTypes";

const INIT_STATE = {
  update_loading: false,
  budgetRequest: {
    data: [],
    previledge: {},
  },
  error: {},
  loading: true,
};

const BudgetRequestReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_BUDGET_REQUEST_SUCCESS:
      return {
        ...state,
        budgetRequest: {
          data: action.payload.data,
          previledge: action.payload.previledge,
        },
        loading: false,
      };

    case GET_BUDGET_REQUEST_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case ADD_BUDGET_REQUEST_SUCCESS:
      return {
        ...state,
        budgetRequest: {
          ...state.budgetRequest,
          data: [action.payload, ...state.budgetRequest.data],
        },
      };

    case ADD_BUDGET_REQUEST_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case UPDATE_BUDGET_REQUEST_SUCCESS:
      return {
        ...state,
        budgetRequest: {
          ...state.budgetRequest,
          data: state.budgetRequest.data.map((BUDGET_REQUEST) =>
            BUDGET_REQUEST.bdr_id.toString() === action.payload.bdr_id.toString()
              ? { ...BUDGET_REQUEST, ...action.payload } // Update the specific BUDGET_REQUEST
              : BUDGET_REQUEST
          ),
        },
      };

    case UPDATE_BUDGET_REQUEST_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case DELETE_BUDGET_REQUEST_SUCCESS:
      return {
        ...state,
        budgetRequest: {
          ...state.budgetRequest,
          data: state.budgetRequest.data.filter(
            (BUDGET_REQUEST) =>
              BUDGET_REQUEST.bdr_id.toString() !== action.payload.deleted_id.toString()
          ),
        },
      };

    case DELETE_BUDGET_REQUEST_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case TOGGLE_UPDATE_LOADING:
      return {
        ...state,
        update_loading: action.payload,
      };

    default:
      return state;
  }
};

export default BudgetRequestReducer;
