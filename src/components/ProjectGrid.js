import React from 'react';
import { projects } from '../data';

function ProjectGrid({ activeTab }) {
  return (
    <div className="project-grid" id="project-grid">
      {projects.map(project => (
        <div
          key={project.id}
          className="project-item"
          data-category={project.category}
          style={{ display: project.category === activeTab ? 'block' : 'none' }}
        >
          <img src={project.img} alt={project.title} className="project-img" loading="lazy" />
          <div className="project-text">
            <h3>{project.title}</h3>
            <p>{project.desc}</p>
            <a href={`/project-detail/${project.id}`} className="project-link">View Project</a>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProjectGrid;