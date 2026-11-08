import { Link } from 'react-router-dom'
import { NOZZLE_ORDER, formatOpensAt } from '../nozzle/order'
import NozzleHero from '../components/NozzleHero'
import { nozzleDesign, nozzleMould } from '../data'
import { useTitle } from '../useTitle'

function Photos({ figures }) {
  if (!figures?.length) return null
  return (
    <div className={`nozzle-figures count-${figures.length}`}>
      {figures.map((figure) => (
        <figure key={figure.id}>
          <img src={figure.src} alt={figure.alt || figure.title} loading="lazy" />
          {figure.title ? <figcaption>{figure.title}</figcaption> : null}
        </figure>
      ))}
    </div>
  )
}

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

export default function Nozzles() {
  useTitle('Ceramic nozzles')

  return (
    <div className="nozzles-page">
      <NozzleHero />

      <header className="masthead nozzles-intro">
        <div className="masthead-inner">
          <div>
            <p className="kicker">Propulsion</p>
            <h1>Ceramic nozzles.</h1>
            <p className="lede">
              To lower the cost of a nozzle compared to graphite. They still have to survive a burn before one flies on B1M.{' '}
              <Link className="text-link" to="/tests">Read the fire logs</Link>
            </p>
          </div>
        </div>
      </header>

      <section className="section">
        <div className="wrap">
          <SectionHead kicker={nozzleDesign.kicker} title={nozzleDesign.title}>
            <p>{nozzleDesign.body}</p>
          </SectionHead>
          <div className="nozzle-costs">
            {nozzleDesign.costs.map((item) => (
              <div className="spec-cell" key={item.label}>
                <p className="lbl">{item.label}</p>
                <p className="val">{item.value}</p>
                <p className="note">{item.note}</p>
              </div>
            ))}
          </div>
          <Photos figures={nozzleDesign.figures} />
          <Link className="text-link b1m-all-photos" to={nozzleDesign.more.to}>{nozzleDesign.more.label}</Link>
        </div>
      </section>

      <section className="section dark">
        <div className="wrap">
          <SectionHead kicker={nozzleMould.kicker} title={nozzleMould.title}>
            <p>{nozzleMould.body}</p>
          </SectionHead>
          <Photos figures={nozzleMould.figures} />
        </div>
      </section>

      <section className="section nozzle-research-band">
        <div className="wrap">
          <SectionHead kicker="Research" title="The research behind the nozzle.">
            <p>
              How we make them, what we have found so far, and our 2026 Peter Doherty Science Award entry.
            </p>
          </SectionHead>
          <Link className="btn btn-ink" to="/nozzles/research">Read the research →</Link>
        </div>
      </section>

      <section className="section dark nozzle-orders">
        <div className="wrap">
          <p className="kicker">Pre-orders</p>
          <h2>Your design, cast in ceramic.</h2>
          <p className="copy">
            {NOZZLE_ORDER.open ? '' : `Pre-orders open ${formatOpensAt()}. `}
            Upload your nozzle, check the numbers we measure from it, and pre-order. Questions first? Use the{' '}
            <Link to="/contact?reason=Ceramic%20nozzle%20enquiries">contact page</Link>.
          </p>
          <Link className="btn btn-ink" to="/nozzles/preorder">{NOZZLE_ORDER.open ? 'Pre-order a nozzle' : 'Pre-orders open soon'}</Link>
        </div>
      </section>
    </div>
  )
}
