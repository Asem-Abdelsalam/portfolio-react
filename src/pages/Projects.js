import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProjectGrid from '../components/ProjectGrid';

function Projects() {

  // Set the document title when the component mounts
  useEffect(() => {
    document.title = 'Projects | Asem Abdelsalam';
  }, []); // Empty dependency array: runs once on mount
  
  const [activeTab, setActiveTab] = useState('automation');
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get('category');
    if (category) setActiveTab(category);
  }, [location]);

  return (
    <main>
      <section id="projects" className="section project-section">
        <div className="container">
          <h2>Projects</h2>
          <div className="project-tabs">
            {['automation', 'fabrication', 'parametric-modeling', 'furniture-design'].map(tab => (
              <button
                key={tab}
                className={`tab-button ${activeTab === tab ? 'active' : ''}`}
                data-tab={tab}
                onClick={() => setActiveTab(tab)}
              >
                {tab.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </button>
            ))}
          </div>
          <ProjectGrid activeTab={activeTab} />
        </div>
      </section>
    </main>
  );
}

export default Projects;