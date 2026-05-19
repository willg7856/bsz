import { useState } from 'react';

const stages = [
  { id: 0, num: 'STAGE 00', name: 'Concept', when: '2024-Q3', state: 'done',
    headline: 'From whiteboard to mission spec.',
    body: 'Three months of trade studies. Hybrid won over solid on safety; carbon won over aluminium on mass; 30 km won over 100 km on schedule and CASA approval risk.',
    readout: [['Design revs', '14'], ['Trade studies', '6'], ['Sign-off', '2024-12-08']] },
  { id: 1, num: 'STAGE 01', name: 'Airframe', when: '2025-Q2', state: 'done',
    headline: 'Filament-wound carbon fuselage.',
    body: 'Single 4.2 m monolithic tube wound in-house at the Monash composites lab. Nose cone CNC-machined from PEEK. All structural panels CT-scanned for voids before integration.',
    readout: [['Hull mass', '6.4 kg'], ['Length', '4.20 m'], ['Skin thickness', '2.8 mm']] },
  { id: 2, num: 'STAGE 02', name: 'Static fire', when: '2026-Q2', state: 'now',
    headline: 'Hybrid motor on the test stand.',
    body: 'Seven static fires across three motor configurations. The current grain (HTPB / N₂O) delivered 9.8 kN peak across a 4.2-second burn. We are now characterising regression-rate scatter and ablative liner wear before flight qualification.',
    readout: [['Tests run', '7 / 8'], ['Peak thrust', '9.8 kN'], ['Anomalies', '1 (RESOLVED)']] },
  { id: 3, num: 'STAGE 03', name: 'Recovery', when: '2026-Q3', state: 'next',
    headline: 'Three-stage parachute system.',
    body: 'Drogue at apogee, main at 600 m AGL, locator beacon active continuously. Avionics stack runs redundant flight computers with cross-checked altitude triggers.',
    readout: [['Drogue', '0.6 m²'], ['Main', '4.2 m²'], ['Beacon range', '12 km']] },
  { id: 4, num: 'STAGE 04', name: 'Launch', when: '2026-08', state: 'next',
    headline: 'Mildura, Victoria. August window.',
    body: 'Range cleared by CASA. Pad assembled, telemetry relay tested over the full 30 km link budget. We launch when wind is below 8 m/s at 1000 ft AGL and the team is GO across all twelve console positions.',
    readout: [['Range', 'MILD-01'], ['Window', '2026-08-14'], ['Status', 'PLANNING']] },
];

export default function Stages() {
  const [selected, setSelected] = useState(2);
  const s = stages[selected];

  return (
    <section className="section" id="stages" style={{ background: 'var(--paper-200)' }}>
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow">[ Programme ]</span>
            <h2>Stages of the build.</h2>
          </div>
          <p className="lead">
            The brand is named after this list. Stage Zero is the ground; everything beyond it is what we are doing. Tap a stage to read the spec.
          </p>
        </div>
        <div className="stages-row">
          {stages.map((st, i) => {
            const cls = [
              'stage-item',
              st.state === 'done' && i !== selected ? 'done' : '',
              i === selected ? 'now' : '',
            ].filter(Boolean).join(' ');
            return (
              <div key={st.id} className={cls} onClick={() => setSelected(i)}>
                <div className="stage-num">{st.num}</div>
                <div className="stage-name">{st.name}</div>
                <div className="stage-when">{st.when} &middot; {st.state.toUpperCase()}</div>
              </div>
            );
          })}
        </div>
        <div className="stage-detail">
          <div>
            <span className="eyebrow accent">[ {s.num} / {s.name.toUpperCase()} ]</span>
            <h3>{s.headline}</h3>
            <p>{s.body}</p>
          </div>
          <div className="stage-readout">
            {s.readout.map(([k, v]) => (
              <div className="row" key={k}><span className="lbl">{k}</span><span className="val">{v}</span></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
