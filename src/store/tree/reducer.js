import {
  FETCH_PROJECTS_REQUEST,
  FETCH_PROJECTS_SUCCESS,
  FETCH_PROJECTS_FAILURE,
  DELETE_FOLDER_REQUEST,
  DELETE_FOLDER_SUCCESS,
  DELETE_FOLDER_FAILURE,
  ADD_FOLDER_REQUEST,
  ADD_FOLDER_SUCCESS,
  ADD_FOLDER_FAILURE,
  RENAME_FOLDER_REQUEST,
  RENAME_FOLDER_SUCCESS,
  RENAME_FOLDER_FAILURE,
} from "./actionTypes";

const initialState = {
  data: [], // The tree structure will be held here
  loading: false,
  error: null,
};

// Helper function to recursively add a subfolder to the correct parent node
const addSubFolder = (tree, parentId, newFolder) => {
  return tree.map((node) => {
    if (node.id === parentId) {
      return {
        ...node,
        children: [...(node.children || []), newFolder],
      };
    } else if (node.children) {
      return {
        ...node,
        children: addSubFolder(node.children, parentId, newFolder),
      };
    }
    return node;
  });
};

// Helper function to recursively rename a folder
const renameFolder = (tree, folderId, newName) => {
  return tree.map((node) => {
    if (node.id === folderId) {
      return {
        ...node,
        name: newName,
      };
    } else if (node.children) {
      return {
        ...node,
        children: renameFolder(node.children, folderId, newName),
      };
    }
    return node;
  });
};

// Helper function to recursively delete a folder
const deleteFolder = (tree, folderId) => {
  return tree
    .filter((node) => node.id !== folderId)
    .map((node) => ({
      ...node,
      children: node.children ? deleteFolder(node.children, folderId) : [],
    }));
};

const buildTree = (data) => {
  const map = {};
  const result = [];

  data.forEach((item) => {
    map[item.id] = { ...item, children: [] }; // Initialize the node with an empty children array
  });

  data.forEach((item) => {
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

const TreeReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PROJECTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_PROJECTS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: buildTree(action.payload), // Build the tree structure from flat data
      };
    case FETCH_PROJECTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case ADD_FOLDER_REQUEST:
    case RENAME_FOLDER_REQUEST:
    case DELETE_FOLDER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ADD_FOLDER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: addSubFolder(
          state.data,
          action.payload.parentId,
          action.payload.newFolder
        ),
      };
    case RENAME_FOLDER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: renameFolder(
          state.data,
          action.payload.folderId,
          action.payload.newName
        ),
      };
    case DELETE_FOLDER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: deleteFolder(state.data, action.payload.folderId),
      };
    case ADD_FOLDER_FAILURE:
    case RENAME_FOLDER_FAILURE:
    case DELETE_FOLDER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case "SET_TREE_DATA":
      return {
        ...state,
        data: action.payload, // Update the tree data in the Redux state
      };
    default:
      return state;
  }
};

export default TreeReducer;
