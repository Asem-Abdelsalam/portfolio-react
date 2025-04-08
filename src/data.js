export const projects = [
    {
      id: 'automation1',
      category: 'automation',
      title: 'Product Detail Drawings Automation',
      desc: 'Creating a complete product detail with schedule by inputting one or more detail models.',
      img: '/images/projects/Automation/productdetails/before.png',
      inputImage: '/images/projects/Automation/productdetails/before.png',
      outputImage: '/images/projects/Automation/productdetails/after.png',
      overview: 'This script automates the generation of detailed drawings and schedules by parsing input models.',
      logic: 'Uses Grasshopper and Rhino APIs to extract parameters and organize them into structured output.',
      inputModel: '/models/model.glb',
      outputModel: '/models/model.glb'
    },
    {
      id: 'automation2',
      category: 'automation',
      title: '2D Product Cutfiles to 3D Models',
      desc: 'A script that reads cutfiles to produce detail models.',
      img: '/images/automation-project2.jpg',
      inputImage: '/images/automation2-before.jpg',
      outputImage: '/images/automation2-after.jpg',
      overview: 'Reads 2D cutfiles to reconstruct 3D geometry.',
      logic: 'Interprets DXF files and builds 3D models using parametric rules in Grasshopper.',
      inputModel: '/models/automation2-before.glb',
      outputModel: '/models/automation2-after.glb'
    },
    {
      id: 'fabrication1',
      category: 'fabrication',
      title: 'Parametric Facade Panels',
      desc: 'Grasshopper-driven design for CNC-cut facade panels with optimized material use.',
      img: '/images/fabrication-project1.jpg',
      description: 'Demonstrates parametric modeling for digital fabrication.'
    },
    {
      id: 'parametric1',
      category: 'parametric-modeling',
      title: 'Complex Roof Structure',
      desc: 'Parametric model of a dynamic roof system adapting to environmental factors.',
      img: '/images/parametric-project1.jpg',
      description: 'Showcases advanced computational techniques for architectural innovation.'
    },
    {
      id: 'furniture1',
      category: 'furniture-design',
      title: 'Custom Parametric Chair',
      desc: 'A chair design with adjustable parameters for ergonomics and aesthetics.',
      img: '/images/furniture-project1.jpg',
      description: 'Uses Grasshopper for a flexible, user-centric design.'
    }
  ];