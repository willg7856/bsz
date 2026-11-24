import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

// Interactive 3D view of the uploaded mesh. `section` cuts it in half along the
// nozzle axis so the bore is visible.
export default function NozzleViewer({ positions, axis, centre, section }) {
  const mount = useRef(null)
  const state = useRef(null)

  useEffect(() => {
    const el = mount.current
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.localClippingEnabled = true
    el.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.computeVertexNormals()
    geometry.computeBoundingSphere()
    const { center, radius } = geometry.boundingSphere

    const clip = new THREE.Plane(new THREE.Vector3(1, 0, 0), 0)
    const material = new THREE.MeshStandardMaterial({
      color: 0xe9e6df, roughness: 0.75, metalness: 0.05, side: THREE.DoubleSide, clippingPlanes: [],
    })
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    scene.add(new THREE.HemisphereLight(0xffffff, 0x30343a, 1.6))
    const key = new THREE.DirectionalLight(0xffffff, 2.2)
    key.position.set(1, 1.2, 1.5)
    scene.add(key)
    const rim = new THREE.DirectionalLight(0xff8a50, 0.8)
    rim.position.set(-1.5, -0.5, -1)
    scene.add(rim)

    let axisLine = null
    if (axis && centre) {
      const a = new THREE.Vector3(...axis)
      const c = new THREE.Vector3(...centre)
      const pts = [c.clone().addScaledVector(a, -radius * 1.3), c.clone().addScaledVector(a, radius * 1.3)]
      axisLine = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(pts),
        new THREE.LineDashedMaterial({ color: 0xff5a1f, dashSize: radius * 0.06, gapSize: radius * 0.04 }),
      )
      axisLine.computeLineDistances()
      scene.add(axisLine)
      // Cutting plane contains the axis.
      const helper = Math.abs(a.x) < 0.9 ? new THREE.Vector3(1, 0, 0) : new THREE.Vector3(0, 1, 0)
      clip.setFromNormalAndCoplanarPoint(new THREE.Vector3().crossVectors(a, helper).normalize(), c)
    }

    const camera = new THREE.PerspectiveCamera(35, 1, radius / 100, radius * 100)
    // View side-on to the axis, a little from above.
    const side = axis ? new THREE.Vector3(...axis).cross(new THREE.Vector3(0, 0, 1)) : new THREE.Vector3(1, 0, 0)
    if (side.lengthSq() < 1e-6) side.set(1, 0, 0)
    // Three.js hides the side of the cutting plane its normal points away from,
    // so look from that side to see straight into the cut-open bore.
    const viewDir = (clip.normal.lengthSq() ? clip.normal.clone().negate() : side.normalize())
      .add(new THREE.Vector3(0, 0, 0.3))
      .normalize()
    camera.position.copy(center).addScaledVector(viewDir, radius * 3.1)
    camera.lookAt(center)

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.target.copy(center)
    controls.enableDamping = true
    controls.enablePan = false
    controls.minDistance = radius * 1.2
    controls.maxDistance = radius * 10

    let frame = 0
    const render = () => {
      frame = requestAnimationFrame(render)
      controls.update()
      renderer.render(scene, camera)
    }
    const resize = () => {
      const w = el.clientWidth
      const h = el.clientHeight
      renderer.setSize(w, h, false)
      renderer.domElement.style.width = '100%'
      renderer.domElement.style.height = '100%'
      camera.aspect = w / Math.max(h, 1)
      camera.updateProjectionMatrix()
    }
    const observer = new ResizeObserver(resize)
    observer.observe(el)
    resize()
    render()

    state.current = { material, clip }
    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      controls.dispose()
      geometry.dispose()
      material.dispose()
      if (axisLine) { axisLine.geometry.dispose(); axisLine.material.dispose() }
      renderer.dispose()
      renderer.domElement.remove()
      state.current = null
    }
  }, [positions, axis, centre])

  useEffect(() => {
    const s = state.current
    if (!s) return
    s.material.clippingPlanes = section ? [s.clip] : []
    s.material.needsUpdate = true
  }, [section, positions, axis, centre])

  return <div className="nozzle-viewer" ref={mount} role="img" aria-label="3D view of your uploaded nozzle. Drag to rotate, scroll to zoom." />
}
