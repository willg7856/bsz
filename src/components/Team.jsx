const people = [
  { name: 'Will Granger', role: 'Project lead', bio: 'Aerospace IV. Ex-NASA Frontier Aerospace intern. Owns the integrated schedule.' },
  { name: 'Priya Natarajan', role: 'Propulsion', bio: 'Mech III. Designed the hybrid grain geometry; ran six of seven static fires.' },
  { name: 'Tomas Fischer', role: 'Structures', bio: 'Mech IV. Composites lead. Wound the fuselage at 4 a.m. on a Sunday.' },
  { name: 'Maya Sandhu', role: 'Avionics', bio: 'EE III. Flight computer firmware. Wrote the redundant trigger logic.' },
  { name: 'Jordan Lee', role: 'Recovery', bio: 'Mech III. Parachute design and packing. Ran every drop test from Williamstown.' },
  { name: 'Cassandra Yu', role: 'Operations', bio: 'Aero II. Range coordination, CASA liaison, console procedures.' },
  { name: 'Nikolai Roussos', role: 'Aerodynamics', bio: 'Aero IV. CFD on nose-cone and fin geometry; trajectory modelling.' },
  { name: 'Rabia Ahmadi', role: 'Telemetry', bio: 'EE III. Ground station, link budget, the whole 2.4 GHz pipeline.' },
];

export default function Team() {
  return (
    <section className="section" id="team">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow">[ Team ]</span>
            <h2>Forty-eight engineers.<br />Eight visible.</h2>
          </div>
          <p className="lead">
            The team rotates twice a year as students roll on and off project. These eight are leads for the current launch campaign. Full directory on the recruiting page.
          </p>
        </div>
        <div className="team-grid">
          {people.map(p => (
            <div className="team-card" key={p.name}>
              <div className="team-photo"></div>
              <div className="team-role">{p.role}</div>
              <div className="team-name">{p.name}</div>
              <p className="team-bio">{p.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
