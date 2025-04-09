import React, { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';
import ThreeViewer from '../components/ThreeViewer';

function Configurator() {
  const [modelFiles, setModelFiles] = useState([]);
  const [isGradient, setIsGradient] = useState(false);
  const [color1, setColor1] = useState('#e0e0e0');
  const [color2, setColor2] = useState('#ffffff');
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter(file =>
      file.name.endsWith('.glb') || file.name.endsWith('.fbx')
    );
    if (validFiles.length !== files.length) {
      alert('Only .glb and .fbx files are supported');
    }
    const newUrls = validFiles.map(file => ({
      name: file.name,
      url: URL.createObjectURL(file),
      visible: true,
      type: file.name.endsWith('.glb') ? 'glb' : 'fbx'
    }));
    setModelFiles(prev => [...prev, ...newUrls]);
  };

  const removeModel = (urlToRemove) => {
    setModelFiles(prev => {
      const updatedFiles = prev.filter(file => file.url !== urlToRemove);
      URL.revokeObjectURL(urlToRemove);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      return updatedFiles;
    });
  };

  const toggleVisibility = (urlToToggle) => {
    setModelFiles(prev =>
      prev.map(file =>
        file.url === urlToToggle ? { ...file, visible: !file.visible } : file
      )
    );
  };

  useEffect(() => {
    return () => {
      modelFiles.forEach(file => URL.revokeObjectURL(file.url));
    };
  }, [modelFiles]);

  return (
    <div className="page-wrapper">
      <Header />
      <main className="configurator-page">
        <div className="configurator-container">
          <header className="configurator-header">
          <h1>
              3D Configurator
              <span className="development-note"> (Under Development)</span>
            </h1>
            <p>Upload .glb or .fbx files to view and configure them</p>
          </header>
          <div className="configurator-main">
            <div className="controls">
              <label>
                Upload Models:
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".glb,.fbx"
                  multiple
                  onChange={handleFileChange}
                />
              </label>
              <div className="model-list">
                <h3 className="model-list-title">Loaded Models</h3>
                {modelFiles.length > 0 ? (
                  <ul className="model-items">
                    {modelFiles.map((file, index) => (
                      <li key={index} className="model-item">
                        <span className="model-name">{file.name}</span>
                        <div className="model-actions">
                          <button
                            className="visibility-button"
                            onClick={() => toggleVisibility(file.url)}
                            title={file.visible ? "Hide Model" : "Show Model"}
                          >
                            {file.visible ? (
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                <circle cx="12" cy="12" r="3" />
                              </svg>
                            ) : (
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                                <line x1="1" y1="1" x2="23" y2="23" />
                              </svg>
                            )}
                          </button>
                          <button
                            className="remove-button"
                            onClick={() => removeModel(file.url)}
                            title="Remove Model"
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M3 6h18" />
                              <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                            </svg>
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="no-models">No models loaded yet</p>
                )}
              </div>
              <div className="gradient-controls">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={isGradient}
                    onChange={(e) => setIsGradient(e.target.checked)}
                  />
                  Use Gradient
                </label>
                {isGradient ? (
                  <>
                    <label>
                      Color 1:
                      <input
                        type="color"
                        value={color1}
                        onChange={(e) => setColor1(e.target.value)}
                      />
                    </label>
                    <label>
                      Color 2:
                      <input
                        type="color"
                        value={color2}
                        onChange={(e) => setColor2(e.target.value)}
                      />
                    </label>
                  </>
                ) : (
                  <label>
                    Background Color:
                    <input
                      type="color"
                      value={color1}
                      onChange={(e) => setColor1(e.target.value)}
                    />
                  </label>
                )}
              </div>
            </div>
            <ThreeViewer
              models={modelFiles}
              backgroundColor={isGradient ? { color1, color2 } : color1}
              isGradient={isGradient}
            />
          </div>
        </div>
      </main>
      {/* Removed <Footer /> here since it's in App.js */}
    </div>
  );
}

export default Configurator;