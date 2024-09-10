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
    <div
      style={{
        display: "flex",
        height: "100vh",
        backgroundColor: "#eaeaea",
        marginTop: "70px",
      }}
    >
      {/* <ToastContainer /> */}
      <div
        style={{
          width: "30%",
          padding: "20px",
          backgroundColor: "#ffffff",
          borderRight: "1px solid #ddd",
          overflowY: "auto",
          boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ marginBottom: "20px", color: "#333" }}>
          Sub-city Structures
        </h2>
        {data?.map((node) => (
          <TreeNode key={node.id} node={node} onNodeClick={handleNodeClick} />
        ))}
      </div>
      <div style={{ padding: "20px", flex: 1, backgroundColor: "#f9f9f9" }}>
        <h3 style={{ marginBottom: "20px" }}>
          Selected Node: {selectedNode ? selectedNode.name : "None"}
        </h3>
        <div
          style={{
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <input
            type="text"
            value={newSubFolderName}
            onChange={(e) => setNewSubFolderName(e.target.value)}
            placeholder={
              selectedNode
                ? "Enter new name or sub-folder"
                : "Enter sub-folder name"
            }
            style={{
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              marginRight: "10px",
              flex: 1,
            }}
          />
          <button
            onClick={addSubFolder}
            style={{
              padding: "10px 20px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              marginRight: "10px",
            }}
          >
            Add Sub-Folder
          </button>
          <button
            onClick={renameFolder}
            disabled={!selectedNode} // Disable rename button if no node is selected
            style={{
              padding: "10px 20px",
              backgroundColor: selectedNode ? "#28a745" : "#ccc", // Change color based on selection
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: selectedNode ? "pointer" : "not-allowed",
            }}
          >
            Rename Folder
          </button>
        </div>
        {selectedNode && (
          <div style={{ marginBottom: "20px" }}>
            <button
              onClick={deleteFolder}
              style={{
                padding: "10px 20px",
                backgroundColor: "#dc3545",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Delete Folder
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App_tree;
