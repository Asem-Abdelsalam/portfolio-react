import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useState, useEffect, useRef } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import * as THREE from 'three';

const ConfigurableModel = ({ modelPath, type, visible, onModelLoaded }) => {
  const [model, setModel] = useState(null);

  useEffect(() => {
    let loader;
    if (type === 'glb') {
      loader = new GLTFLoader();
      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.7/');
      loader.setDRACOLoader(dracoLoader);
    } else if (type === 'fbx') {
      loader = new FBXLoader();
    }

    loader.load(
      modelPath,
      (loaded) => {
        const loadedModel = type === 'glb' ? loaded.scene : loaded;
        if (type === 'fbx') {
          loadedModel.scale.set(0.025, 0.025, 0.025);
          loadedModel.rotation.set(Math.PI / 2, 0, 0);
        }
        loadedModel.traverse((child) => {
          if (child.isMesh && child.material) {
            child.material.side = THREE.DoubleSide;
          }
        });
        setModel(loadedModel);
        onModelLoaded?.(loadedModel);
      },
      undefined,
      (error) => console.error(`Error loading ${type.toUpperCase()}:`, error)
    );

    return () => {
      if (type === 'glb') {
        const dracoLoader = loader.dracoLoader;
        if (dracoLoader) dracoLoader.dispose();
      }
    };
  }, [modelPath, type, onModelLoaded]);

  useEffect(() => {
    if (model) {
      model.visible = visible;
    }
  }, [model, visible]);

  return model ? <primitive object={model} castShadow /> : null;
};

const SceneSetup = ({ models = [] }) => {
  const { camera, size: canvasSize } = useThree();
  const [boundingBoxData, setBoundingBoxData] = useState(null);
  const controlsRef = useRef();

  useEffect(() => {
    setBoundingBoxData(null);
  }, [models]);

  useEffect(() => {
    if (!camera || !boundingBoxData) return;

    const { box } = boundingBoxData;
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());

    const fov = camera.fov * (Math.PI / 180);
    const aspect = canvasSize.width / canvasSize.height;
    const verticalDistance = (size.y / 2) / Math.tan(fov / 2);
    const horizontalDistance = (size.x / 2) / (Math.tan(fov / 2) * aspect);
    const distance = Math.max(verticalDistance, horizontalDistance, size.z) * 1.2;

    const direction = new THREE.Vector3(0, 0, 1).applyQuaternion(camera.quaternion);
    const newPosition = center.clone().add(direction.multiplyScalar(distance));

    camera.position.copy(newPosition);
    camera.lookAt(center);
    camera.updateProjectionMatrix();

    if (controlsRef.current) {
      controlsRef.current.target.copy(center);
      controlsRef.current.update();
    }
  }, [boundingBoxData, camera, canvasSize]);

  useEffect(() => {
    if (!models || models.length === 0) {
      setBoundingBoxData(null);
      return;
    }

    const group = new THREE.Group();
    const gltfLoader = new GLTFLoader();
    const fbxLoader = new FBXLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.7/');
    gltfLoader.setDRACOLoader(dracoLoader);

    const visibleModels = models.filter(m => m.visible);
    if (visibleModels.length === 0) {
      setBoundingBoxData(null);
      return;
    }

    let loadedCount = 0;
    visibleModels.forEach((model) => {
      const loader = model.type === 'glb' ? gltfLoader : fbxLoader;
      loader.load(model.url, (loaded) => {
        const scene = model.type === 'glb' ? loaded.scene : loaded;
        if (model.type === 'fbx') {
          scene.scale.set(0.01, 0.01, 0.01);
          scene.rotation.set(Math.PI / 2, 0, 0);
        }
        group.add(scene);
        loadedCount++;
        if (loadedCount === visibleModels.length) {
          const box = new THREE.Box3().setFromObject(group);
          setBoundingBoxData({ box });
        }
      });
    });

    return () => dracoLoader.dispose();
  }, [models]);

  return (
    <>
      <ambientLight intensity={0.3} color="#ffffff" />
      <directionalLight
        position={[5, 10, 7.5]}
        intensity={1.8}
        castShadow
        shadow-mapSize-width={4096}
        shadow-mapSize-height={4096}
        shadow-camera-near={0.1}
        shadow-camera-far={50}
        shadow-camera-left={-15}
        shadow-camera-right={15}
        shadow-camera-top={15}
        shadow-camera-bottom={-15}
        shadow-bias={-0.00005}
        color="#ffffff"
      />
      <directionalLight position={[-5, 3, -2]} intensity={0.6} color="#f0f0f5" />
      <directionalLight position={[0, 5, -10]} intensity={1.0} color="#e0e8ff" />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <shadowMaterial opacity={0.3} color="#555555" />
      </mesh>
      {models.map((model, index) => (
        <ConfigurableModel
          key={index}
          modelPath={model.url}
          type={model.type}
          visible={model.visible}
        />
      ))}
      <OrbitControls ref={controlsRef} />
    </>
  );
};

const ModelHierarchyItem = ({ node, level = 0 }) => {
  const [isOpen, setIsOpen] = useState(level === 0);

  return (
    <li className="hierarchy-item" style={{ paddingLeft: `${level * 15}px` }}>
      <div className="hierarchy-node">
        <button
          className="toggle-button"
          onClick={() => setIsOpen(!isOpen)}
          disabled={!node.children || node.children.length === 0}
        >
          {node.children && node.children.length > 0 ? (isOpen ? '▼' : '▶') : '•'}
        </button>
        <span>{node.name || `${node.type}-${node.id}`}</span>
        <span className="node-type">({node.type})</span>
      </div>
      {isOpen && node.children && node.children.length > 0 && (
        <ul className="hierarchy-children">
          {node.children.map((child, index) => (
            <ModelHierarchyItem key={index} node={child} level={level + 1} />
          ))}
        </ul>
      )}
    </li>
  );
};

const ModelHierarchy = ({ models }) => {
  const [hierarchy, setHierarchy] = useState({});

  const extractHierarchy = (model, modelName) => {
    const buildNode = (obj, idCounter = { value: 0 }) => {
      const node = {
        name: obj.name || null,
        type: obj.type,
        id: idCounter.value++,
        children: []
      };
      if (obj.children && obj.children.length > 0) {
        node.children = obj.children.map(child => buildNode(child, idCounter));
      }
      return node;
    };

    const rootNode = buildNode(model);
    setHierarchy(prev => ({ ...prev, [modelName]: rootNode }));
  };

  return (
    <div className="model-hierarchy">
      <h3>Model Hierarchy</h3>
      {models.length > 0 ? (
        <ul className="hierarchy-list">
          {models.map((model, index) => (
            <li key={index} className="hierarchy-model">
              <strong>{model.name}</strong>
              <ConfigurableModel
                modelPath={model.url}
                type={model.type}
                visible={false}
                onModelLoaded={(loadedModel) => extractHierarchy(loadedModel, model.name)}
              />
              {hierarchy[model.name] && (
                <ul className="hierarchy-tree">
                  <ModelHierarchyItem node={hierarchy[model.name]} />
                </ul>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No models loaded</p>
      )}
    </div>
  );
};

const ThreeViewer = ({ models = [], backgroundColor = '#e0e0e0', isGradient = false }) => {
    const getBackgroundStyle = () => {
      if (isGradient) {
        const { color1, color2 } = backgroundColor;
        return {
          background: `linear-gradient(to bottom, ${color1}, ${color2})`,
          width: '100%',
          height: '75vh'
        };
      }
      return {
        background: backgroundColor,
        width: '100%',
        height: '75vh'
      };
    };
  
    // Resize handler to force canvas size on mount and navigation
    const CanvasResizeHandler = () => {
      const { gl, size, setSize } = useThree();
      useEffect(() => {
        const container = gl.domElement.parentElement;
        const targetWidth = container.clientWidth;
        const targetHeight = window.innerHeight * 0.9; // 90vh in pixels
        if (size.width !== targetWidth || size.height !== targetHeight) {
          setSize(targetWidth, targetHeight); // Update Three.js size
          gl.setSize(targetWidth, targetHeight); // Force renderer size
        }
      }, [gl, size, setSize]);
      return null;
    };
  
    return (
      <div className="three-viewer-container">
        <Canvas
          style={getBackgroundStyle()}
          camera={{ position: [5, 5, 5], fov: 45 }}
          shadows={{ type: THREE.PCFSoftShadowMap }}
        >
          <CanvasResizeHandler />
          <SceneSetup models={models} />
        </Canvas>
        <ModelHierarchy models={models} />
      </div>
    );
  };
  
  export default ThreeViewer;