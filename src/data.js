export const site = {
  name: 'Beyond Stage Zero',
  email: 'contact@beyondstagezero.com',
  x: 'https://x.com/beyondstagezero',
  space: 'https://beyondstagezero.space',
  starship: 'https://starship.beyondstagezero.com',
  place: 'Creswick, VIC · Australia',
  // Stripe Payment Link ("customer chooses what to pay"). Leave empty to show the email fallback.
  stripeSupport: 'https://buy.stripe.com/14A7sKgPz2Nn8jRfWk9R601',
}

export const gallery = [
  { src: '/sf01-burn.jpg', caption: 'SF-01 burning, 18 February 2026.', kind: 'photo' },
  { src: '/sf02-burn.jpg', caption: 'SF-02 burning, 18 February 2026.', kind: 'photo' },
  { src: '/sf04-burn.jpg', caption: 'The start of the SF-04 burn, 26 April 2026.', kind: 'photo' },
  { src: '/sf-c02-dawn-range.jpg', caption: 'Setting up the range before sunrise for SF-03 and SF-04.', kind: 'photo' },
  { src: '/sf-c02-dawn-pad.jpg', caption: 'The test stand on the pad, the morning of SF-03 and SF-04.', kind: 'photo' },
  { src: '/sf-c02-dawn-sky.jpg', caption: 'Sunrise over the range, 26 April 2026.', kind: 'photo' },
  { src: '/sf-c02-dawn-tall.jpg', caption: 'The range from behind the cameras, 26 April 2026.', kind: 'photo' },
  { src: '/b1m-engine-photo.jpg', caption: 'B1M engine casing.', kind: 'photo' },
  { src: '/b1m-engine-disassembled.jpg', caption: 'B1M engine, disassembled.', kind: 'photo' },
  { src: '/b1m-sealant-apply.jpg', caption: 'Applying sealant during B1M engine assembly.', kind: 'photo' },
  { src: '/b1m-sealant-spread.jpg', caption: 'Sealant spread on a B1M engine part.', kind: 'photo' },
  { src: '/nozzle-duracast-1.jpg', caption: 'The first ceramic nozzle, in the current Duracast material.', kind: 'photo' },
  { src: '/nozzle-duracast-2.jpg', caption: 'Another view of the same nozzle.', kind: 'photo' },
  { src: '/nozzle-graphite.jpg', caption: 'A graphite nozzle being machined.', kind: 'photo' },
  { src: '/mould-top.jpg', caption: 'Top-down view of the ceramic in the mould.', kind: 'photo' },
  { src: '/mould-side.jpg', caption: 'Side view of the ceramic in the mould.', kind: 'photo' },
  { src: '/doherty-nozzles.jpg', caption: 'Five ceramic nozzles in their moulds.', kind: 'photo' },
  { src: '/crwa-station.jpg', caption: "The CRWA's railway station.", kind: 'photo' },
  { src: '/crwa-station-yard.jpg', caption: "Another view of the CRWA's railway station.", kind: 'photo' },
  { src: '/crwa-night.jpg', caption: "The CRWA's railway station at night.", kind: 'photo' },
  { src: '/goods-shed.jpg', caption: 'The goods shed.', kind: 'photo' },
  { src: '/b1m-cad.png', caption: 'B1M engine cutaway.', kind: 'render' },
  { src: '/b1m-external1.png', caption: 'B1M engine.', kind: 'render' },
  { src: '/b1m-engine-angle.png', caption: 'B1M engine, angled.', kind: 'render' },
  { src: '/b1m-external2.png', caption: 'B1M engine, side.', kind: 'render' },
  { src: '/b1m-external3.png', caption: 'B1M engine, external.', kind: 'render' },
]

export const nav = [
  { to: '/stravox', label: 'STRAVOX' },
  { to: '/b1m', label: 'B1M' },
  { to: '/b1m-engine', label: 'B1M engine' },
  { to: '/missions', label: 'Missions' },
  { to: '/tests', label: 'Tests' },
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
  { to: '/starship', label: 'Starship tracker' },
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
    body: 'Our 3 km systems-validation vehicle — flying a home-built KNSB motor to prove avionics, recovery, and flight systems before full-scale STRAVOX. Engine design complete. The first engine is done and pending regulatory approval; two are still in production, and propellant work continues.',
    to: '/b1m',
    action: 'Explore B1M',
    meta: [
      ['Apogee', '3 km'],
      ['Thrust', '200 kgf'],
      ['Window', "Q1–Q2'27"],
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
      ['Hop test', '100 m · on hold'],
      ['Full scale', 'STRAVOX · 30 km'],
    ],
  },
  {
    kicker: 'Propulsion · Ground test',
    title: 'Engine tests',
    body: 'Static-fire campaigns, engine builds, and propellant work that feed every vehicle we fly. Mk I and Mk II results are public. The first B1M static fire is pending regulatory approval, and the stand is still in production.',
    to: '/tests',
    action: 'See the test log',
    meta: [
      ['Static fires', '4 completed'],
      ['Engines built', '10 total'],
      ['Next campaign', 'B1M static fires'],
    ],
  },
  {
    kicker: 'Propulsion · Materials',
    title: 'Ceramic nozzles',
    body: 'To lower the cost of a nozzle compared to graphite. Mould v15 is the current design and 8 nozzles are complete. The next batch is a nozzle redesigned to suit ceramic casting, waiting on the ceramic.',
    to: '/nozzles',
    action: 'Explore the programme',
    meta: [
      ['Mould', 'v15'],
      ['Completed', '8'],
      ['Next batch', 'Redesigned for ceramic'],
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
    role: 'Supporter',
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
  { index: '01', title: 'Student led', desc: 'Every part of the work is driven by students.' },
  { index: '02', title: 'Ambitious', desc: "We set out to build Australia's first fully and rapidly reusable launch vehicle." },
  { index: '03', title: 'Collaborative', desc: 'We bring together engineers, scientists, and builders from across disciplines.' },
  { index: '04', title: 'Open', desc: 'We share our progress, failures, and learnings with the broader community.' },
]

export const team = [
  'Will',
  'Seb',
  'Jet',
  'Columbus',
  'Arnav',
  'Wave',
  'Sage',
  'Abby',
  'Alice',
  'Chelsea',
  'Declan M',
  'Declan S',
  'Lilly',
  'Nia',
  'Oscar',
  'Zafran',
  'Ziad',
]

export const disciplines = [
  { code: 'PROP', title: 'Propulsion', desc: 'Home-built KNSB motors — casing design, propellant casting, nozzle work, and static-fire campaigns from Mk I through B1M.' },
  { code: 'STRU', title: 'Structures', desc: 'Airframe, fins, and recovery bay design for B1M and full-scale STRAVOX — machined and assembled in Creswick.' },
  { code: 'AVIO', title: 'Avionics', desc: 'Flight computer, altimeter, GPS, and recovery electronics sized for sub-scale flight before the 30 km vehicle.' },
  { code: 'LINK', title: 'Range data', desc: 'Octopus — the pad and vehicle data link into Goods Shed mission control for live static fires and launches.' },
  { code: 'RECO', title: 'Recovery & landing', desc: 'Parachute recovery for B1M. Propulsive vertical landing, on folding drone arms, for full-scale STRAVOX.' },
  { code: 'OPS', title: 'Mission ops', desc: 'CASA range path, Victorian launch planning, and Goods Shed operations for the flight programme.' },
]

export const record = [
  { val: '4', lbl: 'Static fires completed', note: 'Mk I & Mk II campaigns logged and published' },
  { val: '10', lbl: 'Engines built', note: 'From early ground motors to B1M production' },
  { val: '1', lbl: 'B1M engine complete', note: 'Static fire pending regulatory approval. Two engines still in production.' },
  { val: '8', lbl: 'Ceramic nozzles completed', note: 'Current mould: v15. Next batch: a nozzle redesigned for ceramic.' },
  { val: 'Apr 2025', lbl: 'Founded', note: 'Creswick, Victoria — programme start' },
  { val: "Q1–Q2'27", lbl: 'First flight window', note: 'STRAVOX B1M-01 · 3 km systems validation' },
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
    body: 'Development and testing of KNSB propulsion across three engine generations. B1M engine design is complete. The first engine is done and pending regulatory approval; two are still in production. Propellant characterisation continues ahead of a static fire campaign (200 kgf, 3 s burn).',
    readout: [['B1M design', 'Done'], ['B1M engines', '1 done, 2 in build'], ['Status', 'Active']],
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

export const b1mMotorSpecs = [
  { lbl: 'Thrust', val: '200', unit: 'kgf', note: 'Target thrust for a 3 second burn.' },
  { lbl: 'Burn', val: '3', unit: 's', note: 'Target burn time.' },
  { lbl: 'In production', val: '2', unit: 'engines', note: 'Two of three still in build with Federation University.' },
  { lbl: 'First engine', val: '1', unit: 'done', note: 'Build finished. Pending regulatory approval.' },
  { lbl: 'Casing', val: '550', unit: 'mm', note: 'Motor length. 80 mm diameter.' },
  { lbl: 'Diameter', val: '80', unit: 'mm', note: 'Motor casing outer diameter.' },
  { lbl: 'Propellant', val: '2.9', unit: 'kg', note: 'KNO₃/Sorbitol 65:35.' },
]

export const b1mSpecs = [
  ['Role', 'Sub-scale test vehicle'],
  ['Target apogee', '3 km'],
  ['Motor', 'KNSB B1M — 550 mm × 80 mm'],
  ['Propellant', '2.9 kg KNO₃/Sorbitol 65:35'],
  ['Expected thrust', '200 kgf for 3 s'],
  ['Engines in production', '2 of 3'],
  ['First engine', 'Done — pending regulatory approval'],
  ['Collaboration', 'Federation University'],
  ['Purpose', 'Systems validation for STRAVOX'],
  ['Launch site', 'Victoria, AUS'],
  ['Status', 'In development'],
  ['First flight', 'Q1 – Q2 2027 — B1M-01'],
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
  { label: 'B1M engine design', status: 'done', note: 'Design complete — 550 mm × 80 mm casing, 2.9 kg KNO₃/Sorbitol 65:35.' },
  { label: 'Static fire stand design', status: 'done', note: 'Design complete.' },
  { label: 'Propellant characterisation', status: 'active', note: 'In progress — refining burn behaviour and propellant performance ahead of B1M static fires.' },
  { label: 'B1M engine build', status: 'done', note: 'Done — the first B1M engine is complete. Two more are still in production with Federation University.' },
  { label: 'Static fire stand construction', status: 'active', note: 'In progress — the stand is being built for the B1M static fires.' },
  { label: 'B1M pressure test campaign', status: 'upcoming', note: 'Starting soon — 100, 150, 500 and 1000 psi, then 1200 psi with the igniter lit first, to test like we fly.' },
  { label: 'B1M engine static fires', status: 'upcoming', note: 'Ground firing campaign to validate the motor before flight (200 kgf, 3 s burn).' },
  { label: 'Vehicle design', status: 'done', note: 'Design complete — airframe, fins, and recovery bay sized for the B1M engine.' },
  { label: 'Vehicle fabrication', status: 'upcoming', note: 'Airframe construction and component manufacture.' },
  { label: 'Avionics integration', status: 'upcoming', note: 'Flight computer, altimeter, GPS, and recovery electronics — with Octopus linking pad/vehicle data to Goods Shed mission control.' },
  { label: 'CASA range clearance', status: 'upcoming', note: 'Regulatory approval for launch at a CASA-cleared site in Victoria.' },
  { label: 'STRAVOX B1M-01 launch', status: 'upcoming', note: 'Target window Q1 – Q2 2027. 3 km apogee. Full flight telemetry. Recover and review.' },
]

export const missions = [
  {
    id: 'STRAVOX-B1M-01',
    num: 'Mission 01',
    name: 'STRAVOX B1M-01',
    status: 'Planned',
    year: 'Q1 – Q2 2027',
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
      { label: 'B1M engine design', status: 'done', note: 'Design complete — 550 mm × 80 mm casing, 2.9 kg KNO₃/Sorbitol 65:35.' },
      { label: 'Static fire stand design', status: 'done', note: 'Design complete.' },
      { label: 'Propellant characterisation', status: 'active', note: 'In progress — refining burn behaviour and propellant performance ahead of B1M static fires.' },
      { label: 'B1M engine build', status: 'done', note: 'Done — the first B1M engine is complete. Two more are still in production with Federation University.' },
      { label: 'Static fire stand construction', status: 'active', note: 'In progress — the stand is being built for the B1M static fires.' },
      { label: 'Launch pad design', status: 'active', note: 'In progress — the pad for STRAVOX B1M-01.' },
      { label: 'B1M pressure test campaign', status: 'upcoming', note: 'Starting soon — 100, 150, 500 and 1000 psi, then 1200 psi with the igniter lit first, to test like we fly.' },
      { label: 'B1M engine static fires', status: 'upcoming', note: 'Ground firing campaign to validate B1M motor before flight (200 kgf, 3 s burn).' },
      { label: 'Vehicle design', status: 'done', note: 'Design complete — airframe, fins, and recovery bay sized for the B1M engine.' },
      { label: 'Vehicle fabrication', status: 'upcoming', note: 'Airframe construction and component manufacture.' },
      { label: 'Avionics integration', status: 'upcoming', note: 'Flight computer, altimeter, GPS, and recovery electronics — with Octopus linking pad/vehicle data to Goods Shed mission control.' },
      { label: 'Ground systems test', status: 'upcoming', note: 'Full vehicle systems check on the pad before flight.' },
      { label: 'CASA range clearance', status: 'upcoming', note: 'Regulatory approval for launch at a CASA-cleared site in Victoria.' },
      { label: 'Launch readiness review', status: 'upcoming', note: 'Final internal review before committing to launch day.' },
      { label: 'STRAVOX B1M-01 launch', status: 'upcoming', note: 'Target window Q1 – Q2 2027. 3 km apogee. Full flight telemetry. Recover and review.' },
    ],
  },
]

export const upcoming = [
  { id: 'STRAVOX-HOP-01', name: 'STRAVOX — 100 m Hop Test', note: 'Low-altitude hop of STRAVOX to roughly 100 m under drone-engine power only — no main motor. Validates propulsive landing, drone-arm deployment, and vehicle handling before higher-energy flights. Delayed indefinitely for now.', year: 'Delayed indefinitely' },
  { id: 'STRAVOX-B1M-02', name: 'STRAVOX B1M-02', note: 'Second B1M flight incorporating fixes and improvements from B1M-01. Objectives TBD based on B1M-01 data.', year: 'TBD' },
  { id: 'STRAVOX-01', name: 'STRAVOX — Full Scale', note: 'The main event. 30 km apogee, Mach 2.5, propulsive vertical landing. Timeline depends on B1M programme outcomes.', year: 'TBD' },
]

export const engineSummary = [
  { label: 'Mk I engines built', val: '3', sub: '250 mm × 32 mm — 2 fired, 1 held' },
  { label: 'Mk II engines built', val: '6', sub: '300 mm × 30 mm — 2 fired, 4 remaining' },
  { label: 'B1M engines built', val: '1', sub: '550 mm × 80 mm · 2.9 kg KNO₃/Sorbitol 65:35 · 200 kgf for 3 s · complete, pressure testing next' },
  { label: 'B1M engines in build', val: '2', sub: '550 mm × 80 mm · still in build with Federation University' },
]

export const campaigns = [
  {
    id: 'C-02',
    date: '26 Apr 2026',
    engine: 'Mk II',
    objective: 'Comparative KNO₃ grade test — technical vs fertiliser grade in redesigned Mk II casing.',
    photos: [
      { src: '/sf-c02-dawn-range.jpg', caption: 'Setting up the range before sunrise, 26 April.' },
      { src: '/sf-c02-dawn-pad.jpg', caption: 'The test stand on the pad.' },
      { src: '/sf-c02-dawn-sky.jpg', caption: 'Sunrise over the range, the morning of SF-03 and SF-04.' },
    ],
  },
  { id: 'C-01', date: '18 Feb 2026', engine: 'Mk I', objective: 'Comparative KNO₃ grade test — technical vs fertiliser grade at Mk I scale.' },
]

export const upNext = [
  {
    id: 'Next',
    label: 'B1M pressure test campaign',
    engine: 'B1M — 550 mm × 80 mm',
    note: 'We are about to pressure test the first B1M engine, stepping the pressure up in stages. The final 1200 psi test is run like a real firing: we light the igniter as if it were lighting the propellant grain, then straight away pressurise the engine to 1200 psi, so it is tested the way it will fly. It needs to pass before its first static fire. Pressure testing was one of the main lessons from SF-04, where the Mk II case ruptured.',
    steps: [
      { label: '100 psi', when: 'Week of 2 Nov' },
      { label: '150 psi', when: 'Week of 9 Nov' },
      { label: '500 psi' },
      { label: '1000 psi' },
      { label: '1200 psi + igniter' },
    ],
    status: 'Starting soon',
  },
  {
    id: 'C-03',
    label: 'Campaign 3 — B1M engine static fires',
    engine: 'B1M — 550 mm × 80 mm',
    note: 'First firing of the B1M engine series, once the pressure test is done. The first static fire is pending regulatory approval; two more engines are still in production with Federation University. Targeting 200 kgf for a 3 s burn, with each casing aimed at ≥2 firings before flight.',
    status: 'Pending approval',
  },
]

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
    photo: { src: '/sf01-burn.jpg', caption: 'SF-01 burning, 18 February 2026.', portrait: true },
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
    photo: { src: '/sf02-burn.jpg', caption: 'SF-02 burning, 18 February 2026.', portrait: true },
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
    photo: { src: '/sf04-burn.jpg', caption: 'The start of the SF-04 burn.' },
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

export const nozzleDesign = {
  kicker: 'Aim',
  title: 'The nozzle.',
  body: 'Moulding a ceramic nozzle removes buying graphite stock and having it machined.',
  costs: [
    {
      label: 'Graphite',
      value: '~$300',
      note: 'Average for a B1M-sized engine. Bought as stock, then machined.',
    },
    {
      label: 'Ceramic',
      value: '~$10',
      note: 'The production cost we are aiming for.',
    },
  ],
  figures: [
    {
      id: 'duracast-1',
      title: 'The first ceramic nozzle, in the current Duracast material.',
      src: '/nozzle-duracast-1.jpg',
      alt: 'The first ceramic nozzle, in the current Duracast material.',
    },
    {
      id: 'duracast-2',
      title: 'Another view of the same nozzle.',
      src: '/nozzle-duracast-2.jpg',
      alt: 'Another view of the first ceramic nozzle, in the current Duracast material.',
    },
    {
      id: 'graphite',
      title: 'A graphite nozzle being machined.',
      src: '/nozzle-graphite.jpg',
      alt: 'A graphite nozzle being machined on a lathe.',
    },
  ],
  more: { to: '/gallery', label: 'All photos' },
}

export const nozzleMould = {
  kicker: 'Current mould',
  title: 'Mould v15.',
  body: 'Four pieces: two halves for the outer diameter, a converging piece, and a throat piece.',
  figures: [
    {
      id: 'mould-top',
      title: 'Top-down view of the ceramic in the mould.',
      src: '/mould-top.jpg',
      alt: 'Top-down view of the ceramic in the mould.',
    },
    {
      id: 'mould-side',
      title: 'Side view of the ceramic in the mould.',
      src: '/mould-side.jpg',
      alt: 'Side view of the ceramic in the mould.',
    },
  ],
}

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
    note: 'Static fires and launch support. Target window Q1 – Q2 2027.',
  },
]

export const b1mEngineUpdates = [
  {
    date: '2026-10-20',
    display: '20 October 2026',
    title: 'First B1M engine complete',
    body: 'The first B1M engine is complete. The first static fire is pending regulatory approval, and two engines are still in production with Federation University.',
  },
  {
    date: '2026-05-01',
    display: 'May 2026',
    title: 'B1M engines in production',
    body: 'We have begun building three B1M engines — 550 mm tall, 80 mm wide, loaded with around 2 kg of KNO₃/Sorbitol at a 65:35 ratio. Design is complete; propellant characterisation and engine build are in progress. We are targeting approximately 150 kgf of thrust for 3.5 seconds per firing, and aiming to reuse each casing for at least two static fires. These are the motors that will fly on STRAVOX B1M-01.',
  },
]

export const news = [
  {
    date: '2026-10-20',
    display: '20 October 2026',
    tag: 'Programme',
    title: 'First B1M engine complete',
    body: 'The first B1M engine is complete. The first static fire is pending regulatory approval, and two engines are still in production with Federation University.',
  },
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
  'Ceramic nozzle enquiries',
  'General questions',
]

// Ceramic nozzle pre-orders (/nozzles/preorder).
// For each standard size: set the real throat/exit/price, then create a Stripe
// Payment Link and paste it into `stripeLink`. Anything left null shows "TBC";
// an empty `stripeLink` shows an "Email to pre-order" button instead.
export const nozzlePreorder = {
  shipWindow: 'first half of 2027', // read as "ships in the …"; null hides it
  currency: 'AUD',
  // Overseas visitors also see an estimate in their own currency. Stripe
  // Adaptive Pricing sets the real price at checkout. `perAud` = how much of
  // that currency one AUD buys. Update these every so often.
  localCurrencies: {
    USD: { symbol: 'US$', perAud: 0.65 },
    EUR: { symbol: '€', perAud: 0.60 },
    GBP: { symbol: '£', perAud: 0.51 },
    NZD: { symbol: 'NZ$', perAud: 1.10 },
    CAD: { symbol: 'CA$', perAud: 0.90 },
    JPY: { symbol: '¥', perAud: 98 },
    SGD: { symbol: 'S$', perAud: 0.86 },
    INR: { symbol: '₹', perAud: 55 },
    CHF: { symbol: 'CHF ', perAud: 0.53 },
    SEK: { symbol: 'kr ', perAud: 6.3 },
    NOK: { symbol: 'kr ', perAud: 6.7 },
    DKK: { symbol: 'kr ', perAud: 4.5 },
  },
  // Empty = custom orders only; the standard-sizes section is hidden. To add one:
  // { id: 'cn-30', name: 'CN-30', motor: '30 mm motors', throat: '8 mm', exit: '18 mm', price: 45, stripeLink: 'https://buy.stripe.com/...' },
  sizes: [],
}

// Ceramic nozzle research page (/nozzles/research), from the 2026 Peter
// Doherty Science Award poster. Files live in public/research/.
export const nozzleResearch = {
  question: 'Can an AI agent controlling CAD improve a basic mould until it casts an accurate ceramic rocket nozzle?',
  asOf: 'Poster results as of 2 November 2026. Since then we have made mould v15, our current design.',
  authors: 'Katie Newton and Will Grant',
  poster: {
    image: '/research/doherty-poster.jpg',
    pdf: '/research/beyond-stage-zero-peter-doherty-poster.pdf',
    alt: 'Our Peter Doherty Science Award poster: Can an AI agent controlling CAD improve a basic mould until it casts an accurate ceramic rocket nozzle?',
  },
  headline: [
    { label: 'Nozzle cost', value: '~$300 → ~$4.50', note: 'Graphite vs our competition nozzles' },
    { label: 'Best score /10', value: '6 → 9', note: 'v1 to v14' },
    { label: 'Moulds', value: '14', note: '12 developed by the AI agent (v15 since)' },
  ],
  howItStarted:
    "The team's first quote for a full graphite nozzle showed how expensive it would be. The team has made one, but when lots of them are needed, the cost goes up very quickly. A search for heat-resistant materials showed ceramic near the top of the list. Ceramic could be moulded and fired in the team's kiln: cheap, durable, no machining, less time and money per nozzle, and a lower barrier to entry for others to try the same thing at a really affordable price.",
  introduction:
    "Claude Opus 5.5 (an AI agent) operated Onshape to develop the team's basic starting mould (v0), one version at a time. v1–v2 were cast in air-dry clay, v3–v11 were test-fitted only, and v12 onwards were cast in Duracast.",
  aim: 'To test whether an AI agent controlling CAD can improve a basic mould until it casts an accurate, complete Duracast nozzle.',
  variables: [
    ['Independent', 'Mould version'],
    ['Dependent', 'Score /10 (converging and diverging), human fixes, final throat vs 16 mm'],
    ['Controlled', 'Nozzle geometry, release, drying, printer, PLA'],
  ],
  hypothesis:
    "If Claude Opus 5.5 redesigns the mould in Onshape after each test-fit or cast using the team's feedback, then later versions will score higher for both the converging and diverging sections and need fewer human fixes, because each version corrects the last one's faults.",
  moulds: [
    { src: '/research/mould-v0.jpg', caption: 'v0: the starting mould' },
    { src: '/research/mould-v14.jpg', caption: "v14: Claude's final" },
  ],
  method: [
    { src: '/research/method-1-onshape.jpg', alt: 'Claude designing the mould in Onshape', text: 'Design a basic mould (v0); Claude develops it in Onshape.' },
    { src: '/research/method-2-print.jpg', alt: 'The 3D printer used for the moulds', text: '3D print the PLA mould and coat it with release.' },
    { src: '/research/method-3-cast.jpg', alt: 'A cast nozzle in its mould pieces', text: 'Pour the clay or Duracast, demould, then fire Duracast in the kiln.' },
    { src: '/research/method-4-measure.jpg', alt: 'Measuring a nozzle with callipers', text: 'Test-fit or cast, then score each section /10; the team or Claude fixes the mould.' },
  ],
  scoring: [
    'Materials: clay (v1–v2), Duracast (v12+), PLA/PETG printer, release, scales, kiln.',
    'Score /10 per section: 3 checks (0–3) + 1 if throat and exit are within 0.5 mm.',
    'Throat and cone angles: custom measuring rod.',
    'Air bubbles: real mass vs mass from density × volume.',
    'Layer lines and cracks: judged by eye.',
  ],
  results: [
    { label: 'Human fixes', value: '12', note: 'Changes the team made by hand' },
    { label: 'Throat error', value: '±0.5 mm', note: 'Final nozzle vs 16 mm' },
    { label: 'Cost per nozzle', value: '~$4.50', note: 'The nozzles we made for the competition, vs ~$300 graphite. Future nozzles are projected to cost more.' },
  ],
  table: [
    ['v0', '–', 'Not cast', 'Not cast', '0', 'Starting design'],
    ['v1', 'Air-dry clay', '4', '6', '3', 'Close to accurate'],
    ['v2', 'Air-dry clay', '1', '1', '1', 'Clay design; failed'],
    ['v3–v11', '–', 'Not cast', 'Not cast', '3', 'Test-fit only'],
    ['v12', 'Duracast', '3', '5', '1', 'Throat off'],
    ['v13', 'Duracast', '5', '6', '4', 'Throat fixed'],
    ['v14 #1', 'Duracast', '7', '9', '0', '0% rocks, 40 g water, PLA'],
    ['v14 #2', 'Duracast', '7', '9', '0', '20% rocks, 40 g water, PLA'],
  ],
  figures: [
    { src: '/research/best-nozzle.jpg', caption: 'Best nozzle' },
    { src: '/research/split-cast.jpg', caption: 'Split cast' },
  ],
  discussion: [
    ['Mould material', 'Cooled PLA released easily; PETG bonded to the cast and broke the nozzle.'],
    ['Mix', 'Disk break tests showed 0% rocks was stronger than 20% (40 g water). Both v14 nozzles scored 7 and 9, so the mould cast consistently.'],
    ['Score dips', 'v2 and v12 scored below v1. From v2, Claude took steps back and got confused; test-fits showed v3–v11 would do worse, so they were not cast.'],
    ['Errors and improvements', 'Mostly one nozzle per version; cracks judged by eye. Next: 3 casts per version, 2 scorers, log fixes live.'],
  ],
  otherNozzles:
    'Graphite must be machined (~$300), steel is heavy and erodes, phenolics burn away, copper and tungsten cost far more. Cast ceramic: ~$4.50, no machining, but brittle.',
  conclusion:
    "An AI agent controlling Onshape developed the team's basic mould into a v14 mould that cast a complete Duracast nozzle. Scores rose from 4/10 and 6/10 (v1) to 7/10 and 9/10 (v14), and the team made 12 hand fixes, peaking at 4 on v13, so the hypothesis was partly supported. Casting removed all machining and cut nozzle cost from ~$300 to ~$4.50. Converging scores stayed lower because the B1M nozzle's converging section tapers to a thin point that ceramic cannot form, so instead of fixing v14, the team is redesigning the nozzle for ceramic and running new B1M simulations.",
  roadmap: [
    ['Now', 'Cast in AI-developed moulds (this poster)'],
    ['Next', 'Redesign the nozzle + new B1M simulations'],
    ['Then', 'Static fire test the new nozzle'],
    ['Then', 'Integrate into B1M + launch STRAVOX'],
  ],
  risks: [
    'Refractory dust is harmful to breathe in: wear a P2 mask when mixing.',
    'Wet castable is caustic: gloves and safety glasses.',
    'Burns from the kiln and hot nozzles.',
    'Trapped moisture can flash to steam and burst the nozzle: dry fully before heating.',
    'A nozzle can crack from thermal shock and throw fragments: test remotely behind a barrier.',
  ],
  references: [
    'Anthropic (2026) Claude Opus 5.5 [AI model]. Available at: claude.ai.',
    'Artisan Supplies (n.d.) Duracast Castable Refractory 25kg. Available at: artisansupplies.com.au.',
    'Graphite Australia (2026) Quote for a machined graphite rocket nozzle [personal communication].',
    'PTC (2026) Onshape [CAD software]. Available at: onshape.com.',
  ],
  acknowledgements:
    'Claude designed the moulds in Onshape. Thanks to the Creswick Railway Workshops Association for letting us use their kilns and FED Uni for making the test hardware.',
  doherty: {
    year: '2026',
    body: 'Our entry this year, through Ballarat Tech School.',
    href: 'https://ballarattechschool.vic.edu.au/programs/peter-doherty-science-award',
    photo: { src: '/doherty-nozzles.jpg', alt: 'Five ceramic nozzles in their moulds', caption: 'Five ceramic nozzles in their moulds.' },
  },
}
