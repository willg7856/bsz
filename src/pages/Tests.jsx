import { campaigns, engineSummary, fires, nextCampaign, resultLabel } from '../data'
import { useTitle } from '../useTitle'

export default function Tests() {
  useTitle('Tests')

  return (
    <>
      <header className="masthead">
        <div className="masthead-inner">
          <div>
            <p className="kicker">Ground operations</p>
            <h1>Static fire test log.</h1>
            <p className="lede">
              Every ground test we have run — including the ones that didn&apos;t go to plan. We publish everything: results, anomalies, and what we learned.
            </p>
          </div>
          <div className="masthead-side">
            <div className="side-row"><span>Fires conducted</span><span>4</span></div>
            <div className="side-row"><span>Partial success</span><span>1</span></div>
            <div className="side-row"><span>Failures</span><span>3</span></div>
          </div>
        </div>
      </header>

      <section className="hud" aria-label="Engines built">
        <div className="hud-inner cols-3">
          <div className="metric">
            <span className="metric-label">Engines built</span>
            <span className="metric-value">9</span>
          </div>
          <div className="metric">
            <span className="metric-label">In production</span>
            <span className="metric-value">3</span>
          </div>
          <div className="metric">
            <span className="metric-label">Next campaign</span>
            <span className="metric-value" style={{ fontSize: '1.15rem' }}>{nextCampaign.status}</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="rows">
            {engineSummary.map((item) => (
              <article className="prog-row" key={item.label}>
                <p className="metric-value">{item.val}</p>
                <div>
                  <h3>{item.label}</h3>
                  <p>{item.sub}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="kicker">Up next</p>
              <h2>Next test campaign.</h2>
            </div>
            <span className="status status-warn">{nextCampaign.status}</span>
          </div>
          <article className="prog-row">
            <p className="prog-kicker">{nextCampaign.id}</p>
            <div>
              <h3>{nextCampaign.label}</h3>
              <p>{nextCampaign.note}</p>
            </div>
            <div className="meta-stack">
              <div className="meta-line"><span>Engine</span><span>{nextCampaign.engine}</span></div>
            </div>
          </article>
          <div className="rows" style={{ marginTop: '1.5rem' }}>
            {campaigns.map((campaign) => (
              <article className="vehicle-row" key={campaign.id}>
                <span className="idx">{campaign.id}</span>
                <span>{campaign.date} · {campaign.engine} — {campaign.objective}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="kicker">Log</p>
              <h2>Fires.</h2>
            </div>
          </div>
          {fires.map((fire) => (
            <article className="fire" key={fire.id}>
              <div className="fire-head">
                <div>
                  <p className="kicker">{fire.campaign} · {fire.date}</p>
                  <h3>{fire.id}</h3>
                </div>
                <span className={`status status-${fire.result}`}>{resultLabel[fire.result]}</span>
              </div>
              <div className="fire-grid">
                <div><span>Engine</span><strong>{fire.engine}</strong></div>
                <div><span>KNO₃ grade</span><strong>{fire.kno3Grade}</strong></div>
                <div><span>Propellant</span><strong>{fire.propellant}</strong></div>
                <div><span>Prop. mass</span><strong>{fire.mass}</strong></div>
                <div><span>Burn time</span><strong>{fire.burnTime}</strong></div>
                <div><span>Peak thrust</span><strong>{fire.peakThrust}</strong></div>
              </div>
              <ul className="obs">
                {fire.observations.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
              <p className="learned"><strong>What we learned. </strong>{fire.learned}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
