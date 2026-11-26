import { useEffect, useMemo, useState } from 'react'
import { LaunchArt, TestStandArt, OrbitArt, Mark } from './Art.jsx'

/*
  Where applications go. Set SUBMIT_ENDPOINT to a form backend URL
  (Formspree, a Google Apps Script, your own API...) that accepts JSON POSTs.
  Left empty, the page keeps the application in this browser and shows the
  confirmation screen, which is handy for previewing.
*/
const SUBMIT_ENDPOINT = ''
const STORAGE_KEY = 'bsz-apply-v1'

const TEAMS = [
  { id: 'propulsion', label: 'Propulsion', hint: 'Injectors, chambers, nozzles' },
  { id: 'fluids', label: 'Fluids & ground systems', hint: 'Plumbing, valves, test stands' },
  { id: 'structures', label: 'Structures', hint: 'Airframes, tanks, machining' },
  { id: 'avionics', label: 'Avionics', hint: 'PCBs, sensors, flight computers' },
  { id: 'software', label: 'Software & GNC', hint: 'Firmware, telemetry, sims' },
  { id: 'recovery', label: 'Recovery', hint: 'Parachutes, deployment' },
  { id: 'ops', label: 'Ops & media', hint: 'Logistics, sponsors, story' },
]

const SKILLS = [
  'CAD (SolidWorks, Fusion, Onshape)',
  'Machining or fabrication',
  'Soldering and wiring',
  'Programming',
  'Circuit / PCB design',
  'Fluids or thermo coursework',
  'Writing and documentation',
]

const HOURS = ['Under 5', '5–10', '10–15', '15+']

const PHASES = [
  {
    title: 'Read the brief',
    blurb: 'We build and fire real hardware. Before anything else, make sure that is what you want to be doing.',
    items: [
      { id: 'brief-mission', type: 'check', title: 'I read what Beyond Stage Zero builds', desc: 'Liquid engines, the test stands that fire them, and the rockets they fly on. In that order.' },
      { id: 'brief-hands', type: 'check', title: 'I want to work on hardware, not just watch', desc: 'Every member ships parts. Your first one usually comes within a month.' },
      { id: 'brief-learn', type: 'check', title: 'I am okay not knowing everything yet', desc: 'Nobody arrives knowing how to build an injector. We teach, you ask.' },
    ],
  },
  {
    title: 'About you',
    blurb: 'The basics, so we can get back to you.',
    items: [
      { id: 'name', type: 'text', title: 'Full name', placeholder: 'Ada Lovelace', autoComplete: 'name' },
      { id: 'email', type: 'email', title: 'Email', placeholder: 'you@school.edu', autoComplete: 'email' },
      { id: 'school', type: 'text', title: 'School or organization', placeholder: 'Where you study or work', autoComplete: 'organization' },
      { id: 'year', type: 'text', title: 'Year or role', placeholder: 'Sophomore, grad student, engineer...' },
    ],
  },
  {
    title: 'Pick your team',
    blurb: 'Choose every team you would want to work on. You can move later; most people do.',
    items: [
      { id: 'teams', type: 'multi', title: 'Teams I am interested in', desc: 'Pick at least one.', options: TEAMS },
    ],
  },
  {
    title: 'Show us what you have built',
    blurb: 'Projects, not grades. A go-kart, a website, a broken drone you fixed: all of it counts.',
    items: [
      { id: 'skills', type: 'multi', title: 'Things I have done before', desc: 'Optional. Tick anything you have touched, even once.', options: SKILLS.map((s) => ({ id: s, label: s })), optional: true },
      { id: 'built', type: 'textarea', title: 'Tell us about something you built', desc: 'What it was, what broke, what you did about it. A few sentences is plenty.', min: 40 },
      { id: 'why', type: 'textarea', title: 'Why rockets? Why now?', desc: 'What pulled you here?', min: 20 },
      { id: 'link', type: 'url', title: 'Portfolio, GitHub or LinkedIn', placeholder: 'https://', optional: true },
    ],
  },
  {
    title: 'Commit',
    blurb: 'Hot fires are scheduled around the team. We need to know you will be there.',
    items: [
      { id: 'hours', type: 'single', title: 'Hours per week I can give', options: HOURS.map((h) => ({ id: h, label: h })) },
      { id: 'safe-checklist', type: 'check', title: 'I will follow the checklist, every time', desc: 'No step gets skipped because the last ten tests went fine.' },
      { id: 'safe-stop', type: 'check', title: 'I will call a stop if something looks wrong', desc: 'Anyone can halt a test. Nobody gets blamed for doing it.' },
      { id: 'safe-zone', type: 'check', title: 'I will stay behind the line during pressurization', desc: 'Pressurized hardware is treated as live from the first PSI.' },
    ],
  },
]

const ALL_ITEMS = PHASES.flatMap((p, pi) => p.items.map((it) => ({ ...it, phase: pi })))
const REQUIRED = ALL_ITEMS.filter((it) => !it.optional)

function isDone(item, v) {
  switch (item.type) {
    case 'check':
      return v === true
    case 'multi':
      return Array.isArray(v) && v.length > 0
    case 'single':
      return typeof v === 'string' && v.length > 0
    case 'email':
      return typeof v === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())
    case 'url':
      return typeof v === 'string' && /^https?:\/\/\S+\.\S+/.test(v.trim())
    case 'textarea':
      return typeof v === 'string' && v.trim().length >= (item.min ?? 1)
    default:
      return typeof v === 'string' && v.trim().length > 1
  }
}

function load() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? {}
  } catch {
    return {}
  }
}

function Dot({ on, small }) {
  return (
    <span className={`dot${on ? ' on' : ''}${small ? ' small' : ''}`} aria-hidden="true">
      <span className="dot-glyph">//</span>
    </span>
  )
}

function Item({ item, value, onChange, isNext }) {
  const done = isDone(item, value)
  const cls = `item${done ? ' done' : ''}${isNext ? ' next' : ''}`
  const inputId = `f-${item.id}`

  if (item.type === 'check') {
    return (
      <li className={cls} id={`item-${item.id}`}>
        <button type="button" role="checkbox" aria-checked={done} className="item-hit" onClick={() => onChange(!value)}>
          <Dot on={done} />
          <span className="item-body">
            <span className="item-title">{item.title}</span>
            {item.desc && <span className="item-desc">{item.desc}</span>}
            {isNext && <span className="tag">Next</span>}
          </span>
        </button>
      </li>
    )
  }

  if (item.type === 'multi' || item.type === 'single') {
    const multi = item.type === 'multi'
    const selected = multi ? value ?? [] : value
    const toggle = (id) => {
      if (multi) onChange(selected.includes(id) ? selected.filter((x) => x !== id) : [...selected, id])
      else onChange(selected === id ? '' : id)
    }
    return (
      <li className={cls} id={`item-${item.id}`}>
        <div className="item-row">
          <Dot on={done} />
          <div className="item-body">
            <span className="item-title" id={`${inputId}-label`}>
              {item.title} {item.optional && <em className="opt">optional</em>}
            </span>
            {item.desc && <span className="item-desc">{item.desc}</span>}
            {isNext && <span className="tag">Next</span>}
            <div className={`chips${item.options[0]?.hint ? ' chips-rich' : ''}`} role={multi ? 'group' : 'radiogroup'} aria-labelledby={`${inputId}-label`}>
              {item.options.map((o) => {
                const on = multi ? selected.includes(o.id) : selected === o.id
                return (
                  <button
                    type="button"
                    key={o.id}
                    role={multi ? 'checkbox' : 'radio'}
                    aria-checked={on}
                    className={`chip${on ? ' on' : ''}`}
                    onClick={() => toggle(o.id)}
                  >
                    <Dot on={on} small />
                    <span>
                      <span className="chip-label">{o.label}</span>
                      {o.hint && <span className="chip-hint">{o.hint}</span>}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </li>
    )
  }

  const Field = item.type === 'textarea' ? 'textarea' : 'input'
  const len = (value ?? '').trim().length
  return (
    <li className={cls} id={`item-${item.id}`}>
      <div className="item-row">
        <Dot on={done} />
        <div className="item-body">
          <label className="item-title" htmlFor={inputId}>
            {item.title} {item.optional && <em className="opt">optional</em>}
          </label>
          {item.desc && <span className="item-desc">{item.desc}</span>}
          {isNext && <span className="tag">Next</span>}
          <Field
            id={inputId}
            className="field"
            type={item.type === 'textarea' ? undefined : item.type}
            rows={item.type === 'textarea' ? 4 : undefined}
            placeholder={item.placeholder}
            autoComplete={item.autoComplete}
            value={value ?? ''}
            onChange={(e) => onChange(e.target.value)}
          />
          {item.type === 'textarea' && item.min && !done && (
            <span className="hint mono">{Math.max(0, item.min - len)} more characters</span>
          )}
        </div>
      </div>
    </li>
  )
}

export default function Apply() {
  const [values, setValues] = useState(() => load().values ?? {})
  const [submitted, setSubmitted] = useState(() => load().submitted ?? false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ values, submitted }))
    } catch {
      /* storage unavailable; the form still works */
    }
  }, [values, submitted])

  const set = (id) => (v) => setValues((prev) => ({ ...prev, [id]: v }))

  const doneCount = REQUIRED.filter((it) => isDone(it, values[it.id])).length
  const next = REQUIRED.find((it) => !isDone(it, values[it.id]))
  const ready = !next

  const phaseProgress = useMemo(
    () =>
      PHASES.map((_, pi) => {
        const req = REQUIRED.filter((it) => it.phase === pi)
        return req.filter((it) => isDone(it, values[it.id])).length / req.length
      }),
    [values],
  )

  const jumpTo = (id) => {
    document.getElementById(`item-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  async function submit(e) {
    e.preventDefault()
    if (!ready) return jumpTo(next.id)
    setError('')
    if (SUBMIT_ENDPOINT) {
      setSending(true)
      try {
        const res = await fetch(SUBMIT_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ ...values, submittedAt: new Date().toISOString() }),
        })
        if (!res.ok) throw new Error(String(res.status))
      } catch {
        setSending(false)
        setError('That did not go through. Check your connection and try again.')
        return
      }
      setSending(false)
    }
    setSubmitted(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="page">
      <header className="topbar">
        <a href="/" className="brand">
          <Mark className="brand-mark" />
          <span>Beyond Stage Zero</span>
        </a>
        <span className="mono topbar-status">
          <span className="pulse" /> Applications open
        </span>
      </header>

      <section className="hero">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <div className="mark-text mono">0]//</div>
            <h1 className="display">
              Apply to <span className="accent">Beyond Stage Zero</span>
            </h1>
            <p className="lede">
              We design, build and hot-fire liquid rocket engines, then put them on rockets. Work down the list;
              each phase takes a couple of minutes. Fill a circle and it goes orange.
            </p>
            <dl className="stats">
              <div>
                <dt className="mono">Phases</dt>
                <dd>{PHASES.length}</dd>
              </div>
              <div>
                <dt className="mono">Minutes</dt>
                <dd>~10</dd>
              </div>
              <div>
                <dt className="mono">Experience needed</dt>
                <dd>0</dd>
              </div>
            </dl>
          </div>
          <figure className="hero-art">
            <LaunchArt />
          </figure>
        </div>
      </section>

      <section className="inspo wrap" aria-label="What you could be building">
        <figure className="card card-cad">
          <img src="/b1m-cad.png" alt="Cutaway render of the B1M motor: casing, liner and nozzle" />
          <figcaption>
            <span className="mono">01 / DESIGN</span>
            B1M motor, cutaway. Every part on this starts as somebody's first CAD model.
          </figcaption>
        </figure>
        <figure className="card">
          <TestStandArt />
          <figcaption>
            <span className="mono">02 / TEST</span>
            Static fires on our own stand. You will be on the checklist, not the sidelines.
          </figcaption>
        </figure>
        <figure className="card">
          <OrbitArt />
          <figcaption>
            <span className="mono">03 / FLY</span>
            Pad to apogee to recovery. The point of all of it.
          </figcaption>
        </figure>
      </section>

      {submitted ? (
        <section className="wrap done-panel">
          <div className="done-dot">
            <Dot on />
          </div>
          <p className="mono accent">T-0 · APPLICATION RECEIVED</p>
          <h2 className="display display-sm">You are on the list, {(values.name ?? '').split(' ')[0] || 'engineer'}.</h2>
          <p className="lede">
            We read every application. Expect an email at <strong>{values.email}</strong> within two weeks about a
            short call and a shop visit. In the meantime, start sketching.
          </p>
          <button
            type="button"
            className="btn-ghost"
            onClick={() => {
              setSubmitted(false)
              setValues({})
            }}
          >
            Start a new application
          </button>
        </section>
      ) : (
        <>
          <div className="progress-bar">
            <div className="wrap">
              <ol className="segments">
                {PHASES.map((p, pi) => (
                  <li key={p.title}>
                    <button type="button" onClick={() => document.getElementById(`phase-${pi}`)?.scrollIntoView({ behavior: 'smooth' })}>
                      <span className="seg-num">{pi + 1}</span>
                      <span className="seg-track">
                        <span className="seg-fill" style={{ width: `${phaseProgress[pi] * 100}%` }} />
                      </span>
                    </button>
                  </li>
                ))}
              </ol>
              <p className="next-line" aria-live="polite">
                {ready ? (
                  <>
                    <strong>All set.</strong> Ready for launch ({doneCount} of {REQUIRED.length} done)
                  </>
                ) : (
                  <>
                    Next:{' '}
                    <button type="button" className="link" onClick={() => jumpTo(next.id)}>
                      {next.title}
                    </button>{' '}
                    <span className="muted">
                      ({doneCount} of {REQUIRED.length} done)
                    </span>
                  </>
                )}
              </p>
            </div>
          </div>

          <form className="wrap phases" onSubmit={submit} noValidate>
            {PHASES.map((p, pi) => {
              const req = REQUIRED.filter((it) => it.phase === pi)
              const d = req.filter((it) => isDone(it, values[it.id])).length
              return (
                <section key={p.title} className="phase" id={`phase-${pi}`}>
                  <header className="phase-head">
                    <span className="phase-num">{pi + 1}</span>
                    <div>
                      <h2>{p.title}</h2>
                      <p>{p.blurb}</p>
                    </div>
                    <span className={`mono phase-count${d === req.length ? ' accent' : ''}`}>
                      {d} of {req.length}
                    </span>
                  </header>
                  <ul className="list">
                    {p.items.map((it) => (
                      <Item key={it.id} item={it} value={values[it.id]} onChange={set(it.id)} isNext={next?.id === it.id} />
                    ))}
                  </ul>
                </section>
              )
            })}

            <section className="phase launch">
              <header className="phase-head">
                <span className="phase-num">{PHASES.length + 1}</span>
                <div>
                  <h2>Launch</h2>
                  <p>{ready ? 'Everything is green. Send it.' : 'Fill the remaining circles to arm the button.'}</p>
                </div>
              </header>
              <button type="submit" className={`launch-btn${ready ? ' armed' : ''}`} disabled={sending} aria-disabled={!ready}>
                <span className="mono">{ready ? 'ARMED' : `${REQUIRED.length - doneCount} LEFT`}</span>
                <span>{sending ? 'Sending…' : 'Submit application'}</span>
                <span aria-hidden="true">→</span>
              </button>
              {error && <p className="error">{error}</p>}
            </section>
          </form>
        </>
      )}

      <footer className="foot">
        <div className="wrap foot-inner">
          <Mark className="foot-mark" />
          <p className="display foot-line">See you at the stand.</p>
          <span className="mono muted">© {new Date().getFullYear()} Beyond Stage Zero</span>
        </div>
      </footer>
    </div>
  )
}
