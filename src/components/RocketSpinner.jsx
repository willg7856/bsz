import { useEffect, useRef, useState } from 'react'

const FRAMES = Array.from({ length: 36 }, (_, i) => `/spin/frame-${String(i * 10).padStart(3, '0')}.png`)
const FPS = 24  // ms per frame → ~6 rpm

export default function RocketSpinner({ className = '', style = {} }) {
  const [frame, setFrame] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const loadedCount = useRef(0)

  useEffect(() => {
    FRAMES.forEach((src) => {
      const img = new Image()
      img.onload = () => {
        loadedCount.current += 1
        if (loadedCount.current === FRAMES.length) setLoaded(true)
      }
      img.src = src
    })
  }, [])

  useEffect(() => {
    if (!loaded) return
    const id = setInterval(() => setFrame((f) => (f + 1) % FRAMES.length), 1000 / FPS)
    return () => clearInterval(id)
  }, [loaded])

  return (
    <img
      src={FRAMES[frame]}
      className={className}
      style={{ display: 'block', ...style }}
      alt="STRAVOX rocket rotating"
    />
  )
}
