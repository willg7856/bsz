import { Link } from 'react-router-dom'
import B1mStaticFireNotice from '../components/B1mStaticFireNotice'
import { campaigns, engineSummary, fires, resultLabel, upNext } from '../data'
import { useTitle } from '../useTitle'
import './Tests.css'

const TICK = Array.from({ length: 40 })

const resultTone = {
  failure: 'red',
  partial: 'amber',
  success: 'green',
}

export default function Tests() {
  useTitle('Tests')

  const built = engineSummary
    .filter((item) => item.label.includes('built'))
    .reduce((total, item) => total + Number(item.val), 0)
  const inProduction = engineSummary.find((item) => item.label.includes('in build'))?.val ?? '0'
  const partials = fires.filter((fire) => fire.result === 'partial').length
  const failures = fires.filter((fire) => fire.result === 'failure').length

  return (
    <div className="tests">
      <section className="tests-hero">
        <div className="tests-hero-grid-bg" aria-hidden="true" />
        <div className="container tests-hero-inner">
          <div>
            <p className="eyebrow" style={{ color: 'var(--ink-400)', marginBottom: '24px' }}>
              [ Ground Operations ]
            </p>
            <h1 className="tests-hero-h1">Static Fire<br />Test Log.</h1>
            <p className="tests-hero-sub">
              Every ground test we have run — including the ones that didn&apos;t go to plan. We publish everything: results, anomalies, and what we learned.
            </p>
          </div>
          <div className="tests-hero-side">
            <B1mStaticFireNotice />
          <div className="tests-hero-stats">
            <div className="tests-hero-stat">
              <span className="tests-hero-stat-val">{fires.length}</span>
              <span className="tests-hero-stat-lbl">Fires conducted</span>
            </div>
            <div className="tests-hero-stat">
              <span className="tests-hero-stat-val tests-hero-stat-val--amber">{partials}</span>
              <span className="tests-hero-stat-lbl">Partial success</span>
            </div>
            <div className="tests-hero-stat">
              <span className="tests-hero-stat-val tests-hero-stat-val--red">{failures}</span>
              <span className="tests-hero-stat-lbl">Failures</span>
            </div>
          </div>
          </div>
        </div>
        <div className="tick-rule tests-tick">
          {TICK.map((_, index) => <span key={index} />)}
        </div>
      </section>

      <section className="section" style={{ background: 'var(--paper-200)', borderBottom: '1px solid var(--line)' }}>
        <div className="container">
          <div className="tests-engine-summary">
            <div className="tests-engine-summary-stat">
              <span className="tests-engine-summary-val">{built}</span>
              <span className="tests-engine-summary-lbl">Total engines built</span>
            </div>
            <div className="tests-engine-summary-stat">
              <span className="tests-engine-summary-val">{inProduction}</span>
              <span className="tests-engine-summary-lbl">In production</span>
            </div>
          </div>
          <div className="tests-batches">
            {engineSummary.map((batch) => (
              <div className="tests-batch-card" key={batch.label}>
                <div className="tests-batch-val">{batch.val}</div>
                <div className="tests-batch-lbl">{batch.label}</div>
                <div className="tests-batch-sub">{batch.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section dark">
        <div className="container">
          <div className="tests-upnext-head">
            <span className="eyebrow" style={{ color: 'var(--ink-400)' }}>[ Up next ]</span>
            <h2 className="tests-upnext-title">Next tests.</h2>
          </div>
          <div className="tests-upnext-list">
            {upNext.map((item) => (
              <div className="tests-upnext-card" key={item.id}>
                <div className="tests-upnext-card-body">
                  <div className="tests-upnext-top">
                    <div>
                      <div className="tests-upnext-id">{item.id}</div>
                      <div className="tests-upnext-label">{item.label}</div>
                      <div className="tests-upnext-engine">{item.engine}</div>
                    </div>
                    <div className="tests-upnext-status">{item.status}</div>
                  </div>
                  <p className="tests-upnext-note">{item.note}</p>
                  {item.steps ? (
                    <ol className="tests-upnext-steps">
                      {item.steps.map((step) => (
                        <li key={step.label}>
                          <span className="tests-upnext-step-label">{step.label}</span>
                          {step.when ? <span className="tests-upnext-step-when">{step.when}</span> : null}
                        </li>
                      ))}
                    </ol>
                  ) : null}
                  {item.id === 'C-03' ? (
                    <p style={{ marginTop: '1rem' }}>
                      <Link className="home-rocket-link" to="/b1m-engine">Engine development updates</Link>
                    </p>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {campaigns.map((campaign) => {
            const campaignFires = fires.filter((fire) => fire.campaign === campaign.id)
            return (
              <div className="tests-campaign" key={campaign.id}>
                <div className="tests-campaign-head">
                  <div>
                    <span className="eyebrow">[ {campaign.id} · {campaign.engine} ]</span>
                    <p className="tests-campaign-date">{campaign.date}</p>
                  </div>
                  <p className="tests-campaign-objective">{campaign.objective}</p>
                </div>
                {campaign.photos ? (
                  <div className="tests-campaign-photos">
                    {campaign.photos.map((photo) => (
                      <figure key={photo.src}>
                        <img src={photo.src} alt={photo.caption} loading="lazy" />
                        <figcaption>{photo.caption}</figcaption>
                      </figure>
                    ))}
                  </div>
                ) : null}
                <div className="tests-log">
                  {campaignFires.map((fire) => (
                    <article className="tests-fire" key={fire.id}>
                      <div className="tests-fire-head">
                        <div className="tests-fire-id-block">
                          <span className="tests-fire-id">{fire.id}</span>
                          <span className="tests-fire-grade">{fire.kno3Grade}</span>
                        </div>
                        <div className={`tests-badge tests-badge--${resultTone[fire.result]}`}>{resultLabel[fire.result]}</div>
                      </div>
                      {fire.photo && !fire.photo.portrait ? (
                        <figure className="tests-fire-photo">
                          <img src={fire.photo.src} alt={fire.photo.caption} loading="lazy" />
                          <figcaption>{fire.photo.caption}</figcaption>
                        </figure>
                      ) : null}
                      <div className={`tests-fire-body${fire.photo?.portrait ? ' tests-fire-body--portrait' : ''}`}>
                        {fire.photo?.portrait ? (
                          <figure className="tests-fire-photo tests-fire-photo--portrait">
                            <img src={fire.photo.src} alt={fire.photo.caption} loading="lazy" />
                            <figcaption>{fire.photo.caption}</figcaption>
                          </figure>
                        ) : null}
                        <div className="tests-fire-specs">
                          <div className="tests-spec-row"><span className="tests-spec-lbl">Engine</span><span className="tests-spec-val">{fire.engine}</span></div>
                          <div className="tests-spec-row"><span className="tests-spec-lbl">KNO₃ grade</span><span className="tests-spec-val">{fire.kno3Grade}</span></div>
                          <div className="tests-spec-row"><span className="tests-spec-lbl">Propellant</span><span className="tests-spec-val">{fire.propellant}</span></div>
                          <div className="tests-spec-row"><span className="tests-spec-lbl">Prop. mass</span><span className="tests-spec-val">{fire.mass}</span></div>
                          <div className="tests-spec-row"><span className="tests-spec-lbl">Burn time</span><span className="tests-spec-val">{fire.burnTime}</span></div>
                          <div className="tests-spec-row"><span className="tests-spec-lbl">Peak thrust</span><span className="tests-spec-val">{fire.peakThrust}</span></div>
                        </div>
                        <div className="tests-fire-notes">
                          <div>
                            <p className="tests-notes-label">Observations</p>
                            <ul className="tests-obs-list">
                              {fire.observations.map((line) => (
                                <li key={line}>{line}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <p className="tests-notes-label">What we learned</p>
                            <p className="tests-learned">{fire.learned}</p>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
