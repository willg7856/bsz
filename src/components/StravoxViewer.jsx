import { Suspense, useRef } from 'react'
import { Canvas, useLoader, useFrame } from '@react-three/fiber'
import { OrbitControls, Stage } from '@react-three/drei'
import { STLLoader } from 'three/addons/loaders/STLLoader.js'

function Model() {
  const geom = useLoader(STLLoader, '/stravox.stl')
  const ref = useRef()
  useFrame((_, delta) => { ref.current.rotation.y += delta * 0.3 })
  return (
    <mesh ref={ref} geometry={geom} castShadow>
      <meshStandardMaterial color="#b0b8c8" metalness={0.5} roughness={0.4} />
    </mesh>
  )
}

function Loader() {
  return (
    <mesh>
      <boxGeometry args={[0]} />
    </mesh>
  )
}

export default function StravoxViewer() {
  return (
    <div className="stl-viewer">
      <Canvas camera={{ position: [0, 200, 500], fov: 40 }} shadows>
        <ambientLight intensity={0.5} />
        <directionalLight position={[200, 400, 200]} intensity={1.5} castShadow />
        <directionalLight position={[-200, -100, -200]} intensity={0.3} />
        <Suspense fallback={<Loader />}>
          <Stage environment="city" intensity={0.4} adjustCamera={false}>
            <Model />
          </Stage>
        </Suspense>
        <OrbitControls enablePan={false} minDistance={200} maxDistance={1200} autoRotate autoRotateSpeed={1.5} />
      </Canvas>
      <p className="stl-hint">Drag to rotate · Scroll to zoom</p>
    </div>
  )
}
