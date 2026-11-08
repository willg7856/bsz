// Run with: npm test
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { analyzeNozzle, NozzleAnalysisError } from './analyzeNozzle.js'

const rad = (deg) => (deg * Math.PI) / 180

// Build a conical C-D bore profile: [{ z, r }] from inlet to exit.
function conical({ inletR, throatR, exitR, conv, div, throatLen = 0, entryLen = 0, rounded = 0, steps = 40 }) {
  const pts = []
  let z = 0
  if (entryLen) { pts.push({ z, r: inletR }); z += entryLen }
  const convLen = (inletR - throatR) / Math.tan(rad(conv))
  const divLen = (exitR - throatR) / Math.tan(rad(div))
  for (let i = 0; i <= steps; i++) pts.push({ z: z + (convLen * i) / steps, r: inletR - ((inletR - throatR) * i) / steps })
  z += convLen
  if (throatLen) { z += throatLen; pts.push({ z, r: throatR }) }
  for (let i = 1; i <= steps; i++) pts.push({ z: z + (divLen * i) / steps, r: throatR + ((exitR - throatR) * i) / steps })
  if (rounded) {
    // Blend the throat corner: raise radii within `rounded` of the throat.
    const zt = (entryLen || 0) + convLen + throatLen / 2
    for (const p of pts) {
      const d = Math.abs(p.z - zt)
      if (d < rounded) p.r = Math.max(p.r, throatR + (rounded - Math.sqrt(rounded * rounded - d * d)) * 0.5)
    }
  }
  return pts
}

// Revolve an inner profile and an outer radius function into a closed triangle mesh.
function revolve(inner, outerR, segs = 64) {
  const tris = []
  const ring = (z, r, k) => {
    const a = (2 * Math.PI * k) / segs
    return [r * Math.cos(a), r * Math.sin(a), z]
  }
  const push = (a, b, c) => tris.push(...a, ...b, ...c)
  const outerAt = typeof outerR === 'function' ? outerR : () => outerR
  const zEnd = inner.at(-1).z
  for (let i = 0; i < inner.length - 1; i++) {
    const p = inner[i]
    const q = inner[i + 1]
    for (let k = 0; k < segs; k++) {
      push(ring(p.z, p.r, k), ring(q.z, q.r, k), ring(q.z, q.r, k + 1))
      push(ring(p.z, p.r, k), ring(q.z, q.r, k + 1), ring(p.z, p.r, k + 1))
      // outer surface at the same z stations
      push(ring(p.z, outerAt(p.z), k), ring(q.z, outerAt(q.z), k + 1), ring(q.z, outerAt(q.z), k))
      push(ring(p.z, outerAt(p.z), k), ring(p.z, outerAt(p.z), k + 1), ring(q.z, outerAt(q.z), k + 1))
    }
  }
  for (const [z, r] of [[0, inner[0].r], [zEnd, inner.at(-1).r]]) {
    for (let k = 0; k < segs; k++) {
      push(ring(z, r, k), ring(z, outerAt(z), k), ring(z, outerAt(z), k + 1))
      push(ring(z, r, k), ring(z, outerAt(z), k + 1), ring(z, r, k + 1))
    }
  }
  return tris
}

// Deterministic pseudo-random rotation + translation (+ optional scale).
function transform(tris, seed, s = 1) {
  let x = seed
  const rnd = () => ((x = (x * 16807) % 2147483647) / 2147483647)
  const [u1, u2, u3] = [rnd(), rnd(), rnd()]
  const q = [
    Math.sqrt(1 - u1) * Math.sin(2 * Math.PI * u2), Math.sqrt(1 - u1) * Math.cos(2 * Math.PI * u2),
    Math.sqrt(u1) * Math.sin(2 * Math.PI * u3), Math.sqrt(u1) * Math.cos(2 * Math.PI * u3),
  ]
  const [qx, qy, qz, qw] = q
  const m = [
    [1 - 2 * (qy * qy + qz * qz), 2 * (qx * qy - qz * qw), 2 * (qx * qz + qy * qw)],
    [2 * (qx * qy + qz * qw), 1 - 2 * (qx * qx + qz * qz), 2 * (qy * qz - qx * qw)],
    [2 * (qx * qz - qy * qw), 2 * (qy * qz + qx * qw), 1 - 2 * (qx * qx + qy * qy)],
  ]
  const t = [rnd() * 200 - 100, rnd() * 200 - 100, rnd() * 200 - 100]
  const out = new Float32Array(tris.length)
  for (let i = 0; i < tris.length; i += 3) {
    for (let j = 0; j < 3; j++) {
      out[i + j] = (m[j][0] * tris[i] + m[j][1] * tris[i + 1] + m[j][2] * tris[i + 2] + t[j]) * s
    }
  }
  return out
}

function near(actual, expected, tol, label) {
  assert.ok(Math.abs(actual - expected) <= tol, `${label}: got ${actual.toFixed(3)}, expected ${expected} ± ${tol}`)
}

function check(result, want, { dTol = 0.02, aTol = 1 } = {}) {
  const e = result.estimate
  near(e.throatDiameter, want.throat, want.throat * dTol, 'throat Ø')
  near(e.exitDiameter, want.exit, want.exit * dTol, 'exit Ø')
  near(e.convergentHalfAngle, want.conv, aTol, 'convergent half-angle')
  near(e.divergentHalfAngle, want.div, aTol, 'divergent half-angle')
}

test('conical C-D nozzle at a random orientation', () => {
  const mesh = transform(revolve(conical({ inletR: 14, throatR: 4, exitR: 10, conv: 30, div: 12, throatLen: 2 }), 18), 7)
  check(analyzeNozzle(mesh), { throat: 8, exit: 20, conv: 30, div: 12 })
})

test('CAD-style tessellation: vertices only at the cone ends', () => {
  const mesh = transform(revolve(conical({ inletR: 14, throatR: 4, exitR: 10, conv: 30, div: 12, throatLen: 2, steps: 1 }), 18, 96), 21)
  check(analyzeNozzle(mesh), { throat: 8, exit: 20, conv: 30, div: 12 })
})

test('CAD-style short, wide nozzle', () => {
  const mesh = transform(revolve(conical({ inletR: 20, throatR: 6, exitR: 10, conv: 60, div: 20, steps: 1 }), 30, 96), 4321)
  check(analyzeNozzle(mesh), { throat: 12, exit: 20, conv: 60, div: 20 })
})

test('exit end first in the file (flipped)', () => {
  const prof = conical({ inletR: 15, throatR: 5, exitR: 12, conv: 45, div: 15 })
  const L = prof.at(-1).z
  const flipped = prof.map((p) => ({ z: L - p.z, r: p.r })).reverse()
  check(analyzeNozzle(transform(revolve(flipped, 20), 99)), { throat: 10, exit: 24, conv: 45, div: 15 })
})

test('short, wide nozzle (shorter than it is wide)', () => {
  const mesh = transform(revolve(conical({ inletR: 20, throatR: 6, exitR: 10, conv: 60, div: 20 }), 30), 1234)
  check(analyzeNozzle(mesh), { throat: 12, exit: 20, conv: 60, div: 20 })
})

test('entry counterbore and a grooved outside', () => {
  const prof = conical({ inletR: 13, throatR: 4.5, exitR: 11, conv: 35, div: 13, entryLen: 6, throatLen: 3 })
  const outer = (z) => (z > 4 && z < 8 ? 15.5 : 17)
  check(analyzeNozzle(transform(revolve(prof, outer), 555)), { throat: 9, exit: 22, conv: 35, div: 13 })
})

test('coarse tessellation (24 segments)', () => {
  const mesh = transform(revolve(conical({ inletR: 14, throatR: 4, exitR: 10, conv: 30, div: 12 }), 18, 24), 42)
  check(analyzeNozzle(mesh), { throat: 8, exit: 20, conv: 30, div: 12 }, { dTol: 0.03, aTol: 1.5 })
})

test('rounded throat still gives close angles', () => {
  // Smooth throat: r = rt + sqrt((s·d)² + c²) − c, with a different slope s on each side.
  const rt = 4
  const c = 1.5
  const s1 = Math.tan(rad(30))
  const s2 = Math.tan(rad(12))
  const pts = []
  for (let i = 0; i <= 160; i++) {
    const z = (i / 160) * 45
    const d = z - 15
    const sl = d < 0 ? s1 : s2
    pts.push({ z, r: rt + Math.sqrt((sl * d) ** 2 + c * c) - c })
  }
  const mesh = transform(revolve(pts, 18), 3)
  check(analyzeNozzle(mesh), { throat: 8, exit: 2 * pts.at(-1).r, conv: 30, div: 12 }, { dTol: 0.03, aTol: 1.5 })
})

test('model in inches scales the diameters', () => {
  const mesh = transform(revolve(conical({ inletR: 14, throatR: 4, exitR: 10, conv: 30, div: 12 }), 18), 77, 1 / 25.4)
  check(analyzeNozzle(mesh), { throat: 8 / 25.4, exit: 20 / 25.4, conv: 30, div: 12 })
})

test('swapped estimate exchanges inlet and exit', () => {
  const r = analyzeNozzle(transform(revolve(conical({ inletR: 14, throatR: 4, exitR: 10, conv: 30, div: 12 }), 18), 8))
  near(r.swapped.exitDiameter, 28, 0.6, 'swapped exit Ø')
  near(r.swapped.divergentHalfAngle, 30, 1, 'swapped divergent')
})

test('a solid cylinder is rejected', () => {
  const tris = []
  const segs = 48
  for (let k = 0; k < segs; k++) {
    const a = (2 * Math.PI * k) / segs
    const b = (2 * Math.PI * (k + 1)) / segs
    const p = (ang, z) => [10 * Math.cos(ang), 10 * Math.sin(ang), z]
    tris.push(...p(a, 0), ...p(b, 0), ...p(b, 30), ...p(a, 0), ...p(b, 30), ...p(a, 30))
    tris.push(0, 0, 0, ...p(b, 0), ...p(a, 0), 0, 0, 30, ...p(a, 30), ...p(b, 30))
  }
  assert.throws(() => analyzeNozzle(transform(tris, 5)), NozzleAnalysisError)
})
