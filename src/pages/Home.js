import React from 'react';
import Hero from '../components/Hero';
import ProjectGrid from '../components/ProjectGrid';

function Home() {
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