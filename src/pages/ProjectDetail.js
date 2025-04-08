import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { projects } from '../data';
import ModelViewer from '../components/ModelViewer';

function ProjectDetail() {
  const { id } = useParams();
  const [sliderPosition, setSliderPosition] = useState(50);
  const sliderContainerRef = useRef(null);
  const project = projects.find(p => p.id === id) || { title: 'Project Not Found', overview: 'Sorry, the project you are looking for does not exist.' };

  useEffect(() => {
    const handleDrag = (e) => {
      const rect = sliderContainerRef.current.getBoundingClientRect();
      let x = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
      x = x - rect.left;
      if (x < 0) x = 0;
      if (x > rect.width) x = rect.width;
      setSliderPosition((x / rect.width) * 100);
    };

    let isDragging = false;
    const sliderHandle = sliderContainerRef.current?.querySelector('.slider-handle');

    const startDrag = () => (isDragging = true);
    const stopDrag = () => (isDragging = false);
    const moveDrag = (e) => isDragging && handleDrag(e);

    sliderHandle?.addEventListener('mousedown', startDrag);
    sliderHandle?.addEventListener('touchstart', startDrag);
    document.addEventListener('mousemove', moveDrag);
    document.addEventListener('touchmove', moveDrag);
    document.addEventListener('mouseup', stopDrag);
    document.addEventListener('touchend', stopDrag);

    return () => {
      sliderHandle?.removeEventListener('mousedown', startDrag);
      sliderHandle?.removeEventListener('touchstart', startDrag);
      document.removeEventListener('mousemove', moveDrag);
      document.removeEventListener('touchmove', moveDrag);
      document.removeEventListener('mouseup', stopDrag);
      document.removeEventListener('touchend', stopDrag);
    };
  }, []);

  return (
    <main>
      <section className="section project-detail-section">
        <div className="container">
          <h2 id="project-title">{project.title}</h2>
          {project.inputImage && project.outputImage ? (
            <>
              <div className="image-slider">
                <div className="slider-container" ref={sliderContainerRef}>
                  <img src={project.outputImage} alt="Output" className="slider-image output" loading="lazy" />
                  <img
                    src={project.inputImage}
                    alt="Input"
                    className="slider-image input"
                    style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                    loading="lazy"
                  />
                  <div className="slider-handle" style={{ left: `${sliderPosition}%` }}></div>
                </div>
                <div className="slider-labels">
                  <span>Before</span>
                  <span>After</span>
                </div>
              </div>
              <p id="project-overview" className="project-overview">{project.overview}</p>
              <p id="project-logic" className="project-logic">{project.logic}</p>
              <div className="model-viewers">
                <ModelViewer modelUrl={project.inputModel} viewerType="input" />
                <ModelViewer modelUrl={project.outputModel} viewerType="output" />
              </div>
            </>
          ) : (
            <p id="project-overview">{project.description || project.overview}</p>
          )}
          <Link to="/projects" className="back-to-projects">Back to Projects</Link>
        </div>
      </section>
    </main>
  );
}

export default ProjectDetail;