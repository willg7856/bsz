import { analyzeNozzle, NozzleAnalysisError } from './analyzeNozzle.js'
import { parseStl, StlError } from './parseStl.js'

self.onmessage = (event) => {
  try {
    const positions = parseStl(event.data)
    for (let i = 0; i < positions.length; i++) {
      if (!Number.isFinite(positions[i])) throw new StlError('The STL file contains invalid numbers.')
    }
    let analysis = null
    let analysisError = null
    try {
      analysis = analyzeNozzle(positions)
    } catch (error) {
      if (!(error instanceof NozzleAnalysisError)) throw error
      analysisError = error.message
    }
    self.postMessage({ positions, analysis, analysisError }, [positions.buffer])
  } catch (error) {
    self.postMessage({ error: error instanceof StlError ? error.message : 'We could not read that file.' })
  }
}
