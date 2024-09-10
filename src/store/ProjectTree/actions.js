// src/redux/actions.js
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
// import { fetchProjects, deleteFolder, addFolder, renameFolder } from '../Api/index';
// import { toast } from 'react-toastify'; // Import the toast

export const getProjectsTree = () => ({
  type: FETCH_PROJECTSTREE_REQUEST,
});
export const getProjectsTreeSuccess = (projecttree) => ({
  type: FETCH_PROJECTSTREE_SUCCESS,
  payload: projecttree,
});
export const getProjectsTreeFail = (error) => ({
  type: FETCH_PROJECTSTREE_FAILURE,
  payload: error,
});

// export const fetchProjectsAction = () => async (dispatch) => {
//   dispatch({ type: FETCH_PROJECTS_REQUEST });
//   try {
//     const response = await fetchProjects();
//     dispatch({ type: FETCH_PROJECTS_SUCCESS, payload: response.data['data'] });
//   } catch (error) {
//     dispatch({ type: FETCH_PROJECTS_FAILURE, error: error.message });
//   }
// };


// export const fetchProjectsAction = () => async (dispatch) => {
//   dispatch({ type: FETCH_PROJECTS_REQUEST });
//   try {
//     const response = await fetchProjects();
//     const flatData = response.data['data']; // Assuming this is the flat data array
    
    
//     dispatch({ type: FETCH_PROJECTS_SUCCESS, payload: flatData });
//     toast.success('Success! Your action was successful.', {
      
//     });

//   } catch (error) {
//     dispatch({ type: FETCH_PROJECTS_FAILURE, error: error.message });
//   }
// };


// export const deleteFolderAction = (id) => async (dispatch) => {
//   dispatch({ type: DELETE_FOLDER_REQUEST });
//   try {
//     await deleteFolder(id);
//     dispatch({ type: DELETE_FOLDER_SUCCESS, payload: id });
//     console.log("deleted successfully")
//   } catch (error) {
//     dispatch({ type: DELETE_FOLDER_FAILURE, error: error.message });
//   }
// };

// export const addFolderAction = (rootId, name) => async (dispatch) => {
//   dispatch({ type: ADD_FOLDER_REQUEST });
//   try {
//     const response = await addFolder(rootId, name);
//     dispatch({ type: ADD_FOLDER_SUCCESS, payload: response.data });
//   } catch (error) {
//     dispatch({ type: ADD_FOLDER_FAILURE, error: error.message });
//   }
// };

// export const renameFolderAction = (id, rootId, name) => async (dispatch) => {
//   dispatch({ type: RENAME_FOLDER_REQUEST });
//   try {
//     await renameFolder(id, rootId, name);
//     dispatch({ type: RENAME_FOLDER_SUCCESS, payload: { id, rootId ,name } });
//   } catch (error) {
//     dispatch({ type: RENAME_FOLDER_FAILURE, error: error.message });
//   }
// };

