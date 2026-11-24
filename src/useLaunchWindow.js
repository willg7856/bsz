import { useMemo } from 'react'
import { formats, rewriteAll, windowFromFeed } from './launchWindow'
import { useOctopus } from './octopus'

/** { w, f, fix } — the window, its formats, and fix(dataOrText) to rewrite site text. */
export default function useLaunchWindow() {
  const feed = useOctopus()
  const w = windowFromFeed(feed)
  const key = `${w.from}-${w.to}-${w.year}`
  return useMemo(() => ({ w, f: formats(w), fix: (v) => rewriteAll(v, w) }), [key]) // eslint-disable-line react-hooks/exhaustive-deps
}
