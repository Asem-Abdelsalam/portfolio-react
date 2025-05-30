import React from 'react';
import { Route, Routes } from 'react-router-dom'; // Remove BrowserRouter import
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Contact from './pages/Contact';
import Configurator from './pages/Configurator';
import './assets/css/style.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/project-detail/:id" element={<ProjectDetail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/configurator" element={<Configurator />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;