// Minimal STL reader (binary or ASCII) → Float32Array, 9 numbers per triangle.
export class StlError extends Error {}

export function parseStl(buffer) {
  const bytes = new Uint8Array(buffer)
  if (bytes.length < 15) throw new StlError('The file is empty.')
  if (bytes.length >= 84) {
    const view = new DataView(buffer)
    const count = view.getUint32(80, true)
    if (84 + count * 50 === bytes.length) {
      const out = new Float32Array(count * 9)
      for (let t = 0; t < count; t++) {
        const base = 84 + t * 50 + 12
        for (let j = 0; j < 9; j++) out[t * 9 + j] = view.getFloat32(base + j * 4, true)
      }
      return out
    }
  }
  const head = new TextDecoder().decode(bytes.subarray(0, Math.min(bytes.length, 512)))
  if (!/^\s*solid/i.test(head)) throw new StlError('This does not look like an STL file.')
  const textBody = new TextDecoder().decode(bytes)
  const re = /vertex\s+([-+\d.eE]+)\s+([-+\d.eE]+)\s+([-+\d.eE]+)/g
  const values = []
  let m
  while ((m = re.exec(textBody))) values.push(+m[1], +m[2], +m[3])
  const usable = values.length - (values.length % 9)
  if (usable < 9) throw new StlError('No triangles found in the STL file.')
  return Float32Array.from(values.slice(0, usable))
}
