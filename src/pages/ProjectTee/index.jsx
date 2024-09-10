import React, { useState } from 'react';
import TreeNode from './TreeNode'; // 

const Index = () => {
  const flatData = [
    { id: 1, name: 'Project AA', rootId: null, selected: false },
    { id: 11, name: 'Sub-Project A1', rootId: 1, selected: false },
    { id: 111, name: 'Sub-Sub-Project A1.1', rootId: 11, selected: false },
    { id: 12, name: 'Sub-Project A2', rootId: 1, selected: false },
    
  ];

  // Converts flat data into a hierarchical tree 
  const buildTree = (data) => {
    const idMapping = data.reduce((acc, node) => {
      acc[node.id] = { ...node, children: [] };
      return acc;
    }, {});

    const tree = [];
    data.forEach((node) => {
      if (node.rootId === null) {
        tree.push(idMapping[node.id]);
      } else if (idMapping[node.rootId]) {
        idMapping[node.rootId].children.push(idMapping[node.id]);
      }
    });

    return tree;
  };

  const [treeDataState, setTreeData] = useState(buildTree(flatData));
  const [selectedNode, setSelectedNode] = useState(null);
  const [newSubFolderName, setNewSubFolderName] = useState('');

  const generateId = () => Math.floor(Math.random() * 10000);

  const handleNodeClick = (node) => {
    const newTreeData = setNodeSelection(treeDataState, node.id);
    setTreeData(newTreeData);
    setSelectedNode(node);
  };

  const setNodeSelection = (nodes, id) => {
    return nodes.map((node) => {
      if (node.id === id) {
        node.selected = !node.selected;
      } else {
        node.selected = false;
      }
      if (node.children) {
        node.children = setNodeSelection(node.children, id);
      }
      return node;
    });
  };

  const addSubFolder = () => {
    if (!selectedNode || !newSubFolderName) return;

    const addChild = (nodes) => {
      return nodes.map((node) => {
        if (node.id === selectedNode.id) {
          if (!node.children) {
            node.children = [];
          }
          node.children.push({
            id: generateId(),
            name: newSubFolderName,
            children: [],
            selected: false,
          });
        } else if (node.children) {
          node.children = addChild(node.children);
        }
        return node;
      });
    };

    setTreeData(addChild(treeDataState));
    setNewSubFolderName(''); // Clear the input field after adding
  };

  const renameFolder = () => {
    if (!selectedNode) return;

    const newName = prompt('Enter new name:', selectedNode.name);
    if (newName) {
      const renameChild = (nodes) => {
        return nodes.map((node) => {
          if (node.id === selectedNode.id) {
            node.name = newName;
          } else if (node.children) {
            node.children = renameChild(node.children);
          }
          return node;
        });
      };

      setTreeData(renameChild(treeDataState));
    }
  };

  const deleteFolder = () => {
    if (!selectedNode) return;

    const removeChild = (nodes) => {
      return nodes.filter((node) => {
        if (node.children) {
          node.children = removeChild(node.children);
        }
        return node.id !== selectedNode.id;
      });
    };

    setTreeData(removeChild(treeDataState));
    setSelectedNode(null);
  };

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#eaeaea' }}>
      <div
        style={{
          width: '30%',
          padding: '20px',
          backgroundColor: '#ffffff',
          borderRight: '1px solid #ddd',
          overflowY: 'auto',
          boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
        }}
      >
        <h2 style={{ marginBottom: '20px', color: '#333' }}>Project LT ICT Projects</h2>
        {treeDataState.map((node) => (
          <TreeNode
            key={node.id}
            node={node}
            onNodeClick={handleNodeClick}
          />
        ))}
      </div>
      <div style={{ padding: '20px', flex: 1, backgroundColor: '#f9f9f9' }}>
        <h3 style={{ marginBottom: '20px' }}>Selected Node: {selectedNode ? selectedNode.name : 'None'}</h3>
        <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
          <input
            type="text"
            value={newSubFolderName}
            onChange={(e) => setNewSubFolderName(e.target.value)}
            placeholder="Enter new sub-folder name"
            style={{
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              marginRight: '10px',
              flex: 1
            }}
          />
          <button
            onClick={addSubFolder}
            disabled={!selectedNode}
            style={{
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              transition: 'background-color 0.3s',
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
          >
            Add Sub-Folder
          </button>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={renameFolder}
            disabled={!selectedNode}
            style={{
              padding: '10px 20px',
              backgroundColor: '#ffc107',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              transition: 'background-color 0.3s',
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#e0a800'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#ffc107'}
          >
            Rename Folder
          </button>
          <button
            onClick={deleteFolder}
            disabled={!selectedNode}
            style={{
              padding: '10px 20px',
              backgroundColor: '#dc3545',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              transition: 'background-color 0.3s',
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#c82333'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#dc3545'}
          >
            Delete Folder
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;