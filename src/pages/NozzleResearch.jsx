import { Link } from 'react-router-dom'
import { NOZZLE_ORDER, formatOpensAt } from '../nozzle/order'
import { nozzleResearch as R } from '../data'
import { useTitle } from '../useTitle'

function SectionHead({ kicker, title, children }) {
  return (
    <div className="section-head">
      <div>
        <p className="kicker">{kicker}</p>
        <h2>{title}</h2>
      </div>
      {children}
    </div>
  )
}

function Stats({ items }) {
  return (
    <div className={`nozzle-costs research-stats count-${items.length}`}>
      {items.map((item) => (
        <div className="spec-cell" key={item.label}>
          <p className="lbl">{item.label}</p>
          <p className="val">{item.value}</p>
          <p className="note">{item.note}</p>
        </div>
      ))}
    </div>
  )
}

function Photo({ src, alt, caption }) {
  return (
    <figure>
      <img src={src} alt={alt || caption} loading="lazy" />
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  )
}

const TABLE_HEAD = ['Version', 'Material', 'Converging /10', 'Diverging /10', 'Human fixes', 'Notes']

export default function NozzleResearch() {
  useTitle('Ceramic nozzle research')

  return (
    <div className="nozzles-page research-page">
      <header className="masthead">
        <div className="masthead-inner">
          <div>
            <p className="kicker"><Link to="/nozzles">Ceramic nozzles</Link> · Research</p>
            <h1>The research.</h1>
            <p className="lede">{R.question}</p>
            <p className="research-byline">By {R.authors} · {R.doherty.year} Peter Doherty Science Award entry</p>
            <p className="research-byline">{R.asOf}</p>
            <div className="actions">
              <a className="btn btn-ink" href="#poster">See the poster</a>
              <a className="btn" href={R.poster.pdf} download>Download PDF</a>
            </div>
          </div>
          <div className="masthead-side">
            {R.headline.map((h) => (
              <div className="side-row" key={h.label}><span>{h.label}</span><span>{h.value}</span></div>
            ))}
            <div className="side-row"><span>Throat error</span><span>±0.5 mm</span></div>
            <div className="side-row"><span>Current mould</span><span>v15</span></div>
          </div>
        </div>
      </header>

      <section className="section dark" id="poster">
        <div className="wrap">
          <SectionHead kicker={`${R.doherty.year} poster`} title="The poster.">
            <p>
              Tap it to open full size, or read it section by section below.
              <a className="home-project-link" href={R.poster.pdf} download>Download the PDF (A1)</a>
            </p>
          </SectionHead>
          <a className="research-poster" href={R.poster.image} target="_blank" rel="noopener noreferrer">
            <img src={R.poster.image} alt={R.poster.alt} loading="lazy" width="2600" height="1836" />
          </a>
        </div>
      </section>

      <section className="section">
        <div className="wrap research-split">
          <div>
            <p className="kicker">How it started</p>
            <h2>Graphite gets expensive, fast.</h2>
            <p className="copy">{R.howItStarted}</p>
          </div>
          <div>
            <p className="kicker">Introduction</p>
            <h2>One mould version at a time.</h2>
            <p className="copy">{R.introduction}</p>
          </div>
        </div>
      </section>

      <section className="section dark">
        <div className="wrap">
          <SectionHead kicker="Aim and hypothesis" title="What we tested.">
            <p>{R.aim}</p>
          </SectionHead>
          <dl className="research-vars">
            {R.variables.map(([k, v]) => (
              <div key={k}><dt>{k} variable</dt><dd>{v}</dd></div>
            ))}
          </dl>
          <blockquote className="research-hypothesis">
            <p className="kicker">Hypothesis</p>
            <p>{R.hypothesis}</p>
          </blockquote>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead kicker="Method" title="From v0 to v14.">
            <p>Every mould is 3D-printed in-house, then cast, measured and scored.</p>
          </SectionHead>
          <div className="nozzle-figures count-2 research-moulds">
            {R.moulds.map((m) => <Photo key={m.src} src={m.src} caption={m.caption} alt={`Mould drawing, ${m.caption}`} />)}
          </div>
          <ol className="research-method">
            {R.method.map((m, i) => (
              <li key={m.src}>
                <img src={m.src} alt={m.alt} loading="lazy" />
                <span className="idx">{String(i + 1).padStart(2, '0')}</span>
                <p>{m.text}</p>
              </li>
            ))}
          </ol>
          <div className="research-split research-notes">
            <div>
              <p className="kicker">Materials and scoring</p>
              <ul>{R.scoring.map((s) => <li key={s}>{s}</li>)}</ul>
            </div>
            <div>
              <p className="kicker">Risks</p>
              <ul>{R.risks.map((s) => <li key={s}>{s}</li>)}</ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section dark">
        <div className="wrap">
          <SectionHead kicker="Results" title="Scores went up, fixes went down.">
            <p>Table 1: material, scores and human fixes by version. v3–v11 were test-fitted only, not cast.</p>
          </SectionHead>
          <Stats items={R.results} />
          <div className="research-table-wrap">
            <table className="research-table">
              <thead><tr>{TABLE_HEAD.map((h) => <th key={h} scope="col">{h}</th>)}</tr></thead>
              <tbody>
                {R.table.map((row) => (
                  <tr key={row[0]}>{row.map((cell, i) => (i === 0 ? <th scope="row" key={i}>{cell}</th> : <td key={i}>{cell}</td>))}</tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="nozzle-figures count-2">
            {R.figures.map((f) => <Photo key={f.src} src={f.src} caption={f.caption} />)}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap research-split">
          <div>
            <p className="kicker">Discussion</p>
            <h2>What we learned.</h2>
            <dl className="research-discussion">
              {R.discussion.map(([k, v]) => (
                <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
              ))}
            </dl>
          </div>
          <div>
            <p className="kicker">Ceramic vs other nozzles</p>
            <h2>Cheap, but brittle.</h2>
            <p className="copy">{R.otherNozzles}</p>
            <p className="kicker research-gap">Conclusion</p>
            <p className="copy">{R.conclusion}</p>
          </div>
        </div>
      </section>

      <section className="section dark">
        <div className="wrap">
          <SectionHead kicker="Roadmap" title="What happens next.">
            <p>
              Static fire results will go on the <Link to="/tests">Tests page</Link>.
            </p>
          </SectionHead>
          <ol className="nozzle-steps research-roadmap">
            {R.roadmap.map(([when, what], i) => (
              <li key={what}>
                <span className="idx">{String(i + 1).padStart(2, '0')} · {when}</span>
                <strong>{what}</strong>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" id="doherty">
        <div className="wrap">
          <SectionHead kicker={R.doherty.year} title="Peter Doherty Science Award.">
            <p>
              {R.doherty.body}
              <a className="home-project-link" href={R.doherty.href} target="_blank" rel="noopener noreferrer">About the award</a>
            </p>
          </SectionHead>
          <figure className="doherty-photo">
            <img src={R.doherty.photo.src} alt={R.doherty.photo.alt} loading="lazy" />
            <figcaption>{R.doherty.photo.caption}</figcaption>
          </figure>
          <div className="research-refs">
            <p className="kicker">References and acknowledgements</p>
            <ul>{R.references.map((r) => <li key={r}>{r}</li>)}</ul>
            <p>{R.acknowledgements}</p>
          </div>
        </div>
      </section>

      <section className="section dark nozzle-orders">
        <div className="wrap">
          <p className="kicker">Pre-orders</p>
          <h2>Your design, cast in ceramic.</h2>
          <p className="copy">{NOZZLE_ORDER.open ? '' : `Pre-orders open ${formatOpensAt()}. `}Upload your nozzle, check the numbers we measure from it, and pre-order.</p>
          <Link className="btn btn-ink" to="/nozzles/preorder">{NOZZLE_ORDER.open ? 'Pre-order a nozzle' : 'Pre-orders open soon'}</Link>
        </div>
      </section>
    </div>
  )
}
