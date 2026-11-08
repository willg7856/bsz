import { lazy, Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { NOZZLE_ORDER, UNITS } from './order'
import NozzleProfile from './NozzleProfile'

const NozzleViewer = lazy(() => import('./NozzleViewer'))

const FIELDS = [
  { key: 'throat', label: 'Throat Ø', unit: 'mm', max: 1000 },
  { key: 'exit', label: 'Exit Ø', unit: 'mm', max: 1000 },
  { key: 'conv', label: 'Convergent half-angle', unit: '°', max: 90 },
  { key: 'div', label: 'Divergent half-angle', unit: '°', max: 90 },
]

const round = (n, dp) => Math.round(n * 10 ** dp) / 10 ** dp

// Accepts "8.2", "8,2" and " 8.2 ". Returns NaN for anything else.
const parseNum = (text) => {
  const t = String(text ?? '').trim().replace(',', '.')
  return /^\d*\.?\d+$|^\d+\.$/.test(t) ? Number(t) : NaN
}
const toNumbers = (v) => Object.fromEntries(Object.entries(v).map(([k, t]) => [k, parseNum(t)]))

function guessUnits(outerDiameter) {
  if (outerDiameter < 0.3) return 'm'
  if (outerDiameter < 8) return 'in'
  return 'mm'
}

function valuesFrom(est, toMm) {
  return {
    throat: String(round(est.throatDiameter * toMm, 2)),
    exit: String(round(est.exitDiameter * toMm, 2)),
    conv: String(round(est.convergentHalfAngle, 1)),
    div: String(round(est.divergentHalfAngle, 1)),
  }
}

function readOrderReturn() {
  try {
    const p = new URLSearchParams(window.location.search)
    return { status: p.get('order'), id: p.get('id') }
  } catch {
    return { status: null, id: null }
  }
}

export default function NozzleConfigurator() {
  const [file, setFile] = useState(null)
  const [loaded, setLoaded] = useState(null) // { positions, analysis, analysisError }
  const [loadError, setLoadError] = useState('')
  const [busy, setBusy] = useState(false)
  const [units, setUnits] = useState('mm')
  const [unitsGuessed, setUnitsGuessed] = useState(false)
  const [flipped, setFlipped] = useState(false)
  const [values, setValues] = useState(null)
  const [section, setSection] = useState(true)
  const [dragging, setDragging] = useState(false)
  const [submit, setSubmit] = useState({ state: 'idle', progress: 0, error: '' })
  const [returned] = useState(readOrderReturn)
  const [registered, setRegistered] = useState(null) // order id of a free pre-order
  const [makeTo, setMakeTo] = useState('')
  const inputRef = useRef(null)
  const workerRef = useRef(null)

  useEffect(() => () => workerRef.current?.terminate(), [])

  const analysis = loaded?.analysis
  const toMm = UNITS[units]
  const estimate = analysis ? (flipped ? analysis.swapped : analysis.estimate) : null
  const estValues = useMemo(() => (estimate ? valuesFrom(estimate, toMm) : null), [estimate, toMm])
  const nums = values ? toNumbers(values) : null
  const estNums = estValues ? toNumbers(estValues) : null
  const differs = (key) => Boolean(nums && estNums) && !(Math.abs(nums[key] - estNums[key]) < 1e-9)
  const edited = FIELDS.some(({ key }) => differs(key))

  function openFile(f) {
    if (!f) return
    setLoadError('')
    setSubmit({ state: 'idle', progress: 0, error: '' })
    if (!/\.stl$/i.test(f.name)) {
      setLoadError('Please choose an .stl file. Most CAD programs can export one (File → Export → STL).')
      return
    }
    if (f.size > NOZZLE_ORDER.maxFileBytes) {
      setLoadError(`That file is over ${NOZZLE_ORDER.maxFileBytes / 1024 / 1024} MB. Try exporting the STL at a lower resolution.`)
      return
    }
    setBusy(true)
    workerRef.current?.terminate()
    const worker = new Worker(new URL('./analyze.worker.js', import.meta.url), { type: 'module' })
    workerRef.current = worker
    worker.onmessage = ({ data }) => {
      setBusy(false)
      worker.terminate()
      if (data.error) {
        setLoadError(data.error)
        return
      }
      const guessed = data.analysis ? guessUnits(data.analysis.outerDiameter) : 'mm'
      setFile(f)
      setLoaded(data)
      setUnits(guessed)
      setUnitsGuessed(guessed !== 'mm')
      setFlipped(false)
      setValues(data.analysis ? valuesFrom(data.analysis.estimate, UNITS[guessed]) : { throat: '', exit: '', conv: '', div: '' })
    }
    worker.onerror = () => {
      setBusy(false)
      setLoadError('Something went wrong reading that file.')
    }
    f.arrayBuffer().then((buf) => worker.postMessage(buf, [buf]))
  }

  function changeUnits(next) {
    setUnits(next)
    setUnitsGuessed(false)
    if (analysis) setValues(valuesFrom(flipped ? analysis.swapped : analysis.estimate, UNITS[next]))
  }

  function swapEnds() {
    const next = !flipped
    setFlipped(next)
    setValues(valuesFrom(next ? analysis.swapped : analysis.estimate, toMm))
  }

  async function onSubmit(event) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const bad = FIELDS.find(({ key, max }) => !(nums[key] > 0 && nums[key] <= max))
    if (bad) {
      setSubmit({ state: 'idle', progress: 0, error: `Please enter a number for ${bad.label.toLowerCase()} (up to ${bad.max}${bad.unit === '°' ? '°' : ' mm'}).` })
      document.getElementById(`nz-${bad.key}`)?.focus()
      return
    }
    if (edited && !makeTo) {
      setSubmit({ state: 'idle', progress: 0, error: 'Please tell us whether to make it to your numbers or to your model.' })
      document.getElementById('nz-make-numbers')?.focus()
      return
    }
    if (nums.exit < nums.throat) {
      setSubmit({ state: 'idle', progress: 0, error: 'The exit diameter should be larger than the throat diameter.' })
      document.getElementById('nz-exit')?.focus()
      return
    }
    setSubmit({ state: 'uploading', progress: 0, error: '' })
    try {
      const { upload } = await import('@vercel/blob/client')
      const safe = file.name.replace(/\.stl$/i, '').replace(/[^\w.-]+/g, '-').slice(0, 80) || 'design'
      const blob = await upload(`nozzle-uploads/${safe}.stl`, file, {
        access: NOZZLE_ORDER.blobAccess,
        handleUploadUrl: '/api/nozzle-upload',
        contentType: 'model/stl',
        multipart: file.size > 8 * 1024 * 1024,
        onUploadProgress: ({ percentage }) => setSubmit((s) => ({ ...s, progress: percentage })),
      })
      setSubmit({ state: 'paying', progress: 100, error: '' })
      const res = await fetch(NOZZLE_ORDER.takingPayment ? '/api/nozzle-checkout' : '/api/nozzle-register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.get('name'),
          email: form.get('email'),
          notes: form.get('notes'),
          fileUrl: blob.url,
          fileName: file.name,
          units: 'mm',
          fileUnits: units,
          throatDiameter: nums.throat,
          exitDiameter: nums.exit,
          convergentHalfAngle: nums.conv,
          divergentHalfAngle: nums.div,
          edited,
          makeTo: edited ? makeTo : 'match',
          estimate: estValues
            ? { throatDiameter: estNums.throat, exitDiameter: estNums.exit, convergentHalfAngle: estNums.conv, divergentHalfAngle: estNums.div }
            : null,
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (NOZZLE_ORDER.takingPayment) {
        if (!res.ok || !data.url) throw new Error(data.error || 'We could not start the payment.')
        window.location.assign(data.url)
        return
      }
      if (!res.ok || !data.ok) throw new Error(data.error || 'We could not send your pre-order. Please try again.')
      setRegistered(data.orderId || '')
      setSubmit({ state: 'idle', progress: 0, error: '' })
      document.getElementById('custom')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } catch (error) {
      setSubmit({ state: 'idle', progress: 0, error: error?.message || 'Something went wrong. Please try again.' })
    }
  }

  const price = `$${NOZZLE_ORDER.amount} ${NOZZLE_ORDER.currency}`
  const working = submit.state !== 'idle'
  const free = !NOZZLE_ORDER.takingPayment

  if (registered !== null) {
    return (
      <div className="contact-success nozzle-paid">
        <span className="contact-success-icon" aria-hidden="true">✓</span>
        <h2>Pre-order received</h2>
        <p>
          Thanks{registered ? <> — your order number is <strong className="mono">{registered}</strong></> : null}. Nothing has been
          charged. We&apos;ve emailed you a confirmation, and we&apos;ll review your design and be in touch before we take any payment.
        </p>
        <a className="btn" href="/nozzles/preorder">Pre-order another</a>
      </div>
    )
  }

  if (returned.status === 'paid') {
    return (
      <div className="contact-success nozzle-paid">
        <span className="contact-success-icon" aria-hidden="true">✓</span>
        <h2>Pre-order received</h2>
        <p>
          Thanks{returned.id ? <> — your order number is <strong className="mono">{returned.id}</strong></> : null}. Stripe has
          emailed you a receipt. We will review your design and email you to confirm it, suggest changes, or refund you in full.
        </p>
        <a className="btn" href="/nozzles/preorder">Order another</a>
      </div>
    )
  }

  return (
    <div className="nozzle-config">
      {returned.status === 'cancelled' && !loaded ? (
        <p className="nozzle-note">Payment cancelled — nothing was charged. You can upload your design again below.</p>
      ) : null}

      <div
        className={`nozzle-drop${dragging ? ' is-dragging' : ''}${loaded ? ' is-compact' : ''}`}
        onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => { e.preventDefault(); setDragging(false); openFile(e.dataTransfer.files?.[0]) }}
      >
        <input ref={inputRef} type="file" accept=".stl,model/stl" hidden onChange={(e) => { openFile(e.target.files?.[0]); e.target.value = '' }} />
        {busy ? (
          <p className="nozzle-drop-title">Reading and measuring your model…</p>
        ) : loaded ? (
          <p className="nozzle-drop-title">
            <span className="mono">{file.name}</span>{' '}
            <button type="button" className="text-link" onClick={() => inputRef.current.click()}>Choose a different file</button>
          </p>
        ) : (
          <>
            <p className="nozzle-drop-title">Drop your nozzle STL here</p>
            <p className="nozzle-drop-sub">The model stays on your computer until you pre-order. Max {NOZZLE_ORDER.maxFileBytes / 1024 / 1024} MB.</p>
            <button type="button" className="btn btn-ink" onClick={() => inputRef.current.click()}>Choose STL file</button>
          </>
        )}
        {loadError ? <p className="contact-error nozzle-drop-error">{loadError}</p> : null}
      </div>

      {loaded ? (
        <div className="nozzle-workspace">
          <div className="nozzle-visuals">
            <div className="nozzle-viewer-wrap">
              <Suspense fallback={<div className="nozzle-viewer" />}>
                <NozzleViewer positions={loaded.positions} axis={analysis?.axis} centre={analysis?.centre} section={section && Boolean(analysis)} />
              </Suspense>
              <div className="nozzle-viewer-bar">
                <span>Drag to rotate · scroll to zoom</span>
                {analysis ? (
                  <label><input type="checkbox" checked={section} onChange={(e) => setSection(e.target.checked)} /> Cut in half</label>
                ) : null}
              </div>
            </div>
            {analysis ? (
              <NozzleProfile
                profile={analysis.profile.map((p) => ({ z: p.z * toMm, rIn: p.rIn * toMm, rOut: p.rOut * toMm }))}
                length={analysis.length * toMm}
                throatPosition={analysis.throatPosition * toMm}
                values={{ throat: nums.throat || 0, exit: nums.exit || 0 }}
                flipped={flipped}
              />
            ) : null}
          </div>

          <form className="contact-form nozzle-form" onSubmit={onSubmit}>
            <h2>Check the numbers</h2>
            {analysis ? (
              <p className="nozzle-form-intro">
                We measured these from your model. Check them against your design and change anything that is wrong.
              </p>
            ) : (
              <p className="contact-error">{loaded.analysisError} You can still enter your numbers by hand.</p>
            )}
            {analysis?.warnings.map((w) => <p className="nozzle-warning" key={w}>{w}</p>)}

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="nz-units">Model units</label>
                <select id="nz-units" value={units} onChange={(e) => changeUnits(e.target.value)}>
                  <option value="mm">Millimetres</option>
                  <option value="cm">Centimetres</option>
                  <option value="m">Metres</option>
                  <option value="in">Inches</option>
                </select>
              </div>
              {analysis ? (
                <div className="form-group nozzle-swap">
                  <span className="nozzle-size">
                    {round(analysis.length * toMm, 1)} mm long · {round(analysis.outerDiameter * toMm, 1)} mm outside Ø
                  </span>
                  <button type="button" className="text-link" onClick={swapEnds}>Exit is on the other end</button>
                </div>
              ) : null}
            </div>
            {unitsGuessed ? <p className="nozzle-warning">Your model is small in millimetres, so we guessed {units === 'in' ? 'inches' : 'metres'}. Change this if it is wrong.</p> : null}

            <div className="nozzle-numbers">
              {FIELDS.map(({ key, label, unit }) => (
                <div className="form-group" key={key}>
                  <label htmlFor={`nz-${key}`}>{label} <span className="nozzle-unit">({unit})</span></label>
                  <input
                    id={`nz-${key}`}
                    type="text"
                    inputMode="decimal"
                    autoComplete="off"
                    spellCheck={false}
                    required
                    aria-invalid={values[key] !== '' && Number.isNaN(nums[key])}
                    value={values[key]}
                    onChange={(e) => {
                      const text = e.target.value
                      setValues((v) => ({ ...v, [key]: text }))
                    }}
                  />
                  {estValues && differs(key) ? (
                    <span className="nozzle-was">Measured {estValues[key]}{unit === '°' ? '°' : ' mm'}</span>
                  ) : null}
                </div>
              ))}
            </div>
            {edited ? (
              <button type="button" className="text-link nozzle-reset" onClick={() => setValues(estValues)}>Reset to measured values</button>
            ) : null}
            <p className={`nozzle-help${edited ? '' : ' nozzle-help-gap'}`}>Half-angles are measured from the nozzle's centre line to the wall.</p>
            {edited ? (
              <fieldset className="nozzle-maketo">
                <legend>Your numbers don&apos;t match what we measured from your model. Which should we make?</legend>
                <label>
                  <input id="nz-make-numbers" type="radio" name="make_to" value="numbers" checked={makeTo === 'numbers'} onChange={() => setMakeTo('numbers')} />
                  <span><strong>My numbers.</strong> The model is out of date. Make it to the numbers I entered.</span>
                </label>
                <label>
                  <input type="radio" name="make_to" value="model" checked={makeTo === 'model'} onChange={() => setMakeTo('model')} />
                  <span><strong>My model.</strong> Your measurement was off. Make it exactly like the file.</span>
                </label>
              </fieldset>
            ) : null}

            <h2 className="nozzle-form-h2">Your details</h2>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="nz-name">Name</label>
                <input id="nz-name" name="name" type="text" required autoComplete="name" />
              </div>
              <div className="form-group">
                <label htmlFor="nz-email">Email</label>
                <input id="nz-email" name="email" type="email" required autoComplete="email" />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="nz-notes">Notes (optional)</label>
              <textarea id="nz-notes" name="notes" rows={3} maxLength={480} placeholder="Motor, propellant, chamber pressure, anything else we should know." />
            </div>
            <label className="nozzle-agree">
              <input type="checkbox" required />
              <span>
                {free
                  ? <>I understand this is a free pre-order. Nothing is charged now. Beyond Stage Zero will review my design, may suggest changes, and will email me with the price before taking any payment.</>
                  : <>I understand this is a pre-order. Beyond Stage Zero will review my design and may suggest changes. If it can&apos;t be made, I get a full refund.</>}
              </span>
            </label>

            {submit.error ? <p className="contact-error">{submit.error}</p> : null}
            <button className="btn btn-primary nozzle-pay" type="submit" disabled={working}>
              {submit.state === 'uploading'
                ? `Uploading your model… ${Math.round(submit.progress)}%`
                : submit.state === 'paying'
                  ? (free ? 'Sending your pre-order…' : 'Opening secure checkout…')
                  : (free ? 'Pre-order for free →' : `Pre-order for ${price} →`)}
            </button>
            <p className="nozzle-help">
              {free
                ? 'No payment now. We email you the price before anything is charged.'
                : 'Payment and your shipping address are taken by Stripe. Stripe shows the price in your own currency.'}
            </p>
          </form>
        </div>
      ) : (
        <p className="nozzle-help nozzle-no-stl">
          No STL file? Send us a drawing on the <Link to="/contact?reason=Ceramic%20nozzle%20enquiries">contact page</Link> instead.
        </p>
      )}
    </div>
  )
}
