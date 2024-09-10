// src/redux/reducer.js
import { 
  FETCH_PROJECTSTREE_REQUEST, 
  FETCH_PROJECTSTREE_SUCCESS, 
  FETCH_PROJECTSTREE_FAILURE,
  // DELETE_PROJECTFOLDER_REQUEST, 
  // DELETE_PROJECTFOLDER_SUCCESS, 
  // DELETE_PROJECTFOLDER_FAILURE,
  // ADD_PROJECTFOLDER_REQUEST, 
  // ADD_PROJECTFOLDER_SUCCESS, 
  // ADD_PROJECTFOLDER_FAILURE,
  // RENAME_PROJECTFOLDER_REQUEST, 
  // RENAME_PROJECTFOLDER_SUCCESS, 
  // RENAME_PROJECTFOLDER_FAILURE
} from './actionTypes';

const initialState = {
  data: [],
  loading: false,
  error: null,
};
const buildTree = (data) => {
  const map = {};
  const result = [];

  data.forEach(item => {
    map[item.id] = { ...item, children: [] }; // Initialize the node with an empty children array
  });

  data.forEach(item => {
    if (item.rootId === null) {
      // If the rootId is null, it's a root node
      result.push(map[item.id]);
    } else {
      // Add the item to its parent's children array
      if (map[item.rootId]) {
        map[item.rootId].children.push(map[item.id]);
      }
    }
  });

  return result;
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PROJECTSTREE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_PROJECTSTREE_SUCCESS:
      return {
        ...state,
        loading: false,
        // data: action.payload,
        data: buildTree(action.payload),
      };
    case FETCH_PROJECTSTREE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    // case DELETE_PROJECTFOLDER_REQUEST:
    // case ADD_PROJECTFOLDER_REQUEST:
    // case RENAME_PROJECTFOLDER_REQUEST:
    //   return {
    //     ...state,
    //     loading: true,
    //     error: null,
    //   };
    // case DELETE_PROJECTFOLDER_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     data: state.data.filter((item) => item.id !== action.payload),
    //   };
    // case ADD_PROJECTFOLDER_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     data: [...state.data, action.payload],
    //   };
    // case RENAME_PROJECTFOLDER_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     data: state.data.map((item) =>
    //       item.id === action.payload.id ? { ...item, name: action.payload.name } : item
    //     ),
    //   };
    // case DELETE_PROJECTFOLDER_FAILURE:
    // case ADD_PROJECTFOLDER_FAILURE:
    // case RENAME_PROJECTFOLDER_FAILURE:
    //   return {
    //     ...state,
    //     loading: false,
    //     error: action.error,
    //   };
    default:
      return state;
  }
};

export default reducer;
