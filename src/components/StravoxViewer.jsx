import { Suspense, useRef } from 'react'
import { Canvas, useLoader } from '@react-three/fiber'
import { OrbitControls, Center, Environment } from '@react-three/drei'
import { STLLoader } from 'three/addons/loaders/STLLoader.js'

function Model() {
  const geom = useLoader(STLLoader, '/stravox.stl')
  geom.computeBoundingBox()
  geom.center()
  return (
    <mesh geometry={geom} castShadow receiveShadow>
      <meshStandardMaterial color="#b8c4d4" metalness={0.5} roughness={0.4} />
    </mesh>
  )
}

export default function StravoxViewer() {
  return (
    <div style={{ width: '100%', height: '100%', minHeight: 400 }}>
      <Canvas camera={{ fov: 45, position: [0, 0, 1] }} shadows>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 10, 5]} intensity={1.5} castShadow />
        <directionalLight position={[-5, -5, -5]} intensity={0.3} />
        <Environment preset="city" />
        <Suspense fallback={null}>
          <Center>
            <Model />
          </Center>
        </Suspense>
        <OrbitControls
          enablePan={false}
          autoRotate
          autoRotateSpeed={1.2}
          minDistance={0.5}
          maxDistance={10}
        />
      </Canvas>
    </div>
  )
}
