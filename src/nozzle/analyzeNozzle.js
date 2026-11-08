// Estimate a rocket nozzle's internal geometry from a triangle mesh.
//
// Input: a flat array of triangle vertex positions (9 numbers per triangle),
// as produced by an STL file. Output: the nozzle axis, the internal bore
// profile along that axis, and estimates of the throat and exit diameters and
// the convergent / divergent half-angles. Units are whatever the mesh is in.
//
// Method:
//  1. Area-weighted surface moments give a centre and three principal axes.
//     The nozzle axis is the candidate around which cross-sections are most
//     circular.
//  2. The mesh is sliced perpendicular to the axis. In each slice the bore is
//     the loop of points closest to the axis; a circle fit gives its radius
//     (and re-centres the axis on the bore).
//  3. The throat is the narrowest bore slice. Each side of it is fitted with a
//     straight line (radius vs. distance) to get a half-angle. The side with
//     the shallower angle is taken as the divergent (exit) side.

const SLICES = 240

export class NozzleAnalysisError extends Error {}

// ── Small vector helpers ────────────────────────────────────────────────
const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2]
const norm = (a) => Math.hypot(a[0], a[1], a[2])
const scale = (a, s) => [a[0] * s, a[1] * s, a[2] * s]
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]
const unit = (a) => scale(a, 1 / norm(a))

function basisFor(u) {
  const helper = Math.abs(u[0]) < 0.9 ? [1, 0, 0] : [0, 1, 0]
  const e1 = unit(cross(u, helper))
  const e2 = cross(u, e1)
  return [e1, e2]
}

// Jacobi eigen-decomposition of a symmetric 3×3 matrix (row-major nested arrays).
function eigenSymmetric3(m) {
  const a = m.map((row) => row.slice())
  const v = [[1, 0, 0], [0, 1, 0], [0, 0, 1]]
  for (let sweep = 0; sweep < 50; sweep++) {
    const off = Math.abs(a[0][1]) + Math.abs(a[0][2]) + Math.abs(a[1][2])
    if (off < 1e-15) break
    for (const [p, q] of [[0, 1], [0, 2], [1, 2]]) {
      if (Math.abs(a[p][q]) < 1e-300) continue
      const theta = (a[q][q] - a[p][p]) / (2 * a[p][q])
      const t = Math.sign(theta || 1) / (Math.abs(theta) + Math.sqrt(theta * theta + 1))
      const c = 1 / Math.sqrt(t * t + 1)
      const s = t * c
      for (let k = 0; k < 3; k++) {
        const akp = a[k][p]
        const akq = a[k][q]
        a[k][p] = c * akp - s * akq
        a[k][q] = s * akp + c * akq
      }
      for (let k = 0; k < 3; k++) {
        const apk = a[p][k]
        const aqk = a[q][k]
        a[p][k] = c * apk - s * aqk
        a[q][k] = s * apk + c * aqk
      }
      for (let k = 0; k < 3; k++) {
        const vkp = v[k][p]
        const vkq = v[k][q]
        v[k][p] = c * vkp - s * vkq
        v[k][q] = s * vkp + c * vkq
      }
    }
  }
  return [0, 1, 2].map((i) => ({ value: a[i][i], vector: unit([v[0][i], v[1][i], v[2][i]]) }))
}

// Algebraic (Kåsa) least-squares circle fit. Returns { cx, cy, r } or null.
function fitCircle(xs, ys) {
  const n = xs.length
  if (n < 5) return null
  let mx = 0
  let my = 0
  for (let i = 0; i < n; i++) { mx += xs[i]; my += ys[i] }
  mx /= n; my /= n
  let suu = 0, svv = 0, suv = 0, suuu = 0, svvv = 0, suvv = 0, svuu = 0
  for (let i = 0; i < n; i++) {
    const u = xs[i] - mx
    const v = ys[i] - my
    suu += u * u; svv += v * v; suv += u * v
    suuu += u * u * u; svvv += v * v * v; suvv += u * v * v; svuu += v * u * u
  }
  const det = suu * svv - suv * suv
  if (Math.abs(det) < 1e-18) return null
  const b1 = 0.5 * (suuu + suvv)
  const b2 = 0.5 * (svvv + svuu)
  const uc = (b1 * svv - b2 * suv) / det
  const vc = (b2 * suu - b1 * suv) / det
  const r = Math.sqrt(uc * uc + vc * vc + (suu + svv) / n)
  return { cx: uc + mx, cy: vc + my, r }
}

function median(values) {
  const s = Float64Array.from(values).sort()
  const m = s.length >> 1
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2
}

// ── Step 1: surface moments ─────────────────────────────────────────────
function surfaceMoments(pos) {
  let area = 0
  const c = [0, 0, 0]
  const s2 = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
  for (let i = 0; i < pos.length; i += 9) {
    const a = [pos[i], pos[i + 1], pos[i + 2]]
    const b = [pos[i + 3], pos[i + 4], pos[i + 5]]
    const d = [pos[i + 6], pos[i + 7], pos[i + 8]]
    const ab = [b[0] - a[0], b[1] - a[1], b[2] - a[2]]
    const ad = [d[0] - a[0], d[1] - a[1], d[2] - a[2]]
    const ar = norm(cross(ab, ad)) / 2
    if (!(ar > 0)) continue
    const s = [a[0] + b[0] + d[0], a[1] + b[1] + d[1], a[2] + b[2] + d[2]]
    area += ar
    for (let j = 0; j < 3; j++) c[j] += (ar * s[j]) / 3
    for (let j = 0; j < 3; j++) {
      for (let k = 0; k < 3; k++) {
        s2[j][k] += (ar / 12) * (a[j] * a[k] + b[j] * b[k] + d[j] * d[k] + s[j] * s[k])
      }
    }
  }
  if (!(area > 0)) throw new NozzleAnalysisError('The model has no surface area.')
  const centre = scale(c, 1 / area)
  const cov = s2.map((row, j) => row.map((val, k) => val / area - centre[j] * centre[k]))
  return { centre, cov, area }
}

// How un-round the cross-sections are around a candidate axis (lower = rounder).
// Uses plane cuts rather than vertices: CAD exports often have vertices only at
// the ends of each cone, so vertex sampling sees nothing in between.
function roundnessScore(pos, centre, u) {
  const { slices } = sliceProfile(pos, centre, u, { count: 16, keepPoints: true })
  const TB = 16
  let total = 0
  let used = 0
  for (const sl of slices) {
    const maxR = new Float64Array(TB).fill(-1)
    for (let i = 0; i < sl.xs.length; i++) {
      const x = sl.xs[i]
      const y = sl.ys[i]
      const tb = Math.min(TB - 1, Math.floor(((Math.atan2(y, x) + Math.PI) / (2 * Math.PI)) * TB))
      const r = Math.hypot(x, y)
      if (r > maxR[tb]) maxR[tb] = r
    }
    if (maxR.some((r) => r < 0)) { total += 1; used++; continue }
    const mean = maxR.reduce((acc, r) => acc + r, 0) / TB
    const sd = Math.sqrt(maxR.reduce((acc, r) => acc + (r - mean) ** 2, 0) / TB)
    total += sd / mean
    used++
  }
  return used >= 3 ? total / used : Infinity
}

// ── Step 2: slice the mesh along the axis ───────────────────────────────
function sliceProfile(pos, centre, u, { count = SLICES, keepPoints = false } = {}) {
  const [e1, e2] = basisFor(u)
  const nTri = pos.length / 9
  const tz = new Float64Array(nTri * 3)
  const tx = new Float64Array(nTri * 3)
  const ty = new Float64Array(nTri * 3)
  let zMin = Infinity
  let zMax = -Infinity
  for (let v = 0; v < nTri * 3; v++) {
    const p = [pos[3 * v] - centre[0], pos[3 * v + 1] - centre[1], pos[3 * v + 2] - centre[2]]
    tz[v] = dot(p, u); tx[v] = dot(p, e1); ty[v] = dot(p, e2)
    if (tz[v] < zMin) zMin = tz[v]
    if (tz[v] > zMax) zMax = tz[v]
  }
  const length = zMax - zMin
  if (!(length > 0)) throw new NozzleAnalysisError('The model is flat.')
  const inset = length * 0.004
  const z0 = zMin + inset
  const dz = (length - 2 * inset) / (count - 1)
  const px = Array.from({ length: count }, () => [])
  const py = Array.from({ length: count }, () => [])

  const addEdge = (k, za, zb, ia, ib, zk) => {
    if ((za - zk) * (zb - zk) > 0 || za === zb) return
    const t = (zk - za) / (zb - za)
    px[k].push(tx[ia] + t * (tx[ib] - tx[ia]))
    py[k].push(ty[ia] + t * (ty[ib] - ty[ia]))
  }

  for (let t = 0; t < nTri; t++) {
    const i0 = 3 * t
    const i1 = i0 + 1
    const i2 = i0 + 2
    const za = tz[i0]
    const zb = tz[i1]
    const zc = tz[i2]
    const lo = Math.min(za, zb, zc)
    const hi = Math.max(za, zb, zc)
    if (hi === lo) continue
    const kStart = Math.max(0, Math.ceil((lo - z0) / dz))
    const kEnd = Math.min(count - 1, Math.floor((hi - z0) / dz))
    for (let k = kStart; k <= kEnd; k++) {
      const zk = z0 + k * dz
      addEdge(k, za, zb, i0, i1, zk)
      addEdge(k, zb, zc, i1, i2, zk)
      addEdge(k, zc, za, i2, i0, zk)
    }
  }

  const slices = []
  for (let k = 0; k < count; k++) {
    const xs = px[k]
    const ys = py[k]
    if (keepPoints) {
      if (xs.length >= 3) slices.push({ z: z0 + k * dz, xs, ys })
      continue
    }
    if (xs.length < 6) continue
    let minR = Infinity
    let maxR = 0
    const rs = xs.map((x, i) => Math.hypot(x, ys[i]))
    for (const r of rs) {
      if (r < minR) minR = r
      if (r > maxR) maxR = r
    }
    const tol = Math.max(minR * 0.04, (maxR - minR) * 0.02)
    const ix = []
    const iy = []
    const ir = []
    rs.forEach((r, i) => {
      if (r <= minR + tol) { ix.push(xs[i]); iy.push(ys[i]); ir.push(r) }
    })
    const fit = fitCircle(ix, iy)
    const goodFit = fit && Math.hypot(fit.cx, fit.cy) < Math.max(minR, maxR * 0.05)
    slices.push({
      z: z0 + k * dz,
      rIn: goodFit ? fit.r : median(ir),
      rOut: maxR,
      minR,
      cx: goodFit ? fit.cx : 0,
      cy: goodFit ? fit.cy : 0,
      n: ix.length,
    })
  }
  return { slices, e1, e2, zMin, zMax, length }
}

// ── Step 3: throat, sides and angles ────────────────────────────────────
function fitSide(points, throatR) {
  // points: [{ d, r }] ordered outward from the throat (d = distance from throat)
  if (points.length < 3) return { halfAngle: 0, endDiameter: 2 * throatR, length: 0, rise: 0 }
  // Keep the run where the bore keeps opening up.
  let peak = 0
  let peakR = throatR
  for (let i = 0; i < points.length; i++) {
    if (points[i].r >= peakR) { peakR = points[i].r; peak = i }
    else if (points[i].r < peakR - Math.max(0.03 * peakR, 1e-9)) break
  }
  const run = points.slice(0, peak + 1)
  const rise = peakR - throatR
  if (rise <= throatR * 0.02 || run.length < 3) {
    return { halfAngle: 0, endDiameter: 2 * peakR, length: run.at(-1)?.d ?? 0, rise }
  }
  const sel = run.filter((p) => p.r >= throatR + 0.15 * rise && p.r <= throatR + 0.85 * rise)
  const use = sel.length >= 3 ? sel : run
  const n = use.length
  const md = use.reduce((s, p) => s + p.d, 0) / n
  const mr = use.reduce((s, p) => s + p.r, 0) / n
  let sdd = 0
  let sdr = 0
  for (const p of use) { sdd += (p.d - md) ** 2; sdr += (p.d - md) * (p.r - mr) }
  const slope = sdd > 0 ? sdr / sdd : 0
  return {
    halfAngle: (Math.atan(Math.max(0, slope)) * 180) / Math.PI,
    endDiameter: 2 * peakR,
    length: run.at(-1).d,
    rise,
  }
}

function summarise(slices) {
  let tIdx = 0
  for (let i = 1; i < slices.length; i++) if (slices[i].rIn < slices[tIdx].rIn) tIdx = i
  const throatR = slices[tIdx].rIn
  // A straight throat: use the middle of the run within 0.5 % of the minimum.
  let a = tIdx
  let b = tIdx
  while (a > 0 && slices[a - 1].rIn <= throatR * 1.005) a--
  while (b < slices.length - 1 && slices[b + 1].rIn <= throatR * 1.005) b++
  const throatZ = (slices[a].z + slices[b].z) / 2

  const left = slices.slice(0, a + 1).reverse().map((s) => ({ d: slices[a].z - s.z, r: s.rIn }))
  const right = slices.slice(b).map((s) => ({ d: s.z - slices[b].z, r: s.rIn }))
  return { throatR, throatZ, throatLength: slices[b].z - slices[a].z, left: fitSide(left, throatR), right: fitSide(right, throatR) }
}

/**
 * @param {ArrayLike<number>} positions  9 numbers per triangle
 * @returns analysis result (see bottom of function)
 */
export function analyzeNozzle(positions) {
  if (!positions || positions.length < 9 * 20) {
    throw new NozzleAnalysisError('The model has too few triangles to be a nozzle.')
  }
  const { centre, cov } = surfaceMoments(positions)
  const candidates = eigenSymmetric3(cov).map((e) => e.vector)
  let best = null
  for (const u of candidates) {
    const score = roundnessScore(positions, centre, u)
    if (!best || score < best.score) best = { u, score }
  }
  let u = best.u
  let c = centre

  let cut = sliceProfile(positions, c, u)
  // Re-centre the axis on the bore using the circle-fit centres, then re-slice.
  const fitted = cut.slices.filter((s) => s.n >= 6)
  if (fitted.length >= 4) {
    const zs = fitted.map((s) => s.z)
    const meanZ = zs.reduce((s, z) => s + z, 0) / zs.length
    let szz = 0, sx = 0, sy = 0, szx = 0, szy = 0
    for (const s of fitted) {
      const dzv = s.z - meanZ
      szz += dzv * dzv; sx += s.cx; sy += s.cy; szx += dzv * s.cx; szy += dzv * s.cy
    }
    const n = fitted.length
    const ox = sx / n
    const oy = sy / n
    const tiltX = szz > 0 ? szx / szz : 0
    const tiltY = szz > 0 ? szy / szz : 0
    const { e1, e2 } = cut
    c = [0, 1, 2].map((j) => c[j] + e1[j] * ox + e2[j] * oy + u[j] * meanZ)
    u = unit([0, 1, 2].map((j) => u[j] + e1[j] * tiltX + e2[j] * tiltY))
    cut = sliceProfile(positions, c, u)
  }

  const { slices, length } = cut
  if (slices.length < 10) throw new NozzleAnalysisError('Could not slice the model along its axis.')
  const outerR = Math.max(...slices.map((s) => s.rOut))
  const solid = slices.filter((s) => s.minR < outerR * 0.02).length
  if (solid > slices.length * 0.25) {
    throw new NozzleAnalysisError('We could not find a hole through the middle of the model. Is it a nozzle with an open bore?')
  }

  // A closed solid (or a single tube wall) only ever cuts one surface per slice.
  const oneWall = slices.filter((s) => s.rIn > s.rOut * 0.97).length
  if (oneWall > slices.length * 0.25) {
    throw new NozzleAnalysisError('We could only find one surface. The model needs both the inside bore and the outside of the nozzle, as a closed solid.')
  }

  const sum = summarise(slices)
  // The divergent side is normally the longer, shallower cone.
  const leftIsExit = sum.left.halfAngle > 0 && (sum.right.halfAngle === 0 || sum.left.halfAngle < sum.right.halfAngle)
  const warnings = []
  if (best.score > 0.08) warnings.push('The model does not look round around a single axis, so these numbers may be off.')
  if (sum.left.halfAngle === 0 || sum.right.halfAngle === 0) {
    warnings.push('We only found one cone, so the throat may be at one end of the model.')
  }

  const build = (exitIsLeft) => {
    const exit = exitIsLeft ? sum.left : sum.right
    const inlet = exitIsLeft ? sum.right : sum.left
    return {
      throatDiameter: 2 * sum.throatR,
      exitDiameter: exit.endDiameter,
      inletDiameter: inlet.endDiameter,
      convergentHalfAngle: inlet.halfAngle,
      divergentHalfAngle: exit.halfAngle,
      expansionRatio: (exit.endDiameter / (2 * sum.throatR)) ** 2,
    }
  }

  // Profile from inlet (0) to exit (length).
  const zStart = leftIsExit ? cut.zMax : cut.zMin
  const sign = leftIsExit ? -1 : 1
  const profile = slices
    .map((s) => ({ z: (s.z - zStart) * sign, rIn: s.rIn, rOut: s.rOut }))
    .sort((p, q) => p.z - q.z)

  return {
    axis: u,
    centre: c,
    length,
    outerDiameter: 2 * outerR,
    throatPosition: (sum.throatZ - zStart) * sign,
    throatLength: sum.throatLength,
    estimate: build(leftIsExit),
    swapped: build(!leftIsExit),
    profile,
    roundness: best.score,
    warnings,
  }
}
