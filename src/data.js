export const site = {
  name: 'Beyond Stage Zero',
  email: 'beyondstagezero@gmail.com',
  x: 'https://x.com/beyondstagezero',
  space: 'https://beyondstagezero.space',
  starship: 'https://starship.beyondstagezero.com',
  place: 'Creswick, VIC · Australia',
}

export const nav = [
  { to: '/stravox', label: 'STRAVOX' },
  { to: '/b1m', label: 'B1M' },
  { to: '/b1m-engine', label: 'B1M engine' },
  { to: '/missions', label: 'Missions' },
  { to: '/tests', label: 'Tests' },
  { to: '/news', label: 'News' },
]

export const footerNav = [
  { to: '/about', label: 'About' },
  { to: '/stravox', label: 'STRAVOX' },
  { to: '/b1m', label: 'B1M' },
  { to: '/b1m-engine', label: 'B1M engine' },
  { to: '/missions', label: 'Missions' },
  { to: '/tests', label: 'Tests' },
  { to: '/nozzles', label: 'Nozzles' },
  { to: '/octopus', label: 'Octopus' },
  { to: '/news', label: 'News' },
  { to: '/contact', label: 'Contact' },
]

export const vehicles = [
  { name: '100 m Hopper', status: 'In production', to: '/missions' },
  { name: 'B1M-01', status: 'In production', to: '/b1m' },
  { name: 'B1M-02', status: 'In production', to: '/b1m' },
  { name: 'B1M-03', status: 'In production', to: '/b1m' },
]

export const programme = [
  {
    kicker: 'Vehicle · Currently in development',
    title: 'STRAVOX',
    body: 'A 2,633 mm high-power rocket with a split nosecone airbrake and propulsive vertical landing on four folding drone arms. Designed and built from scratch by the Beyond Stage Zero team.',
    to: '/stravox',
    action: 'Explore the design',
    meta: [
      ['Height', '2,633 mm'],
      ['Apogee', '30 km'],
      ['Landing', 'Propulsive'],
    ],
  },
  {
    kicker: 'Vehicle · Sub-scale',
    title: 'STRAVOX B1M',
    body: 'Our 3 km systems-validation vehicle — flying a home-built KNSB motor to prove avionics, recovery, and flight systems before full-scale STRAVOX. Engine design complete; build and propellant work in progress.',
    to: '/b1m',
    action: 'Explore B1M',
    meta: [
      ['Apogee', '3 km'],
      ['Thrust', '~150 kgf'],
      ['Window', "Q4'26–Q1'27"],
    ],
  },
  {
    kicker: 'Flight programme',
    title: 'Missions',
    body: 'From the STRAVOX B1M 3 km sub-scale flight to the 100 m drone-powered hop and full-scale 30 km attempt — every planned flight, objective, and milestone in one place.',
    to: '/missions',
    action: 'View the mission pipeline',
    meta: [
      ['Next up', 'B1M-01 · 3 km'],
      ['Hop test', '100 m · Q3–Q4 2026'],
      ['Full scale', 'STRAVOX · 30 km'],
    ],
  },
  {
    kicker: 'Propulsion · Ground test',
    title: 'Engine tests',
    body: 'Static-fire campaigns, engine builds, and propellant work that feed every vehicle we fly. Mk I and Mk II results are public — B1M motors are next on the stand.',
    to: '/tests',
    action: 'See the test log',
    meta: [
      ['Static fires', '4 completed'],
      ['Engines built', '9 total'],
      ['Next campaign', 'B1M static fires'],
    ],
  },
  {
    kicker: 'Propulsion · Materials',
    title: 'Ceramic nozzles',
    body: 'A programme to design and qualify ceramic nozzles that survive our burns — after early motors lost nozzles to ejection and thermal damage. From insert prototypes to B1M-ready stacks.',
    to: '/nozzles',
    action: 'Explore the programme',
    meta: [
      ['Status', 'Active'],
      ['Focus', 'Retention + heat'],
      ['Target', 'B1M integration'],
    ],
  },
  {
    kicker: 'Data link · Mission control',
    title: 'Octopus',
    body: 'The connection that gets pad data — and later vehicle data — into Goods Shed mission control during static fires and launches. Not the flight computer.',
    to: '/octopus',
    action: 'Explore the programme',
    meta: [
      ['Status', 'Active'],
      ['Path', 'Pad → Goods Shed'],
      ['Also', 'Vehicle → MC'],
    ],
  },
]

export const partners = [
  {
    name: 'Creswick Railway Workshops Association',
    role: 'Workshop & base',
    href: 'https://www.crwa.org.au',
    logo: '/partner-crwa.svg',
  },
  {
    name: 'Ballarat Tech School',
    role: 'Education partner',
    href: 'https://ballarattech.school',
    logo: '/partner-bts.svg',
  },
  {
    name: 'Federation University',
    role: 'Supporter',
    href: 'https://federation.edu.au',
    logo: '/partner-feduni.svg',
  },
  {
    name: 'Parish Engineering',
    role: 'Supporter',
    href: 'https://www.parishengineering.com.au/',
    logo: '/partner-parish.png',
  },
]

export const values = [
  { index: '01', title: 'Student led', desc: 'Every part of the project — from design to launch — is driven by students.' },
  { index: '02', title: 'Ambitious', desc: "We set out to build Australia's first fully and rapidly reusable launch vehicle." },
  { index: '03', title: 'Collaborative', desc: 'We bring together engineers, scientists, and builders from across disciplines.' },
  { index: '04', title: 'Open', desc: 'We share our progress, failures, and learnings with the broader community.' },
]

export const disciplines = [
  { code: 'PROP', title: 'Propulsion', desc: 'Home-built KNSB motors — casing design, propellant casting, nozzle work, and static-fire campaigns from Mk I through B1M.' },
  { code: 'STRU', title: 'Structures', desc: 'Airframe, fins, and recovery bay design for B1M and full-scale STRAVOX — machined and assembled in Creswick.' },
  { code: 'AVIO', title: 'Avionics', desc: 'Flight computer, altimeter, GPS, and recovery electronics sized for sub-scale flight before the 30 km vehicle.' },
  { code: 'LINK', title: 'Range data', desc: 'Octopus — the pad and vehicle data link into Goods Shed mission control for live static fires and launches.' },
  { code: 'RECO', title: 'Recovery & landing', desc: 'Parachute recovery on B1M today; propulsive vertical landing on folding drone arms for full-scale STRAVOX.' },
  { code: 'OPS', title: 'Mission ops', desc: 'CASA range path, Victorian launch planning, and Goods Shed operations for the flight programme.' },
]

export const record = [
  { val: '4', lbl: 'Static fires completed', note: 'Mk I & Mk II campaigns logged and published' },
  { val: '9', lbl: 'Engines built', note: 'From early ground motors to B1M production' },
  { val: 'Apr 2025', lbl: 'Founded', note: 'Creswick, Victoria — programme start' },
  { val: "Q4'26–Q1'27", lbl: 'First flight window', note: 'STRAVOX B1M-01 · 3 km systems validation' },
]

export const stravoxSpecs = [
  { lbl: 'Apogee', val: '30', unit: 'km', note: 'Target altitude above sea level.' },
  { lbl: 'Peak velocity', val: '2.5', unit: 'Mach', note: 'At motor burnout, ~10 km AGL.' },
  { lbl: 'Length', val: '2,633', unit: 'mm', note: 'Full vehicle height, fins included.' },
  { lbl: 'Diameter', val: '200', unit: 'mm', note: 'Airframe outer diameter.' },
  { lbl: 'Base fin span', val: '520', unit: 'mm', note: 'Boost-phase stability fins.' },
  { lbl: 'Upper fin span', val: '340', unit: 'mm', note: 'Supersonic control fins.' },
  { lbl: 'Landing thrust', val: '112', unit: 'kgf', note: 'T-Motor U13 II × 4, combined.' },
  { lbl: 'Landing T/W', val: '2.05', unit: '×', note: 'Thrust-to-weight at touchdown.' },
  { lbl: 'Engine grain', val: '1,000', unit: 'mm', note: 'KNSB propellant grain length.' },
  { lbl: 'Launch mass', val: '104.8', unit: 'kg', note: 'Full vehicle mass at liftoff, including propellant.' },
]

export const flightPhases = [
  {
    id: 'ascent',
    label: 'Ascent',
    title: 'Powered ascent',
    body: 'All systems stowed for minimum drag. Base fins provide boost-phase stability; upper fins maintain control through transonic and supersonic regimes until burnout.',
    stats: [
      ['Motor', 'KNSB'],
      ['Grain length', '1,000 mm'],
      ['Peak velocity', 'Mach 2.5'],
      ['Target apogee', '30 km'],
    ],
  },
  {
    id: 'airbrake',
    label: 'Airbrake',
    title: 'Drag-braked descent',
    body: 'Clamshell nosecone splits open to expose a 3.5× greater drag area. Folding drone arms extend and act as grid fins, passively stabilising the vehicle during descent — no parachute required.',
    stats: [
      ['Drag increase', '3.5×'],
      ['Braked speed', '~64 m/s'],
      ['Base fins', 'Ejected'],
      ['Arms', 'Grid-finning'],
    ],
  },
  {
    id: 'landing',
    label: 'Landing',
    title: 'Propulsive touchdown',
    body: 'Four T-Motor U13 II motors fire on extending arms for a propulsive vertical landing. Four legs deploy to a 180 cm footprint. Nosecone remains open throughout descent and touchdown.',
    stats: [
      ['Motors', 'U13 II × 4'],
      ['Thrust', '112 kgf'],
      ['T/W ratio', '2.05×'],
      ['Leg footprint', '~180 cm'],
    ],
  },
]

export const systems = [
  { label: 'Split nosecone', info: 'Clamshell design that opens after burnout to expose a 3.5× larger drag area — passively braking the vehicle from Mach 2.5 down to ~64 m/s for the landing sequence.' },
  { label: 'Avionics + battery bay', info: 'Flight computer, altimeter, GPS, and recovery electronics. Controls nosecone deployment, drone arm extension, and the full propulsive landing sequence.' },
  { label: 'Airframe', info: '200 mm diameter tube, 2,633 mm total vehicle height. Upper and lower sections joined by a bolted coupler ring. Carries two independent fin sets.' },
  { label: 'KNSB motor', info: 'Home-ground potassium nitrate / sorbitol propellant in a 1 m grain. Pushes STRAVOX past Mach 2.5 before burnout at approximately 10 km altitude.' },
  { label: 'Fins', info: 'Two fin sets: 520 mm-span base fins for boost-phase stability and 340 mm-span upper fins for supersonic control throughout flight.' },
  { label: 'Landing system', info: 'Four T-Motor U13 II motors extend on folding arms at apogee. Deliver 112 kgf of thrust at a 2.05× thrust-to-weight ratio for a controlled vertical touchdown.' },
]

export const stages = [
  {
    num: 'Stage 00',
    name: 'Concept',
    when: '2025-Q3',
    state: 'done',
    headline: 'From whiteboard to mission spec.',
    body: 'Trade studies across propulsion, airframe, and recovery systems. Settled on a KNSB solid motor, 30 km target apogee, and propulsive vertical landing as the core mission profile.',
    readout: [['Design revs', '8'], ['Trade studies', '4'], ['Sign-off', '2025-Q3']],
  },
  {
    num: 'Stage 01',
    name: 'Design',
    when: '2025-Q4',
    state: 'done',
    headline: 'Full vehicle design completed.',
    body: 'Aerodynamic modelling, structural analysis, and avionics architecture completed. Split nosecone airbrake geometry and propulsive landing motor placement on folding arms defined.',
    readout: [['CAD revision', 'Rev 4'], ['Simulations run', '23'], ['Sign-off', '2025-Q4']],
  },
  {
    num: 'Stage 02',
    name: 'Engine dev.',
    when: '2026-Q1 — Q2',
    state: 'now',
    headline: 'Engine development and static fire campaign.',
    body: 'Development and testing of KNSB propulsion across three engine generations. B1M engine design is complete; propellant characterisation and engine build are in progress ahead of a static fire campaign (~150 kgf, 3.5 s burn).',
    readout: [['B1M design', 'Done'], ['B1M engines', '3 in build'], ['Status', 'Active']],
  },
  {
    num: 'Stage 03',
    name: 'Avionics',
    when: '2026-Q3',
    state: 'next',
    headline: 'Fabrication and integrated avionics testing.',
    body: 'Building and qualifying avionics systems — flight computer, altimeter, GPS, and recovery electronics — alongside Octopus, our pad and vehicle data link into Goods Shed mission control. Full bench integration and validation of the avionics stack before airframe integration.',
    readout: [['Octopus', 'Data link'], ['Recovery sys.', 'Pending'], ['Status', 'Upcoming']],
  },
  {
    num: 'Stage 04',
    name: 'Fabrication',
    when: '2026-Q4',
    state: 'next',
    headline: 'Full scale STRAVOX flight hardware.',
    body: 'Manufacturing the 200 mm diameter airframe, CNC-cutting both fin sets, assembling the KNSB motor with a 1 m propellant grain, and integrating all vehicle systems into the complete STRAVOX stack.',
    readout: [['Airframe', '2,633 mm'], ['Motor grain', '1,000 mm'], ['Status', 'Upcoming']],
  },
  {
    num: 'Stage 05',
    name: 'Testing',
    when: '2027-Q1',
    state: 'next',
    headline: 'Integrated full stack testing.',
    body: 'Full vehicle systems review with all hardware integrated. Landing system deployment tests, end-to-end avionics check, and launch readiness review before CASA range clearance is sought.',
    readout: [['Systems review', 'Pending'], ['Range clearance', 'Pending'], ['Status', 'Upcoming']],
  },
  {
    num: 'Stage 06',
    name: 'Launch',
    when: '2027-Q2',
    state: 'next',
    headline: 'Full scale 30 km flight.',
    body: 'Vertical propulsive landing demonstration at a CASA-cleared range in Victoria. A full mission — boost to 30 km, airbrake descent, and controlled touchdown on four landing legs.',
    readout: [['Target apogee', '30 km'], ['Peak velocity', 'Mach 2.5'], ['Status', 'Planning']],
  },
]

export const b1mSpecs = [
  ['Role', 'Sub-scale test vehicle'],
  ['Target apogee', '3 km'],
  ['Motor', 'KNSB B1M — 550 mm × 80 mm'],
  ['Propellant', '~2 kg KNO₃/Sorbitol 65:35'],
  ['Expected thrust', '~150 kgf for 3.5 s'],
  ['Purpose', 'Systems validation for STRAVOX'],
  ['Launch site', 'Victoria, AUS'],
  ['Status', 'In development'],
  ['First flight', 'Q4 2026 – Q1 2027 — B1M-01'],
]

export const b1mObjectives = [
  'Reach 3 km target apogee',
  'Validate KNSB engine in flight',
  'Avionics and flight computer in real conditions',
  'Recovery system deployment',
  'Collect full flight telemetry',
  'Inform full-scale STRAVOX design',
]

export const b1mMilestones = [
  { label: 'B1M engine design', status: 'done', note: 'Design complete — 550 mm × 80 mm casing, ~2 kg KNO₃/Sorbitol 65:35.' },
  { label: 'Static fire stand design', status: 'done', note: 'Design complete.' },
  { label: 'Propellant characterisation', status: 'active', note: 'In progress — refining burn behaviour and propellant performance ahead of B1M static fires.' },
  { label: 'B1M engine build', status: 'active', note: 'In progress — engines in production for ground test and flight.' },
  { label: 'Static fire stand construction', status: 'active', note: 'In progress — the stand is being built for the B1M static fires.' },
  { label: 'B1M engine static fires', status: 'upcoming', note: 'Ground firing campaign to validate the motor before flight (~150 kgf, 3.5 s burn).' },
  { label: 'Vehicle design', status: 'done', note: 'Design complete — airframe, fins, and recovery bay sized for the B1M engine.' },
  { label: 'Vehicle fabrication', status: 'upcoming', note: 'Airframe construction and component manufacture.' },
  { label: 'Avionics integration', status: 'upcoming', note: 'Flight computer, altimeter, GPS, and recovery electronics — with Octopus linking pad/vehicle data to Goods Shed mission control.' },
  { label: 'CASA range clearance', status: 'upcoming', note: 'Regulatory approval for launch at a CASA-cleared site in Victoria.' },
  { label: 'STRAVOX B1M-01 launch', status: 'upcoming', note: 'Target window Q4 2026 – Q1 2027. 3 km apogee. Full flight telemetry. Recover and review.' },
]

export const missions = [
  {
    id: 'STRAVOX-B1M-01',
    num: 'Mission 01',
    name: 'STRAVOX B1M-01',
    status: 'Planned',
    year: 'Q4 2026 – Q1 2027',
    tagline: 'Sub-scale test flight. 3 km apogee. Real-world flight data.',
    description: 'STRAVOX B1M is our sub-scale test vehicle — designed to reach 3 km apogee on one of our own KNSB engines and return real-world flight data before we commit to the full STRAVOX programme. Flying B1M lets us validate avionics, recovery, and vehicle systems at a scale that avoids the regulatory complexity and risk of a 30 km flight. What works on B1M goes on STRAVOX.',
    objectives: [
      'Reach 3 km target apogee',
      'Validate KNSB engine in flight',
      'Avionics and flight computer in real conditions',
      'Recovery system deployment',
      'Collect full flight telemetry',
      'CASA range clearance',
    ],
    specs: b1mSpecs,
    milestones: [
      { label: 'B1M engine design', status: 'done', note: 'Design complete — 550 mm × 80 mm casing, ~2 kg KNO₃/Sorbitol 65:35.' },
      { label: 'Static fire stand design', status: 'done', note: 'Design complete.' },
      { label: 'Propellant characterisation', status: 'active', note: 'In progress — refining burn behaviour and propellant performance ahead of B1M static fires.' },
      { label: 'B1M engine build', status: 'active', note: 'In progress — engines in production for ground test and flight.' },
      { label: 'Static fire stand construction', status: 'active', note: 'In progress — the stand is being built for the B1M static fires.' },
      { label: 'Launch pad design', status: 'active', note: 'In progress — the pad for STRAVOX B1M-01.' },
      { label: 'B1M engine static fires', status: 'upcoming', note: 'Ground firing campaign to validate B1M motor before flight (~150 kgf, 3.5 s burn).' },
      { label: 'Vehicle design', status: 'done', note: 'Design complete — airframe, fins, and recovery bay sized for the B1M engine.' },
      { label: 'Vehicle fabrication', status: 'upcoming', note: 'Airframe construction and component manufacture.' },
      { label: 'Avionics integration', status: 'upcoming', note: 'Flight computer, altimeter, GPS, and recovery electronics — with Octopus linking pad/vehicle data to Goods Shed mission control.' },
      { label: 'Ground systems test', status: 'upcoming', note: 'Full vehicle systems check on the pad before flight.' },
      { label: 'CASA range clearance', status: 'upcoming', note: 'Regulatory approval for launch at a CASA-cleared site in Victoria.' },
      { label: 'Launch readiness review', status: 'upcoming', note: 'Final internal review before committing to launch day.' },
      { label: 'STRAVOX B1M-01 launch', status: 'upcoming', note: 'Target window Q4 2026 – Q1 2027. 3 km apogee. Full flight telemetry. Recover and review.' },
    ],
  },
]

export const upcoming = [
  { id: 'STRAVOX-HOP-01', name: 'STRAVOX — 100 m Hop Test', note: 'Low-altitude hop of STRAVOX to roughly 100 m under drone-engine power only — no main motor. Validates propulsive landing, drone-arm deployment, and vehicle handling before higher-energy flights. Target window Q3–Q4 2026.', year: 'Q3–Q4 2026' },
  { id: 'STRAVOX-B1M-02', name: 'STRAVOX B1M-02', note: 'Second B1M flight incorporating fixes and improvements from B1M-01. Objectives TBD based on B1M-01 data.', year: 'TBD' },
  { id: 'STRAVOX-01', name: 'STRAVOX — Full Scale', note: 'The main event. 30 km apogee, Mach 2.5, propulsive vertical landing. Timeline depends on B1M programme outcomes.', year: 'TBD' },
]

export const engineSummary = [
  { label: 'Mk I engines built', val: '3', sub: '250 mm × 32 mm — 2 fired, 1 held' },
  { label: 'Mk II engines built', val: '6', sub: '300 mm × 30 mm — 2 fired, 4 remaining' },
  { label: 'B1M engines in build', val: '3', sub: '550 mm × 80 mm · ~2 kg KNO₃/Sorbitol 65:35 · ~150 kgf for 3.5 s · targeting ≥2 firings each' },
]

export const campaigns = [
  { id: 'C-02', date: '26 Apr 2026', engine: 'Mk II', objective: 'Comparative KNO₃ grade test — technical vs fertiliser grade in redesigned Mk II casing.' },
  { id: 'C-01', date: '18 Feb 2026', engine: 'Mk I', objective: 'Comparative KNO₃ grade test — technical vs fertiliser grade at Mk I scale.' },
]

export const nextCampaign = {
  id: 'C-03',
  label: 'Campaign 3 — B1M engine static fires',
  engine: 'B1M — 550 mm × 80 mm',
  note: 'First firing of the B1M engine series. Engines in build; propellant characterisation in progress. Targeting ~150 kgf for a 3.5 s burn, with each casing aimed at ≥2 firings before flight.',
  status: 'In build',
}

export const fires = [
  {
    id: 'SF-01',
    campaign: 'C-01',
    date: '18 Feb 2026',
    engine: 'Mk I — 250 mm × 32 mm',
    kno3Grade: 'Technical grade',
    propellant: 'KNO₃ / Sucrose — 70:30',
    mass: '~300 g',
    burnTime: '28 s',
    peakThrust: '—',
    result: 'failure',
    observations: [
      'All thrust data lost — load cell issue.',
      'Nozzle ejected during burn.',
      'Engine casing began melting toward end of burn.',
      'Ground test infrastructure destroyed.',
    ],
    learned: 'Nozzle retention design inadequate for chamber pressure. Casing material insufficient for burn temperature. Technical grade produced a longer, slower burn (28 s) vs fertiliser grade (SF-02: 14 s).',
  },
  {
    id: 'SF-02',
    campaign: 'C-01',
    date: '18 Feb 2026',
    engine: 'Mk I — 250 mm × 32 mm',
    kno3Grade: 'Fertiliser grade',
    propellant: 'KNO₃ / Sucrose — 70:30',
    mass: '~300 g',
    burnTime: '14 s',
    peakThrust: '4.6 kgf (10 kgf on nozzle ejection)',
    result: 'failure',
    observations: [
      'Fertiliser grade produced a significantly faster burn rate than technical grade SF-01 (14 s vs 28 s).',
      'Nozzle ejected again at pressure spike.',
      'Peak thrust of 4.6 kgf measured before nozzle loss; spike to 10 kgf on ejection.',
      'Accidental sonic boom generated on nozzle ejection.',
    ],
    learned: 'Fertiliser grade burns approximately twice as fast as technical grade in this configuration — likely due to impurities acting as burn rate accelerants. Nozzle ejection confirmed as a systematic Mk I design failure, not grade-dependent.',
  },
  {
    id: 'SF-03',
    campaign: 'C-02',
    date: '26 Apr 2026',
    engine: 'Mk II — 300 mm × 30 mm',
    kno3Grade: 'Fertiliser grade',
    propellant: 'KNO₃ / Sucrose — 70:30',
    mass: '400 g',
    burnTime: '—',
    peakThrust: '6.8 kgf',
    result: 'partial',
    observations: [
      'New Mk II engine design — 300 mm long, 30 mm diameter.',
      'Significantly uneven burn rate throughout the firing.',
      'Peak thrust of 6.8 kgf recorded.',
      'Small burn-throughs observed on nozzle and forward closure post-fire.',
      'Case integrity maintained — no ejection or rupture.',
    ],
    learned: 'Fertiliser grade propellant shows uneven burn behaviour in the Mk II geometry. Burn-throughs on both ends indicate hot-gas channeling. First firing to return meaningful thrust data — forward closure redesign required.',
  },
  {
    id: 'SF-04',
    campaign: 'C-02',
    date: '26 Apr 2026',
    engine: 'Mk II — 300 mm × 30 mm',
    kno3Grade: 'Technical grade',
    propellant: 'KNO₃ / Sucrose — 70:30',
    mass: '400 g',
    burnTime: '—',
    peakThrust: '—',
    result: 'failure',
    observations: [
      'Case rupture — catastrophic failure.',
      'All ground test infrastructure destroyed.',
      'Likely cause: burn-through progression from SF-03 failure mode at higher pressure or grain defect.',
    ],
    learned: 'Forward closure burn-through identified in SF-03 is a critical failure path — not cosmetic. Mk II design requires closure redesign and pressure testing before further static fire. Infrastructure rebuild required before next campaign.',
  },
]

export const resultLabel = {
  failure: 'Failure',
  partial: 'Partial',
  success: 'Success',
}

export const nozzleFailures = [
  { fire: 'Mk I', result: 'Nozzle ejected', note: 'Pressure spikes threw the nozzle clear of the motor. Retention became a hard requirement.' },
  { fire: 'Mk II', result: 'Throat burn-through', note: 'Metal couldn’t hold geometry for the full burn. Thermal survival joined the brief.' },
]

export const nozzleBrief = [
  { title: 'Hold the throat', desc: 'Ceramic inserts that keep geometry under chamber heat and pressure — no melt-back, no washout.' },
  { title: 'Stay locked in', desc: 'A stack that survives pressure spikes instead of ejecting like the early Mk I fires.' },
  { title: 'Earn it on the stand', desc: 'Every design gets fired, inspected, and written up with the rest of the test log before it flies on B1M.' },
]

export const nozzlePath = [
  { name: 'Problem locked', detail: 'Ejection and burn-through logged from Mk I–II' },
  { name: 'Materials & inserts', detail: 'Formulations and geometries in design and fab' },
  { name: 'Static-fire proof', detail: 'Fire, inspect, publish — then scale to B1M' },
]

export const octopusHops = [
  { from: 'Pad', to: 'Octopus', desc: 'Instruments and range data leave the pad during static fires and launches.' },
  { from: 'Octopus', to: 'Goods Shed', desc: 'The link delivers that stream into mission control so the team can watch the burn live.' },
  { from: 'Vehicle', to: 'Goods Shed', desc: 'Same pipe, later — telemetry from the rocket into the shed on flight days.' },
]

export const octopusMilestones = [
  {
    label: 'Pad → Goods Shed link',
    status: 'active',
    note: 'In progress — the connection that gets pad data during static fires and launches into Goods Shed mission control.',
  },
  {
    label: 'Vehicle → Goods Shed link',
    status: 'upcoming',
    note: 'Same pipe, later. The link will also carry telemetry from the rocket into the shed on flight days.',
  },
  {
    label: 'First use on B1M-01',
    status: 'upcoming',
    note: 'Static fires and launch support. Target window Q4 2026 – Q1 2027.',
  },
]

export const b1mEngineUpdates = [
  {
    date: '2026-05-01',
    display: 'May 2026',
    title: 'B1M engines in production',
    body: 'We have begun building three B1M engines — 550 mm tall, 80 mm wide, loaded with around 2 kg of KNO₃/Sorbitol at a 65:35 ratio. Design is complete; propellant characterisation and engine build are in progress. We are targeting approximately 150 kgf of thrust for 3.5 seconds per firing, and aiming to reuse each casing for at least two static fires. These are the motors that will fly on STRAVOX B1M-01.',
  },
]

export const news = [
  {
    date: '2026-05-01',
    display: 'May 2026',
    tag: 'Data link',
    title: 'Octopus data link',
    body: 'We are building Octopus — the connection that gets data from the pad during static fires and launches into Goods Shed mission control. It will also support a vehicle-to-mission-control link. Octopus is not planned to be the flight computer; it moves data to the shed so the team can run range operations live.',
  },
  {
    date: '2026-05-01',
    display: 'May 2026',
    tag: 'Programme',
    title: 'B1M engines in production',
    body: 'We have begun building three B1M engines — 550 mm tall, 80 mm wide, loaded with around 2 kg of KNO₃/Sorbitol at a 65:35 ratio. Design is complete; propellant characterisation and engine build are in progress. We are targeting approximately 150 kgf of thrust for 3.5 seconds per firing, and aiming to reuse each casing for at least two static fires. These are the motors that will fly on STRAVOX B1M-01.',
  },
  {
    date: '2026-05-01',
    display: 'May 2026',
    tag: 'Programme',
    title: 'STRAVOX B1M-01 announced',
    body: 'Our first planned mission is STRAVOX B1M-01 — a sub-scale flight to 3 km apogee on a BSZ-built KNSB engine. B1M is our systems validation vehicle: it lets us test avionics, recovery, and propulsion in real flight conditions before committing to the full 30 km STRAVOX programme. We are targeting launch in Q4 2026 to Q1 2027 from a CASA-cleared site in Victoria.',
  },
  {
    date: '2026-04-26',
    display: '26 April 2026',
    tag: 'Testing',
    title: 'Campaign 2: Mk II engine static fires — SF-03 and SF-04',
    body: 'We ran two more static fires on April 26th with our redesigned Mk II engine — 300 mm tall and 30 mm wide, loaded with 400 g of KNO₃/Sorbitol. SF-03 returned our first meaningful thrust data at 6.8 kgf peak, but showed an uneven burn rate and minor burn-throughs on the nozzle and forward closure. SF-04 suffered a case rupture, destroying our ground infrastructure. Both fires were comparative KNO₃ grade tests — SF-03 used fertiliser grade, SF-04 technical grade. Design work on the forward closure and casing continues.',
  },
  {
    date: '2026-02-18',
    display: '18 February 2026',
    tag: 'Testing',
    title: 'Campaign 1: first static fires — SF-01 and SF-02',
    body: 'We conducted our first two static fires on February 18th, testing Mk I engines — 250 mm long, 32 mm wide, loaded with approximately 300 g of KNO₃/Sucrose. SF-01 used technical grade KNO₃ and burned for 28 seconds, but we lost all thrust data and the nozzle ejected, destroying ground equipment. SF-02 used fertiliser grade — it burned twice as fast (14 s), produced a 4.6 kgf peak thrust before nozzle ejection, and accidentally generated a sonic boom. Both fires confirmed nozzle retention as the critical fix for the next design iteration.',
  },
  {
    date: '2025-04-01',
    display: 'April 2025',
    tag: 'Founding',
    title: 'Beyond Stage Zero founded',
    body: "Beyond Stage Zero was founded in April 2025 in Creswick, Victoria, with one goal: design, build, and fly Australia's first fully and rapidly reusable launch vehicle to 30 km apogee with a propulsive vertical landing. Our first rocket is STRAVOX — a 2,633 mm vehicle with a split nosecone airbrake and four folding drone arms for touchdown. The programme starts here.",
  },
].sort((a, b) => new Date(b.date) - new Date(a.date))

export const contactReasons = [
  'Sponsorship or partnership',
  'Joining the team',
  'Media enquiries',
  'General questions',
]
