import React, { useState } from 'react';

const ProjectTree = ({ projects }) => {
  const [expanded, setExpanded] = useState([]);

  const handleExpand = (id) => {
    setExpanded((prevExpanded) =>
      prevExpanded.includes(id)
        ? prevExpanded.filter((item) => item !== id)
        : [...prevExpanded, id]
    );
  };

  const renderTree = (project) => {
    const isExpanded = expanded.includes(project.id);
    return (
      <div key={project.id} style={{ marginLeft: 20 }}>
        <div
          style={{ cursor: 'pointer', fontWeight: 'bold' }}
          onClick={() => handleExpand(project.id)}
        >
          {isExpanded ? '▼' : '▶'} {project.name}
        </div>
        {isExpanded && project.children && (
          <div>
            {project.children.map((child) => renderTree(child))}
          </div>
        )}
      </div>
    );
  };

  return <div>{projects.map((project) => renderTree(project))}</div>;
};

export default ProjectTree;
