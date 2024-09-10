// import React, { useState } from 'react';
// import { FaChevronRight, FaChevronDown } from 'react-icons/fa';
// import { AiOutlineFolder } from 'react-icons/ai';

// // TreeNode component representing a project or folder
// const TreeNode = ({ node, onNodeClick, level = 0 }) => {
//     console.log(node);
//     console.log("this is node data on tree")
//   const [isExpanded, setIsExpanded] = useState(false);

//   const toggleExpand = () => setIsExpanded(!isExpanded);

//   return (
//     <div style={{ position: 'relative', marginLeft: level * 20, padding: '5px 0' }}>
//       {level > 0 && (
//         <>
//           <div
//             style={{
//               position: 'absolute',
//               top: 0,
//               left: '-20px',
//               height: '100%',
//               borderLeft: '1px solid #ccc',
//               zIndex: -1,
//             }}
//           ></div>
//           <div
//             style={{
//               position: 'absolute',
//               top: '50%',
//               left: '-20px',
//               width: '20px',
//               borderTop: '1px solid #ccc',
//               zIndex: -1,
//             }}
//           ></div>
//         </>
//       )}
//       <div
//         onClick={() => onNodeClick(node)}
//         style={{
//           cursor: 'pointer',
//           backgroundColor: node.selected ? '#e0f7fa' : 'transparent',
//           padding: '8px 12px',
//           borderRadius: '5px',
//           display: 'flex',
//           alignItems: 'center',
//           position: 'relative',
//           boxShadow: node.selected ? '0 4px 8px rgba(0,0,0,0.2)' : 'none',
//           transition: 'background-color 0.3s, box-shadow 0.3s',
//           zIndex: 1,
//         }}
//       >
//         {node.children && node.children.length > 0 && (
//           <span onClick={toggleExpand} style={{ marginRight: 8 }}>
//             {isExpanded ? <FaChevronDown /> : <FaChevronRight />}
//           </span>
//         )}
//         <AiOutlineFolder style={{ marginRight: '8px', color: '#007bff' }} />
//         <span>{node.name}</span>
//       </div>

//       {isExpanded && node.children && (
//         <div style={{ marginLeft: 20, position: 'relative' }}>
//           {node.children.map((childNode) => (
//             <TreeNode
//               key={childNode.id}
//               node={childNode}
//               onNodeClick={onNodeClick}
//               level={level + 1}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default TreeNode;
// this is old tree 

import React, { useState } from 'react';
import { FaChevronRight, FaChevronDown } from 'react-icons/fa';
import { AiOutlineFolder } from 'react-icons/ai';

// TreeNode component representing a project or folder
const TreeNode = ({ node, onNodeClick, level = 0 }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  return (
    <div style={{ position: 'relative', marginLeft: level * 20, padding: '5px 0' }}>
      {/* Draw lines to show hierarchy */}
      {level > 0 && (
        <>
          {/* Vertical line connecting to parent */}
          <div
            style={{
              position: 'absolute',
              top: '0px',   // Adjust to align vertically
              left: '-10px',  // Adjust for better horizontal alignment
              height: '100%',
              borderLeft: '2px solid #007bff',  // Thicker and colored line for visibility
              zIndex: 0,  // Ensure it's behind the content
            }}
          ></div>
          {/* Horizontal line connecting siblings */}
          <div
            style={{
              position: 'absolute',
              top: '50%',    // Center the line horizontally in the middle
              left: '-10px',  // Adjust for better horizontal alignment
              width: '10px',  // Short horizontal line
              borderTop: '2px solid #007bff',  // Thicker and colored line
              zIndex: 0,  // Ensure it's behind the content
            }}
          ></div>
        </>
      )}

      {/* Node Display */}
      <div
        onClick={() => onNodeClick(node)}
        style={{
          cursor: 'pointer',
          backgroundColor: node.selected ? '#e0f7fa' : 'transparent',
          padding: '8px 12px',
          borderRadius: '5px',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          boxShadow: node.selected ? '0 4px 8px rgba(0,0,0,0.2)' : 'none',
          transition: 'background-color 0.3s, box-shadow 0.3s',
          zIndex: 1,
        }}
      >
        {/* Expand/Collapse Toggle */}
        {node.children && node.children.length > 0 && (
          <span onClick={toggleExpand} style={{ marginRight: 8 }}>
            {isExpanded ? <FaChevronDown /> : <FaChevronRight />}
          </span>
        )}
        <AiOutlineFolder style={{ marginRight: '8px', color: '#007bff' }} />
        <span>{node.name}</span>
      </div>

      {/* Child Nodes */}
      {isExpanded && node.children && (
        <div style={{ marginLeft: 20, position: 'relative' }}>
          {node.children.map((childNode) => (
            <TreeNode
              key={childNode.id}
              node={childNode}
              onNodeClick={onNodeClick}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TreeNode;

