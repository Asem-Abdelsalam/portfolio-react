import React from 'react';

function About() {
  return (
    <main>
      <section id="about" className="section about-section">
        <div className="container">
          <h2>About</h2>
          <div className="about-content">
          <img src={`${process.env.PUBLIC_URL}/images/profilepicture.jpg`} alt="Asem Abdelsalam" className="profile-img" loading="lazy" />
            <div className="about-text">
              <h3>Asem Abdelsalam</h3>
              <p className="about-subtitle">Architect | Computational Designer</p>
              <p>
                Architect with over two years of experience in computational design, specializing in parametric modeling,
                digital fabrication, and automation. Proficient in Rhino and Grasshopper, focused on optimizing design
                processes and precision.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="experience" className="section experience-section">
        <div className="container">
          <h2>Experience</h2>
          <div className="experience-content">
            <ul className="experience-list">
              <li>
                <div className="experience-item">
                  <img src="/images/acoufelt-logo.png" alt="Acoufelt Logo" className="experience-logo" loading="lazy" />
                  <div>
                    <h3>Acoufelt - Computational Designer</h3>
                    <p className="experience-date">United States (Remote) | 02/2025 - Current</p>
                    <p>
                      Developing parametric workflows and automation tools to optimize design efficiency while enhancing
                      creativity. Collaborating with the product design team to integrate computational methods into
                      acoustical product development.
                    </p>
                  </div>
                </div>
              </li>
              <li>
                <div className="experience-item">
                  <img src="/images/encode-studio-logo.png" alt="ENCODE Studio Logo" className="experience-logo" loading="lazy" />
                  <div>
                    <h3>ENCODE Studio - Architect | Computational Designer</h3>
                    <p className="experience-date">Alexandria, Egypt | 04/2024 - 09/2024</p>
                    <p>
                      Collaborated with the ENCODE team to develop Grasshopper scripts for complex furniture and partition
                      patterns, contributed to a phone booth design, and analyzed acoustic performance using Grasshopper.
                    </p>
                  </div>
                </div>
              </li>
              <li>
                <div className="experience-item">
                  <img src="/images/encode-studio-logo.png" alt="ENCODE Studio Logo" className="experience-logo" loading="lazy" />
                  <div>
                    <h3>ENCODE Studio - Junior Architect</h3>
                    <p className="experience-date">Alexandria, Egypt | 08/2022 - 12/2022</p>
                    <p>
                      Contributed to the Noor City Mosque design, using computational design, BIM, and rendering to develop
                      innovative solutions for the minbar, mihrab, shading, and other elements.
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section id="skills" className="section skills-section">
        <div className="container">
          <h2>Skills</h2>
          <ul className="skills-grid">
            <li>Rhino3D</li>
            <li>Grasshopper</li>
            <li>Revit</li>
            <li>Python</li>
            <li>C#</li>
            <li>JavaScript</li>
            <li>AutoCAD</li>
            <li>Blender</li>
            <li>Microsoft Office</li>
            <li>Photoshop</li>
            <li>Illustrator</li>
            <li>InDesign</li>
            <li>Lumion</li>
            <li>Twinmotion</li>
            <li>D5</li>
          </ul>
        </div>
      </section>

      <section id="education" className="section education-section">
        <div className="container">
          <h2>Education</h2>
          <div className="education-content">
            <ul className="education-list">
              <li>
                <div className="education-item">
                  <img src="/images/alexandria-university-logo.png" alt="Alexandria University Logo" className="education-logo" loading="lazy" />
                  <div>
                    <h3>Alexandria University</h3>
                    <p className="experience-date">Alexandria, Egypt | 07/2017 - 07/2022</p>
                    <p>Bachelor of Architecture - BArch, Architectural Engineering<br />Grade: Very Good</p>
                  </div>
                </div>
              </li>
              <li>
                <div className="education-item">
                  <img src="/images/victoria-college-logo.png" alt="Victoria College Logo" className="education-logo" loading="lazy" />
                  <div>
                    <h3>Victoria College, Alexandria City</h3>
                    <p className="experience-date">Alexandria, Egypt | 07/2004 - 05/2017</p>
                    <p>High School</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section id="languages" className="section languages-section">
        <div className="container">
          <h2>Languages</h2>
          <ul className="languages-grid">
            <li>English - Fluent</li>
            <li>Arabic - Native</li>
          </ul>
        </div>
      </section>
    </main>
  );
}

export default About;