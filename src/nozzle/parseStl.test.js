import { test } from 'node:test'
import assert from 'node:assert/strict'
import { parseStl, StlError } from './parseStl.js'

test('reads binary STL', () => {
  const buf = new ArrayBuffer(84 + 2 * 50)
  const v = new DataView(buf)
  v.setUint32(80, 2, true)
  for (let t = 0; t < 2; t++) for (let j = 0; j < 9; j++) v.setFloat32(84 + t * 50 + 12 + j * 4, t * 10 + j, true)
  const out = parseStl(buf)
  assert.equal(out.length, 18)
  assert.equal(out[0], 0)
  assert.equal(out[17], 18)
})

test('reads ASCII STL', () => {
  const txt = 'solid x\nfacet normal 0 0 1\nouter loop\nvertex 0 0 0\nvertex 1 0 0\nvertex 0 1.5e1 0\nendloop\nendfacet\nendsolid x\n'
  const out = parseStl(new TextEncoder().encode(txt).buffer)
  assert.deepEqual(Array.from(out), [0, 0, 0, 1, 0, 0, 0, 15, 0])
})

test('rejects other files', () => {
  assert.throws(() => parseStl(new TextEncoder().encode('ISO-10303-21; HEADER; this is a STEP file').buffer), StlError)
})
