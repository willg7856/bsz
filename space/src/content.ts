/**
 * All site copy lives here. Data only — no JSX.
 * Edit this file to change any word on the website.
 */

export type NavLink = { href: string; label: string };
export type SpecRow = { label: string; value: string; hot?: boolean };
export type StatItem = {
  value: string;
  label: string;
  tone?: "default" | "hot" | "partial" | "failure" | "success";
};
export type Partner = { name: string; note?: string };
export type ValueItem = { numeral: string; title: string; body: string };
export type Subsystem = { number: string; title: string; body: string };
export type SpecCell = { label: string; value: string; unit: string; note: string };
export type BuildStage = {
  id: string;
  name: string;
  window: string;
  status: "done" | "now" | "next";
};
export type Milestone = {
  title: string;
  status: "active" | "upcoming";
  badge: string;
  detail: string;
};
export type MissionCard = {
  code: string;
  title: string;
  summary: string;
  date: string;
};
export type TestStatus = "partial" | "failure" | "success";
export type TestEntry = {
  id: string;
  badge: string;
  status: TestStatus;
  specs: SpecRow[];
  observations: string[];
  learned: string;
};
export type TestCampaign = {
  id: string;
  title: string;
  date: string;
  summary: string;
  entries: TestEntry[];
};
export type ContactReason = { label: string; subject: string };
export type FlightPhase = {
  id: string;
  title: string;
  icon: string;
  color: "hot" | "airbrake" | "success";
  specs: SpecRow[];
  body: string;
};

export const site = {
  name: "Beyond Stage Zero",
  shortName: "BSZ",
  email: "beyondstagezero@gmail.com",
  location: "Victoria · Australia",
  founded: "2025",
  copyright: "© 2026 BEYOND STAGE ZERO",
  foundedLine: "FOUNDED 2025",
  tagline: "An Australian student rocketry team building Australia's first fully and rapidly reusable launch vehicle.",
  url: "https://beyondstagezero.space",
  sisterSiteUrl: "https://beyondstagezero.com",
  sisterSiteLabel: ".com",
} as const;

export const nav = {
  links: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/missions", label: "Missions" },
    { href: "/tests", label: "Tests" },
    { href: "/contact", label: "Contact" },
  ] satisfies NavLink[],
  vehicles: [
    {
      href: "/stravox",
      label: "STRAVOX",
      note: "Full-scale reusable launch vehicle",
    },
    {
      href: "/b1m",
      label: "STRAVOX B1M",
      note: "Sub-scale 3 km test vehicle",
    },
    {
      href: "/nozzles",
      label: "Ceramic Nozzles",
      note: "Ceramic nozzle development programme",
    },
  ],
  sisterCta: { href: "https://beyondstagezero.com", label: ".com" },
  logoMark: "0]",
  logoSlash: "//",
  wordmark: "BEYOND STAGE ZERO",
} as const;

export const footer = {
  pagesLabel: "Pages",
  contactLabel: "Contact",
  pages: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/stravox", label: "STRAVOX" },
    { href: "/b1m", label: "B1M" },
    { href: "/missions", label: "Missions" },
    { href: "/tests", label: "Tests" },
    { href: "/nozzles", label: "Nozzles" },
    { href: "/contact", label: "Contact" },
  ] satisfies NavLink[],
} as const;

export const home = {
  meta: {
    title: "Beyond Stage Zero — Independent Student Rocketry",
    description:
      "An independent Australian student rocketry team designing, building, and flying STRAVOX to 30 km apogee.",
  },
  hero: {
    eyebrow: "[ STAGE 02 / ENGINE DEV. ] · ACTIVE",
    wordmarkLines: ["BEYOND", "STAGE", "ZERO"],
    subhead: "AUSTRALIA'S FIRST FULLY AND RAPIDLY REUSABLE LAUNCH VEHICLE.",
    body: "An independent Australian student rocketry team designing, building, and flying STRAVOX to 30 km apogee.",
    ctaPrimary: { href: "/stravox", label: "EXPLORE THE ROCKET →" },
    ctaSecondary: { href: "/contact", label: "GET INVOLVED" },
    specs: [
      { label: "Apogee target", value: "30.0 km", hot: true },
      { label: "Length", value: "2,633 mm" },
      { label: "Peak velocity", value: "Mach 2.5" },
      { label: "Founded", value: "2025 · Victoria" },
    ] satisfies SpecRow[],
  },
  partners: {
    eyebrow: "— PARTNERS & SUPPORTERS",
    items: [
      { name: "Creswick Railway Workshops Association" },
      { name: "Ballarat Tech School", note: "Partner — not a parent organisation" },
    ] satisfies Partner[],
  },
  stats: [
    { value: "4", label: "Static fires completed" },
    { value: "9", label: "Engines built" },
    { value: "3 km", label: "First mission target" },
    { value: "2026", label: "First launch year" },
  ] satisfies StatItem[],
  teaser: {
    eyebrow: "— CURRENTLY IN DEVELOPMENT",
    title: "STRAVOX",
    body: "A 2,633 mm vehicle targeting 30 km apogee at Mach 2.5 — with a split nosecone airbrake and propulsive vertical landing on four folding drone arms.",
    link: { href: "/stravox", label: "EXPLORE THE DESIGN →" },
    imageAlt:
      "Placeholder render of STRAVOX: tall cylindrical airframe with dual fin sets and folded landing arms",
  },
  projects: [
    {
      eyebrow: "— FLIGHT PROGRAMME",
      title: "MISSIONS",
      body: "From the STRAVOX B1M 3 km sub-scale flight to the 100 m drone-powered hop and full-scale 30 km attempt — every planned flight in one place.",
      link: { href: "/missions", label: "VIEW THE MISSION PIPELINE →" },
      meta: [
        { label: "Next up", value: "B1M-01 · 3 km" },
        { label: "Hop test", value: "100 m · drone power" },
        { label: "Full scale", value: "STRAVOX · 30 km" },
      ],
      tone: "light",
    },
    {
      eyebrow: "— PROPULSION · GROUND TEST",
      title: "ENGINE TESTS",
      body: "Static-fire campaigns, engine builds, and propellant work that feed every vehicle we fly. Mk I and Mk II results are public — B1M motors are next on the stand.",
      link: { href: "/tests", label: "SEE THE TEST LOG →" },
      meta: [
        { label: "Static fires", value: "4 completed" },
        { label: "Engines built", value: "9 total" },
        { label: "Next campaign", value: "B1M static fires" },
      ],
      tone: "dark",
    },
    {
      eyebrow: "— PROPULSION · MATERIALS",
      title: "CERAMIC NOZZLES",
      body: "A programme to design and qualify ceramic nozzles that survive our burns — after early motors lost nozzles to ejection and thermal damage.",
      link: { href: "/nozzles", label: "EXPLORE THE PROGRAMME →" },
      meta: [
        { label: "Status", value: "Active" },
        { label: "Focus", value: "Retention + heat" },
        { label: "Target", value: "B1M integration" },
      ],
      tone: "light",
    },
  ],
} as const;

export const about = {
  meta: {
    title: "About — Beyond Stage Zero",
    description:
      "An independent Australian student rocketry team pushing the limits of what students can design, build, and launch.",
  },
  hero: {
    eyebrow: "— WHO WE ARE",
    wordmarkLines: ["BEYOND", "STAGE", "ZERO"],
    body: "An independent Australian student rocketry team pushing the limits of what students can design, build, and launch.",
    stats: [
      { value: "12", label: "Team members" },
      { value: "2025", label: "Founded" },
      { value: "Victoria", label: "Based across" },
    ] satisfies StatItem[],
  },
  mission: {
    eyebrow: "— OUR MISSION",
    title: "WHY WE BUILD.",
    body: "We exist to prove that students can compete at the highest levels of rocketry. From our first designs to the launch pad, we are building the experience, knowledge, and hardware to send STRAVOX into the sky — and to inspire the next generation of Australian aerospace engineers.",
  },
  quote: {
    text: "STAGE ZERO IS THE GROUND. EVERYTHING BEYOND IT IS WHAT WE'RE BUILDING TOWARD.",
    side: [
      "Beyond Stage Zero started with a simple question: why can't Australian students build something that competes with the best rocketry programmes in the world? We didn't have a good answer, so we started building.",
      "We're spread across Victoria — machining our own motor casings, casting our own propellant, writing our own flight software, and learning everything the hard way. Every failure is logged. Every test is published.",
    ],
  },
  values: {
    eyebrow: "— OUR VALUES",
    items: [
      {
        numeral: "01",
        title: "STUDENT LED",
        body: "Every part of the project — from design to launch — is driven by students.",
      },
      {
        numeral: "02",
        title: "AMBITIOUS",
        body: "We set out to build Australia's first fully and rapidly reusable launch vehicle.",
      },
      {
        numeral: "03",
        title: "COLLABORATIVE",
        body: "We bring together engineers, scientists, and builders from across disciplines.",
      },
      {
        numeral: "04",
        title: "OPEN",
        body: "We share our progress, failures, and learnings with the broader community.",
      },
    ] satisfies ValueItem[],
  },
} as const;

export const stravox = {
  meta: {
    title: "STRAVOX — Beyond Stage Zero",
    description:
      "STRAVOX: 2,633 mm rocket targeting 30 km apogee at Mach 2.5 with split nosecone airbrake and propulsive vertical landing.",
  },
  hero: {
    eyebrow: "— THE ROCKET",
    title: "STRAVOX",
    body: "Australia's first fully and rapidly reusable launch vehicle. A 2,633 mm high-power vehicle with a split nosecone airbrake and propulsive vertical landing.",
    specs: [
      { label: "Height", value: "2,633 mm" },
      { label: "Target apogee", value: "30.0 km", hot: true },
      { label: "Peak velocity", value: "Mach 2.5" },
      { label: "Landing T/W", value: "2.05×" },
    ] satisfies SpecRow[],
  },
  cutaway: {
    imageAlt:
      "Placeholder cutaway of STRAVOX showing nosecone, avionics bay, airframe, KNSB motor, fins, and landing arms",
    subsystems: [
      {
        number: "01",
        title: "SPLIT NOSECONE",
        body: "Clamshell design that opens after burnout to expose a 3.5× larger drag area — passively braking the vehicle from Mach 2.5 down to ~64 m/s for the landing sequence.",
      },
      {
        number: "02",
        title: "AVIONICS + BATTERY BAY",
        body: "Flight computer, altimeter, GPS, and recovery electronics. Controls nosecone deployment, drone arm extension, and the full propulsive landing sequence.",
      },
      {
        number: "03",
        title: "AIRFRAME",
        body: "200 mm diameter tube, 2,633 mm total vehicle height. Upper and lower sections joined by a bolted coupler ring. Carries two independent fin sets.",
      },
      {
        number: "04",
        title: "KNSB MOTOR",
        body: "Home-ground potassium nitrate / sorbitol propellant in a 1 m grain. Pushes STRAVOX past Mach 2.5 before burnout at approximately 10 km altitude.",
      },
      {
        number: "05",
        title: "FINS",
        body: "Two fin sets: 520 mm-span base fins for boost-phase stability and 340 mm-span upper fins for supersonic control throughout flight.",
      },
      {
        number: "06",
        title: "LANDING SYSTEM",
        body: "Four T-Motor U13 II motors extend on folding arms at apogee. Deliver 112 kgf of thrust at a 2.05× thrust-to-weight ratio for a controlled vertical touchdown.",
      },
    ] satisfies Subsystem[],
  },
  specs: {
    eyebrow: "— [ TECHNICAL ]",
    title: "SPECIFICATIONS",
    intro:
      "Every figure on this page comes from a simulated or tested subsystem. We update them after every design revision and every ground test.",
    cells: [
      { label: "Apogee", value: "30", unit: "km", note: "Target altitude above sea level." },
      { label: "Peak velocity", value: "2.5", unit: "Mach", note: "At motor burnout, ~10 km AGL." },
      { label: "Length", value: "2,633", unit: "mm", note: "Full vehicle height, fins included." },
      { label: "Diameter", value: "200", unit: "mm", note: "Airframe outer diameter." },
      { label: "Base fin span", value: "520", unit: "mm", note: "Boost-phase stability fins." },
      { label: "Upper fin span", value: "340", unit: "mm", note: "Supersonic control fins." },
      { label: "Landing thrust", value: "112", unit: "kgf", note: "T-Motor U13 II × 4, combined." },
      { label: "Landing T/W", value: "2.05", unit: "×", note: "Thrust-to-weight at touchdown." },
      { label: "Engine grain", value: "1,000", unit: "mm", note: "KNSB propellant grain length." },
      {
        label: "Launch mass",
        value: "104.8",
        unit: "kg",
        note: "Full vehicle mass at liftoff, including propellant.",
      },
    ] satisfies SpecCell[],
  },
  stages: {
    eyebrow: "— [ PROGRAMME ]",
    title: "STAGES OF THE BUILD.",
    intro:
      "The team is named after this list. Stage Zero is the ground — everything beyond it is what we're doing.",
    items: [
      { id: "00", name: "CONCEPT", window: "2025-Q3", status: "done" },
      { id: "01", name: "DESIGN", window: "2025-Q4", status: "done" },
      { id: "02", name: "ENGINE DEV.", window: "2026-Q1–Q2", status: "now" },
      { id: "03", name: "AVIONICS", window: "2026-Q3", status: "next" },
      { id: "04", name: "FABRICATION", window: "2026-Q4", status: "next" },
      { id: "05", name: "TESTING", window: "2027-Q1", status: "next" },
      { id: "06", name: "LAUNCH", window: "2027-Q2", status: "next" },
    ] satisfies BuildStage[],
    active: {
      title: "ENGINE DEVELOPMENT AND STATIC FIRE CAMPAIGN.",
      body: "Development and testing of KNSB propulsion across three engine generations. Comparative KNO₃ grade testing, B1M engine build, and a full static fire campaign to validate propellant and casing design before flight.",
      stats: [
        { label: "Static fires", value: "4 completed" },
        { label: "B1M engines", value: "3 in build" },
        { label: "Status", value: "ACTIVE", hot: true },
      ] satisfies SpecRow[],
    },
  },
  flight: {
    eyebrow: "— FLIGHT SEQUENCE",
    title: "MISSION PROFILE",
    phases: [
      {
        id: "ascent",
        title: "ASCENT",
        icon: "▲",
        color: "hot",
        specs: [
          { label: "Motor", value: "KNSB" },
          { label: "Grain", value: "1,000 mm" },
          { label: "Peak", value: "Mach 2.5" },
          { label: "Apogee", value: "30 km" },
        ],
        body: "Solid KNSB motor burns through a 1 m grain, accelerating STRAVOX past Mach 2.5 before burnout near 10 km. Dual fin sets keep the stack stable through the boost phase.",
      },
      {
        id: "airbrake",
        title: "AIRBRAKE",
        icon: "●",
        color: "airbrake",
        specs: [
          { label: "Drag increase", value: "3.5×" },
          { label: "Braked speed", value: "~64 m/s" },
          { label: "Base fins", value: "Ejected" },
          { label: "Arms", value: "Grid-finning" },
        ],
        body: "The split nosecone opens after burnout, dumping kinetic energy with a 3.5× drag increase. Base fins eject; landing arms begin to act as grid fins on the way down.",
      },
      {
        id: "landing",
        title: "LANDING",
        icon: "▼",
        color: "success",
        specs: [
          { label: "Motors", value: "U13 II × 4" },
          { label: "Thrust", value: "112 kgf" },
          { label: "T/W", value: "2.05×" },
          { label: "Leg footprint", value: "~180 cm" },
        ],
        body: "Four T-Motor U13 II motors on folding arms deliver a 2.05× thrust-to-weight landing burn for a controlled vertical touchdown.",
      },
    ] satisfies FlightPhase[],
  },
  cta: {
    eyebrow: "— STAY IN THE LOOP",
    title: "WANT TO KNOW MORE?",
    body: "We publish updates as the build continues. Reach out to follow the journey.",
    link: { href: "/contact", label: "CONTACT US →" },
  },
} as const;

export const missions = {
  meta: {
    title: "Missions — Beyond Stage Zero",
    description:
      "Every flight we run has a mission designation, objectives, and a public record — from B1M sub-scale to full STRAVOX.",
  },
  hero: {
    eyebrow: "— [ PROGRAMME ]",
    title: "MISSIONS.",
    body: "Every flight we run has a mission designation, a set of objectives, and a public record. This is the full picture — what we're flying, when, and why.",
    stats: [
      { value: "0", label: "Active missions" },
      { value: "0", label: "Flights completed" },
      { value: "2026", label: "First launch target" },
    ] satisfies StatItem[],
  },
  primary: {
    code: "[ MISSION 01 ]",
    name: "STRAVOX B1M-01",
    badge: "PLANNED",
    subtitle: "Sub-scale test flight. 3 km apogee. Real-world flight data.",
    body: "STRAVOX B1M is our sub-scale test vehicle — designed to reach 3 km apogee on one of our own KNSB engines and return real-world flight data before we commit to the full STRAVOX programme. Flying B1M lets us validate avionics, recovery, and vehicle systems at a scale that avoids the regulatory complexity and risk of a 30 km flight. What works on B1M goes on STRAVOX.",
    objectivesLabel: "Objectives",
    objectives: [
      "Reach 3 km target apogee",
      "Validate KNSB engine in flight",
      "Avionics and flight computer in real conditions",
      "Recovery system deployment",
      "Collect full flight telemetry",
      "CASA range clearance",
    ],
    specs: [
      { label: "Vehicle", value: "STRAVOX B1M" },
      { label: "Role", value: "Sub-scale test vehicle" },
      { label: "Target apogee", value: "3 km", hot: true },
      { label: "Motor", value: "KNSB B1M — 550 mm × 80 mm" },
      { label: "Propellant mass", value: "1.2 kg KNO₃/Sorbitol 70:30" },
      { label: "Expected thrust", value: "~50 kgf for 7 s" },
      { label: "Purpose", value: "Systems validation" },
      { label: "Launch site", value: "Victoria, AUS" },
      { label: "Status", value: "PLANNED" },
      { label: "Target date", value: "2026" },
    ] satisfies SpecRow[],
    milestonesLabel: "Pre-flight milestones",
    milestones: [
      {
        title: "Propellant R&D",
        status: "active",
        badge: "ACTIVE",
        detail:
          "Ongoing — 4 static fires completed but insufficient data. B1M engine campaign will continue propellant characterisation.",
      },
      {
        title: "B1M engine design",
        status: "active",
        badge: "ACTIVE",
        detail: "550 mm × 80 mm casing, 1.2 kg KNO₃/Sorbitol 70:30.",
      },
      {
        title: "B1M engine build",
        status: "active",
        badge: "ACTIVE",
        detail: "3 engines in production, targeting ≥2 firings each.",
      },
      {
        title: "B1M engine static fires",
        status: "upcoming",
        badge: "UPCOMING",
        detail: "Ground firing campaign to validate B1M motor before flight.",
      },
      {
        title: "Vehicle design",
        status: "upcoming",
        badge: "UPCOMING",
        detail: "Airframe, fins, and recovery bay sized for B1M engine.",
      },
      {
        title: "Vehicle fabrication",
        status: "upcoming",
        badge: "UPCOMING",
        detail: "Airframe construction and component manufacture.",
      },
      {
        title: "Avionics integration",
        status: "upcoming",
        badge: "UPCOMING",
        detail: "Flight computer, altimeter, GPS, and recovery electronics.",
      },
      {
        title: "Ground systems test",
        status: "upcoming",
        badge: "UPCOMING",
        detail: "Full vehicle systems check on the pad before flight.",
      },
      {
        title: "CASA range clearance",
        status: "upcoming",
        badge: "UPCOMING",
        detail: "Regulatory approval for launch at a CASA-cleared site in Victoria.",
      },
      {
        title: "Launch readiness review",
        status: "upcoming",
        badge: "UPCOMING",
        detail: "Final internal review before committing to launch day.",
      },
      {
        title: "STRAVOX B1M-01 launch",
        status: "upcoming",
        badge: "UPCOMING",
        detail: "3 km apogee. Full flight telemetry. Recover and review.",
      },
    ] satisfies Milestone[],
  },
  pipeline: {
    eyebrow: "— [ PIPELINE ]",
    title: "ON THE HORIZON.",
    intro:
      "Future missions are subject to learnings from B1M-01. Nothing here is locked in — we plan by what the data tells us.",
    cards: [
      {
        code: "STRAVOX-HOP-01",
        title: "STRAVOX — 100 M HOP TEST",
        summary:
          "Low-altitude hop of STRAVOX to roughly 100 m under drone-engine power only — no main motor. Validates propulsive landing, drone-arm deployment, and vehicle handling.",
        date: "2026",
      },
      {
        code: "STRAVOX-B1M-02",
        title: "STRAVOX B1M-02",
        summary:
          "Second B1M flight incorporating fixes and improvements from B1M-01. Objectives TBD based on B1M-01 data.",
        date: "TBD",
      },
      {
        code: "STRAVOX-01",
        title: "STRAVOX — FULL SCALE",
        summary:
          "The main event. 30 km apogee, Mach 2.5, propulsive vertical landing. Timeline depends on B1M programme outcomes.",
        date: "TBD",
      },
    ] satisfies MissionCard[],
  },
} as const;

export const tests = {
  meta: {
    title: "Static Fire Test Log — Beyond Stage Zero",
    description:
      "Every ground test we have run — including the ones that didn't go to plan. Results, anomalies, and what we learned.",
  },
  hero: {
    eyebrow: "— [ GROUND OPERATIONS ]",
    title: "STATIC FIRE TEST LOG.",
    body: "Every ground test we have run — including the ones that didn't go to plan. We publish everything: results, anomalies, and what we learned.",
    stats: [
      { value: "4", label: "Fires conducted" },
      { value: "1", label: "Partial success", tone: "partial" },
      { value: "3", label: "Failures", tone: "failure" },
    ] satisfies StatItem[],
  },
  inventory: {
    eyebrow: "— ENGINE INVENTORY",
    title: "WHAT WE'VE BUILT.",
    summaryStats: [
      { value: "9", label: "Total engines built" },
      { value: "3", label: "In production" },
    ] satisfies StatItem[],
    cards: [
      {
        value: "3",
        title: "MK I ENGINES BUILT",
        detail: "250 mm × 32 mm — 2 fired, 1 held",
      },
      {
        value: "6",
        title: "MK II ENGINES BUILT",
        detail: "300 mm × 30 mm — 2 fired, 4 remaining",
      },
      {
        value: "3",
        title: "B1M ENGINES IN BUILD",
        detail:
          "550 mm × 80 mm · 1.2 kg KNO₃/Sorbitol 70:30 · ~50 kgf for 7 s · targeting ≥2 firings each",
      },
    ],
  },
  next: {
    eyebrow: "— [ UP NEXT ]",
    title: "NEXT TEST CAMPAIGN.",
    code: "C-03",
    name: "CAMPAIGN 3 — B1M ENGINE STATIC FIRES",
    body: "First firing of the B1M engine series. 3 engines in production, each targeting ≥2 firings. Campaign will continue propellant characterisation with technical vs fertiliser grade KNO₃ and validate the motor before flight.",
    engine: "B1M — 550 mm × 80 mm",
    badge: "IN BUILD",
  },
  logEyebrow: "— [ TEST LOG ]",
  logTitle: "CAMPAIGNS.",
  statusLabels: {
    partial: "PARTIAL",
    failure: "FAILURE",
    success: "SUCCESS",
  } as const,
  learnedLabel: "What we learned",
  observationsLabel: "Observations",
  campaigns: [
    {
      id: "C-02",
      title: "Campaign C-02 · MK II",
      date: "26 Apr 2026",
      summary:
        "Comparative KNO₃ grade test — technical vs fertiliser grade in redesigned Mk II casing.",
      entries: [
        {
          id: "SF-03",
          badge: "FERTILISER GRADE",
          status: "partial",
          specs: [
            { label: "Engine", value: "Mk II — 300 mm × 30 mm" },
            { label: "KNO₃ grade", value: "Fertiliser grade" },
            { label: "Propellant", value: "KNO₃ / Sucrose — 70:30" },
            { label: "Prop. mass", value: "400 g" },
            { label: "Burn time", value: "—" },
            { label: "Peak thrust", value: "6.8 kgf" },
          ],
          observations: [
            "New Mk II engine design — 300 mm long, 30 mm diameter.",
            "Significantly uneven burn rate throughout the firing.",
            "Peak thrust of 6.8 kgf recorded.",
            "Small burn-throughs observed on nozzle and forward closure post-fire.",
            "Case integrity maintained — no ejection or rupture.",
          ],
          learned:
            "Fertiliser grade propellant shows uneven burn behaviour in the Mk II geometry. Burn-throughs on both ends indicate hot-gas channeling. First firing to return meaningful thrust data — forward closure redesign required.",
        },
        {
          id: "SF-04",
          badge: "TECHNICAL GRADE",
          status: "failure",
          specs: [
            { label: "Engine", value: "Mk II — 300 mm × 30 mm" },
            { label: "KNO₃ grade", value: "Technical grade" },
            { label: "Propellant", value: "KNO₃ / Sucrose — 70:30" },
            { label: "Prop. mass", value: "400 g" },
            { label: "Burn time", value: "—" },
            { label: "Peak thrust", value: "—" },
          ],
          observations: [
            "Case rupture — catastrophic failure.",
            "All ground test infrastructure destroyed.",
            "Likely cause: burn-through progression from SF-03 failure mode at higher pressure or grain defect.",
          ],
          learned:
            "Forward closure burn-through identified in SF-03 is a critical failure path — not cosmetic. Mk II design requires closure redesign and pressure testing before further static fire. Infrastructure rebuild required before next campaign.",
        },
      ],
    },
    {
      id: "C-01",
      title: "Campaign C-01 · MK I",
      date: "18 Feb 2026",
      summary:
        "Comparative KNO₃ grade test — technical vs fertiliser grade at Mk I scale.",
      entries: [
        {
          id: "SF-01",
          badge: "TECHNICAL GRADE",
          status: "failure",
          specs: [
            { label: "Engine", value: "Mk I — 250 mm × 32 mm" },
            { label: "KNO₃ grade", value: "Technical grade" },
            { label: "Propellant", value: "KNO₃ / Sucrose — 70:30" },
            { label: "Prop. mass", value: "~300 g" },
            { label: "Burn time", value: "28 s" },
            { label: "Peak thrust", value: "—" },
          ],
          observations: [
            "All thrust data lost — load cell issue.",
            "Nozzle ejected during burn.",
            "Engine casing began melting toward end of burn.",
            "Ground test infrastructure destroyed.",
          ],
          learned:
            "Nozzle retention design inadequate for chamber pressure. Casing material insufficient for burn temperature. Technical grade produced a longer, slower burn (28 s) vs fertiliser grade (SF-02: 14 s).",
        },
        {
          id: "SF-02",
          badge: "FERTILISER GRADE",
          status: "failure",
          specs: [
            { label: "Engine", value: "Mk I — 250 mm × 32 mm" },
            { label: "KNO₃ grade", value: "Fertiliser grade" },
            { label: "Propellant", value: "KNO₃ / Sucrose — 70:30" },
            { label: "Prop. mass", value: "~300 g" },
            { label: "Burn time", value: "14 s" },
            { label: "Peak thrust", value: "4.6 kgf (10 kgf on nozzle ejection)" },
          ],
          observations: [
            "Fertiliser grade produced a significantly faster burn rate than technical grade SF-01 (14 s vs 28 s).",
            "Nozzle ejected again at pressure spike.",
            "Peak thrust of 4.6 kgf measured before nozzle loss; spike to 10 kgf on ejection.",
            "Accidental sonic boom generated on nozzle ejection.",
          ],
          learned:
            "Fertiliser grade burns approximately twice as fast as technical grade in this configuration — likely due to impurities acting as burn rate accelerants. Nozzle ejection confirmed as a systematic Mk I design failure, not grade-dependent.",
        },
      ],
    },
  ] satisfies TestCampaign[],
} as const;

export const b1m = {
  meta: {
    title: "STRAVOX B1M — Beyond Stage Zero",
    description:
      "STRAVOX B1M is our sub-scale 3 km test vehicle — validating systems before full-scale STRAVOX.",
  },
  hero: {
    eyebrow: "— [ SUB-SCALE VEHICLE ]",
    titleLines: ["STRAVOX", "B1M"],
    body: "Our sub-scale test vehicle — built to reach 3 km apogee on a home-built KNSB engine and return real flight data before we commit to full-scale STRAVOX. What works on B1M goes on STRAVOX.",
    specs: [
      { label: "Target apogee", value: "3.0 km", hot: true },
      { label: "Motor", value: "KNSB B1M" },
      { label: "Propellant", value: "1.2 kg KNSB" },
      { label: "First flight", value: "2026" },
    ] satisfies SpecRow[],
    ctaPrimary: { href: "/missions", label: "MISSION PIPELINE →" },
    ctaSecondary: { href: "/stravox", label: "FULL-SCALE STRAVOX" },
  },
  why: {
    eyebrow: "— WHY B1M",
    title: "PROVE IT AT 3 KM FIRST.",
    body: "Flying B1M lets us validate avionics, recovery, and vehicle systems at a scale that avoids the regulatory complexity and risk of a 30 km flight. It is the bridge between ground test and full-scale STRAVOX.",
  },
  objectives: [
    "Reach 3 km target apogee",
    "Validate KNSB engine in flight",
    "Avionics and flight computer in real conditions",
    "Recovery system deployment",
    "Collect full flight telemetry",
    "Inform full-scale STRAVOX design",
  ],
  specs: [
    { label: "Role", value: "Sub-scale test vehicle" },
    { label: "Target apogee", value: "3 km", hot: true },
    { label: "Motor", value: "KNSB B1M — 550 mm × 80 mm" },
    { label: "Propellant", value: "1.2 kg KNO₃/Sorbitol 70:30" },
    { label: "Expected thrust", value: "~50 kgf for 7 s" },
    { label: "Purpose", value: "Systems validation for STRAVOX" },
    { label: "Launch site", value: "Victoria, AUS" },
    { label: "Status", value: "In development" },
    { label: "First flight", value: "2026 — B1M-01" },
  ] satisfies SpecRow[],
  milestones: [
    { title: "Propellant R&D", status: "active", badge: "ACTIVE", detail: "Ongoing — early static fires completed. B1M engine campaign continues propellant characterisation." },
    { title: "B1M engine design", status: "active", badge: "ACTIVE", detail: "550 mm × 80 mm casing, 1.2 kg KNO₃/Sorbitol 70:30." },
    { title: "B1M engine build", status: "active", badge: "ACTIVE", detail: "3 engines in production, targeting ≥2 firings each." },
    { title: "B1M engine static fires", status: "upcoming", badge: "UPCOMING", detail: "Ground firing campaign to validate the motor before flight." },
    { title: "Vehicle design & fabrication", status: "upcoming", badge: "UPCOMING", detail: "Airframe, fins, and recovery bay sized around the B1M engine." },
    { title: "Avionics integration", status: "upcoming", badge: "UPCOMING", detail: "Flight computer, altimeter, GPS, and recovery electronics." },
    { title: "CASA range clearance", status: "upcoming", badge: "UPCOMING", detail: "Regulatory approval for launch at a CASA-cleared site in Victoria." },
    { title: "STRAVOX B1M-01 launch", status: "upcoming", badge: "UPCOMING", detail: "3 km apogee. Full flight telemetry. Recover and review." },
  ] satisfies Milestone[],
} as const;

export const nozzles = {
  meta: {
    title: "Ceramic Nozzles — Beyond Stage Zero",
    description:
      "Ceramic nozzle development programme — retention and heat survival for BSZ motors.",
  },
  hero: {
    eyebrow: "— [ PROPULSION PROGRAMME ]",
    titleLines: ["CERAMIC", "NOZZLES"],
    body: "A dedicated programme to design, fire, and qualify ceramic nozzles that survive our motors — after early tests lost nozzles to ejection and thermal damage.",
    specs: [
      { label: "Programme status", value: "ACTIVE", hot: true },
      { label: "Driven by", value: "Mk I–II failures" },
      { label: "First flight target", value: "B1M" },
    ] satisfies SpecRow[],
  },
  why: {
    eyebrow: "— WHY CERAMICS",
    title: "NOZZLES THAT STAY PUT.",
    body: "Our first static fires made the problem obvious: metal nozzles either ejected under pressure or began to burn through. The ceramic nozzle programme exists to replace that weak link with inserts that retain, resist heat, and keep thrust on axis for the full burn.",
  },
  goals: [
    { numeral: "01", title: "SURVIVE THE BURN", body: "Ceramic throats and inserts that hold geometry under chamber temperature and pressure — no melt-back, no washout." },
    { numeral: "02", title: "STAY RETAINED", body: "Fix the ejection failures from early Mk I fires with a nozzle stack designed to stay locked through pressure spikes." },
    { numeral: "03", title: "SCALE TO B1M", body: "Take lessons from small-motor inserts into nozzles sized for the B1M and, later, full-scale STRAVOX motors." },
    { numeral: "04", title: "PROVE ON THE STAND", body: "Every ceramic design earns its place through static fire — measured, inspected, and published with the rest of the test log." },
  ] satisfies ValueItem[],
  milestones: [
    { title: "Problem definition", status: "active", badge: "DONE", detail: "Mk I nozzle ejections and Mk II burn-throughs established retention and thermal survival as hard requirements." },
    { title: "Material research", status: "active", badge: "ACTIVE", detail: "Evaluating ceramic formulations and insert geometries for throat and exit-cone duty." },
    { title: "Prototype inserts", status: "active", badge: "ACTIVE", detail: "First ceramic nozzle inserts in design and fabrication for small-motor verification." },
    { title: "Static-fire validation", status: "upcoming", badge: "UPCOMING", detail: "Fire ceramic nozzles on the stand; inspect throat erosion, retention, and post-burn integrity." },
    { title: "B1M integration", status: "upcoming", badge: "UPCOMING", detail: "Scale a proven ceramic stack into the B1M motor before flight." },
  ] satisfies Milestone[],
} as const;

export const contact = {
  meta: {
    title: "Contact — Beyond Stage Zero",
    description:
      "Want to collaborate, sponsor, or just follow the journey? Reach Beyond Stage Zero.",
  },
  hero: {
    eyebrow: "— [ GET IN TOUCH ]",
    title: "CONTACT.",
    body: "Want to collaborate, sponsor, or just follow the journey? We'd love to hear from you.",
    emailLabel: "DIRECT EMAIL",
  },
  reasons: {
    eyebrow: "— REASONS TO REACH OUT",
    items: [
      { label: "Sponsorship or partnership", subject: "Sponsorship / partnership" },
      { label: "Joining the team", subject: "Joining the team" },
      { label: "Supplying materials", subject: "Supplying materials" },
      { label: "Media enquiries", subject: "Media enquiry" },
      { label: "General questions", subject: "General question" },
    ] satisfies ContactReason[],
  },
  form: {
    title: "SEND A MESSAGE",
    nameLabel: "Name",
    emailLabel: "Email",
    subjectLabel: "Subject",
    messageLabel: "Message",
    submitLabel: "SEND MESSAGE →",
    sendingLabel: "SENDING…",
    successTitle: "Message sent.",
    successBody: "Thanks — we'll get back to you as soon as we can.",
    errorTitle: "Something went wrong.",
    errorBody: "Please try again, or email us directly.",
    validation: {
      nameRequired: "Name is required.",
      emailRequired: "A valid email is required.",
      subjectRequired: "Subject is required.",
      messageRequired: "Message is required.",
    },
  },
} as const;
