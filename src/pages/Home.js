import Hero from '../components/Hero';
import ProjectGrid from '../components/ProjectGrid';
import React, { useEffect } from 'react';

function Home() {
  // Set the document title when the component mounts
  useEffect(() => {
    document.title = 'Home | Asem Abdelsalam';
  }, []); // Empty dependency array: runs once on mount
  
  return (
    <main>
      <Hero />
      <section id="projects" className="section project-section">
        <div className="container">
          <h2>Projects</h2>
          <ProjectGrid activeTab="automation" />
        </div>
      </section>
    </main>
  );
}

export default Home;