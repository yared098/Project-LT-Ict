import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { Spinner } from "reactstrap";
import TreeNode from "./TreeNode";
// import { ToastContainer } from 'react-toastify';

import {
  fetchProjectsRequest,
  renameFolderRequest,
  addFolderRequest,
  deleteFolderRequest,
} from "../../store/tree/actions";

const App_tree = () => {
  const dispatch = useDispatch();

  const TreeProperties = createSelector(
    (state) => state.TreeReducer,
    (TreeReducer) => ({
      data: TreeReducer.data,
      loading: TreeReducer.loading,
      error: TreeReducer.error,
    })
  );

  const { data, loading, error } = useSelector(TreeProperties);
  const [selectedNode, setSelectedNode] = useState(null);
  const [newSubFolderName, setNewSubFolderName] = useState("");

  useEffect(() => {
    dispatch(fetchProjectsRequest());
  }, [dispatch]);

  const handleNodeClick = (node) => {
    const newTreeData = setNodeSelection(data, node.id);
    dispatch({ type: "SET_TREE_DATA", payload: newTreeData });
    setSelectedNode(node);
    setNewSubFolderName(""); // Clear input field when selecting a folder
  };

  const setNodeSelection = (nodes, id) => {
    return nodes.map((node) => {
      node.selected = node.id === id;
      if (node.children) {
        node.children = setNodeSelection(node.children, id);
      }
      return node;
    });
  };

  // Handle adding a new subfolder
  const addSubFolder = () => {
    if (!newSubFolderName) return; // Ensure input is not empty
    const parentId = selectedNode ? selectedNode.id : null; // If node is selected, it will be the parent
    console.log("addSubFolder", parentId, newSubFolderName);
    dispatch(addFolderRequest(parentId, newSubFolderName));
    setNewSubFolderName(""); // Clear the input field
  };

  // Handle renaming the selected folder
  const renameFolder = () => {
    if (!selectedNode || !newSubFolderName) return; // Ensure a folder is selected and input is not empty
    dispatch(
      renameFolderRequest(
        selectedNode.id,
        selectedNode.rootId,
        newSubFolderName
      )
    );
    setNewSubFolderName(""); // Clear the input field
    setSelectedNode(null); // Clear selection after renaming
  };

  const deleteFolder = () => {
    if (!selectedNode) return;
    dispatch(deleteFolderRequest(selectedNode.id));
    setSelectedNode(null);
  };

  if (loading)
    return (
      <div>
        <Spinner
          color="primary"
          className="position-absolute top-50 start-50"
        />
      </div>
    );
  if (error)
    return (
      <div className="position-absolute top-50 start-50">Error: {error}</div>
    );

  return (
    <div className="d-flex vh-100 bg-light mt-5 pt-3">
      {/* <ToastContainer /> */}
      <div className="w-30 p-3 bg-white border-end overflow-auto shadow-sm">
        <h2 className="mb-4 text-dark">Sub-city Structures</h2>
        {data?.map((node) => (
          <TreeNode key={node.id} node={node} onNodeClick={handleNodeClick} />
        ))}
      </div>
      <div className="p-3 flex-grow-1 bg-light">
        <h3 className="mb-4">
          Selected Node: {selectedNode ? selectedNode.name : "None"}
        </h3>
        <div className="mb-4 d-flex align-items-center">
          <input
            type="text"
            value={newSubFolderName}
            onChange={(e) => setNewSubFolderName(e.target.value)}
            placeholder={
              selectedNode
                ? "Enter new name or sub-folder"
                : "Enter sub-folder name"
            }
            className="form-control me-2 flex-grow-1"
          />
          <button onClick={addSubFolder} className="btn btn-primary me-2">
            Add Sub-Folder
          </button>
          <button
            onClick={renameFolder}
            disabled={!selectedNode}
            className={`btn ${
              selectedNode ? "btn-success" : "btn-secondary disabled"
            }`}
          >
            Rename Folder
          </button>
        </div>
        {selectedNode && (
          <div className="mb-4">
            <button onClick={deleteFolder} className="btn btn-danger">
              Delete Folder
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App_tree;
