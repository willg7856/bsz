#!/usr/bin/env python3
"""Generate a single PDF with the full Beyond Stage Zero sponsorship brief."""

from pathlib import Path

from fpdf import FPDF

OUT = Path("/workspace/docs/BSZ-Sponsorship-Brief.pdf")
ARTIFACT = Path("/opt/cursor/artifacts/BSZ-Sponsorship-Brief.pdf")

INK = (11, 13, 15)
INK_MID = (42, 50, 59)
INK_FAINT = (123, 133, 144)
ACCENT = (255, 90, 31)
PAPER = (250, 250, 247)
LINE = (214, 214, 207)


FONT_DIR = Path("/usr/share/fonts/truetype")
SANS = FONT_DIR / "liberation/LiberationSans-Regular.ttf"
SANS_B = FONT_DIR / "liberation/LiberationSans-Bold.ttf"
SANS_I = FONT_DIR / "liberation/LiberationSans-Italic.ttf"
MONO_B = FONT_DIR / "jetbrains-mono/JetBrainsMono-Bold.ttf"
if not MONO_B.exists():
    MONO_B = FONT_DIR / "dejavu/DejaVuSansMono-Bold.ttf"


class BriefPDF(FPDF):
    def __init__(self):
        super().__init__(format="A4", unit="mm")
        self.set_auto_page_break(auto=True, margin=16)
        self.set_margins(16, 16, 16)
        self.add_font("Sans", "", str(SANS))
        self.add_font("Sans", "B", str(SANS_B))
        self.add_font("Sans", "I", str(SANS_I))
        self.add_font("Mono", "B", str(MONO_B))

    def footer(self):
        self.set_y(-12)
        self.set_font("Sans", "", 8)
        self.set_text_color(*INK_FAINT)
        self.cell(0, 5, "Beyond Stage Zero  |  beyondstagezero.com  |  beyondstagezero@gmail.com", align="L")
        self.cell(0, 5, f"{self.page_no()}", align="R")

    def eyebrow(self, text):
        self.set_font("Mono", "B", 8)
        self.set_text_color(*ACCENT)
        self.cell(0, 5, text.upper(), new_x="LMARGIN", new_y="NEXT")
        self.ln(1)

    def h1(self, text):
        self.set_font("Mono", "B", 28)
        self.set_text_color(*INK)
        self.multi_cell(0, 10, text)
        self.ln(2)

    def h2(self, text):
        self.ln(3)
        self.set_draw_color(*ACCENT)
        self.set_line_width(0.6)
        y = self.get_y()
        self.line(16, y, 22, y)
        self.ln(3)
        self.set_font("Mono", "B", 13)
        self.set_text_color(*INK)
        self.multi_cell(0, 7, text)
        self.ln(1)

    def h3(self, text):
        self.ln(2)
        self.set_font("Sans", "B", 11)
        self.set_text_color(*INK)
        self.multi_cell(0, 6, text)
        self.ln(0.5)

    def body(self, text):
        self.set_font("Sans", "", 10)
        self.set_text_color(*INK_MID)
        self.multi_cell(0, 5.2, text)
        self.ln(1)

    def bullet(self, text, indent=4):
        x = self.l_margin + indent
        self.set_x(x)
        self.set_font("Sans", "", 10)
        self.set_text_color(*INK_MID)
        bullet_w = 4
        self.cell(bullet_w, 5.2, "-")
        self.multi_cell(self.epw - indent - bullet_w, 5.2, text)

    def kv_row(self, key, value):
        self.set_font("Sans", "B", 9)
        self.set_text_color(*INK)
        key_w = 48
        self.cell(key_w, 5.5, key)
        self.set_font("Sans", "", 9)
        self.set_text_color(*INK_MID)
        self.multi_cell(self.epw - key_w, 5.5, value)

    def rule(self):
        self.ln(2)
        self.set_draw_color(*LINE)
        self.set_line_width(0.2)
        self.line(self.l_margin, self.get_y(), self.w - self.r_margin, self.get_y())
        self.ln(3)

    def ensure_space(self, h=30):
        if self.get_y() + h > self.h - 18:
            self.add_page()


def build():
    pdf = BriefPDF()
    pdf.set_title("Beyond Stage Zero — Sponsorship Brief")
    pdf.set_author("Beyond Stage Zero")
    pdf.set_creator("Beyond Stage Zero")

    # ── Cover ─────────────────────────────────────────
    pdf.add_page()
    pdf.set_draw_color(*ACCENT)
    pdf.set_line_width(1.2)
    pdf.line(16, 18, 50, 18)
    pdf.ln(8)

    pdf.eyebrow("Sponsorship brief  ·  2026")
    pdf.h1("Beyond Stage Zero.")
    pdf.set_font("Sans", "B", 13)
    pdf.set_text_color(*INK)
    pdf.multi_cell(0, 6.5, "Australia's first fully and rapidly reusable launch vehicle — built by students.")
    pdf.ln(3)
    pdf.body(
        "An Australian student rocketry team designing, building, and flying hardware "
        "from Creswick, Victoria. Published static fires. Vehicles in production. "
        "First flight window: Q4'26–Q1'27."
    )
    pdf.ln(2)

    # Stats strip
    stats = [
        ("4", "Static fires"),
        ("9", "Engines built"),
        ("17", "Team members"),
        ("3 km", "First mission"),
    ]
    col_w = pdf.epw / 4
    y0 = pdf.get_y()
    pdf.set_draw_color(*LINE)
    pdf.set_line_width(0.3)
    pdf.line(16, y0, 16 + pdf.epw, y0)
    pdf.ln(3)
    x0 = pdf.l_margin
    for i, (val, lbl) in enumerate(stats):
        pdf.set_xy(x0 + i * col_w, y0 + 4)
        pdf.set_font("Sans", "B", 16)
        pdf.set_text_color(*INK)
        pdf.cell(col_w - 2, 7, val)
        pdf.set_xy(x0 + i * col_w, y0 + 11)
        pdf.set_font("Sans", "B", 7)
        pdf.set_text_color(*INK_FAINT)
        pdf.cell(col_w - 2, 4, lbl.upper())
    pdf.set_y(y0 + 20)
    pdf.line(16, pdf.get_y(), 16 + pdf.epw, pdf.get_y())
    pdf.ln(6)

    pdf.set_font("Sans", "B", 9)
    pdf.set_text_color(*INK)
    pdf.cell(0, 5, "beyondstagezero.com   ·   beyondstagezero@gmail.com   ·   X @beyondstagezero", new_x="LMARGIN", new_y="NEXT")
    pdf.set_font("Sans", "", 9)
    pdf.set_text_color(*INK_FAINT)
    pdf.cell(0, 5, "Creswick, VIC  ·  Australia  ·  Founded April 2025", new_x="LMARGIN", new_y="NEXT")

    pdf.ln(8)
    pdf.set_font("Sans", "I", 10)
    pdf.set_text_color(*INK_MID)
    pdf.multi_cell(0, 5.5, '"Stage Zero is the ground. Everything beyond it is what we\'re building toward."')

    # ── Who we are ────────────────────────────────────
    pdf.add_page()
    pdf.eyebrow("Organisation")
    pdf.h2("Who we are")
    pdf.body(
        "Beyond Stage Zero is an Australian student rocketry team based at the Creswick "
        "Goods Shed (historic railway workshops) in Creswick, Victoria. Seventeen students "
        "design, machine, cast propellant, write range software, and fly hardware — with "
        "the goal of building Australia's first fully and rapidly reusable launch vehicle."
    )

    for k, v in [
        ("Name", "Beyond Stage Zero"),
        ("Founded", "April 2025"),
        ("Base", "Creswick Goods Shed, Creswick, VIC, Australia"),
        ("Type", "Student rocketry team"),
        ("Team size", "17 students"),
        ("Website", "https://www.beyondstagezero.com"),
        ("Email", "beyondstagezero@gmail.com"),
        ("X / Twitter", "@beyondstagezero"),
    ]:
        pdf.kv_row(k, v)

    pdf.h3("Team roster")
    pdf.body(
        "Will, Seb, Jet, Columbus, Arnav, Wave, Sage, Abby, Alice, Chelsea, "
        "Declan M, Declan S, Lilly, Nia, Oscar, Zafran, Ziad"
    )

    pdf.h3("Values")
    for t, d in [
        ("Student led", "Every part of the project — from design to launch — is driven by students."),
        ("Ambitious", "Building Australia's first fully and rapidly reusable launch vehicle."),
        ("Collaborative", "Engineers, scientists, and builders from across disciplines."),
        ("Open", "Progress, failures, and learnings are shared with the broader community."),
    ]:
        pdf.bullet(f"{t} — {d}")

    pdf.h3("Capabilities")
    for t, d in [
        ("Propulsion", "Home-built KNSB motors: casing design, propellant casting, nozzle work, static-fire campaigns (Mk I through B1M)."),
        ("Structures", "Airframe, fins, and recovery bay for B1M and full-scale STRAVOX — machined and assembled in Creswick."),
        ("Avionics", "Flight computer, altimeter, GPS, and recovery electronics sized for sub-scale before the 30 km vehicle."),
        ("Range data (Octopus)", "Pad and vehicle data link into Goods Shed mission control. Octopus is not the flight computer."),
        ("Recovery & landing", "Parachute recovery on B1M today; propulsive vertical landing on folding drone arms for full-scale STRAVOX."),
        ("Mission ops", "CASA range path, Victorian launch planning, and Goods Shed operations."),
    ]:
        pdf.bullet(f"{t} — {d}")

    pdf.h3("Current partners")
    pdf.bullet("Creswick Railway Workshops Association — workshop & base (Goods Shed machining, assembly, mission control).")
    pdf.bullet("Ballarat Tech School — education partner (skills, facilities, pathway into hands-on aerospace).")

    # ── Vehicles ──────────────────────────────────────
    pdf.ensure_space(40)
    pdf.eyebrow("Vehicles & programmes")
    pdf.h2("STRAVOX — full-scale reusable vehicle")
    pdf.body(
        "Programme goal: Australia's first fully and rapidly reusable launch vehicle. "
        "2,633 mm high-power rocket with a split nosecone airbrake and propulsive vertical "
        "landing on four folding drone arms."
    )
    for k, v in [
        ("Height", "2,633 mm"),
        ("Diameter", "200 mm"),
        ("Fin spans", "Base 520 mm · Upper 340 mm"),
        ("Target apogee", "30 km"),
        ("Peak velocity", "Mach 2.5 (burnout ~10 km AGL)"),
        ("Motor", "Home-built KNSB — 1,000 mm grain (KNO3 / sorbitol)"),
        ("Launch mass", "104.8 kg including propellant"),
        ("Landing motors", "4x T-Motor U13 II on folding arms"),
        ("Landing thrust", "112 kgf combined · T/W 2.05x"),
        ("Airbrake", "Split/clamshell nosecone; ~3.5x drag area after burnout"),
        ("Status", "In development"),
    ]:
        pdf.kv_row(k, v)

    pdf.h3("Development stages")
    for line in [
        "STAGE 00 Concept — 2025-Q3 — done",
        "STAGE 01 Design — 2025-Q4 — done (CAD Rev 4; 23 simulations)",
        "STAGE 02 Engine Dev. — 2026-Q1–Q2 — ACTIVE (B1M design done; 3 engines in build)",
        "STAGE 03 Avionics — 2026-Q3 — upcoming",
        "STAGE 04 Fabrication — 2026-Q4 — upcoming",
        "STAGE 05 Testing — 2027-Q1 — upcoming",
        "STAGE 06 Launch — 2027-Q2 — planning (30 km + propulsive landing, CASA-cleared Victorian range)",
    ]:
        pdf.bullet(line)

    pdf.ensure_space(45)
    pdf.h2("STRAVOX B1M — sub-scale systems validation")
    pdf.body(
        "Sub-scale test vehicle built to reach 3 km apogee on a home-built KNSB engine and "
        "return real flight data before full-scale STRAVOX. What works on B1M goes on STRAVOX."
    )
    for k, v in [
        ("Target apogee", "3 km"),
        ("Motor", "KNSB B1M — 550 mm x 80 mm"),
        ("Propellant", "~2 kg KNO3/Sorbitol 65:35"),
        ("Expected thrust", "~150 kgf for 3.5 s"),
        ("Engines in build", "3 (targeting >=2 firings per casing before flight)"),
        ("First flight", "B1M-01 · Q4 2026 – Q1 2027"),
        ("Launch site", "CASA-cleared Victorian site (clearance upcoming)"),
        ("Purpose", "Validate avionics, recovery, propulsion, flight systems"),
    ]:
        pdf.kv_row(k, v)

    pdf.h3("B1M milestone status")
    for line in [
        "Engine design — done",
        "Propellant characterisation — active",
        "Engine build — active",
        "Engine static fires — upcoming",
        "Vehicle design & fabrication — upcoming",
        "Avionics integration — upcoming",
        "CASA range clearance — upcoming",
        "Launch — upcoming (Q4'26–Q1'27)",
    ]:
        pdf.bullet(line)

    pdf.ensure_space(35)
    pdf.h2("100 m Hopper")
    pdf.body(
        "Low-altitude hop of STRAVOX to roughly 100 m under drone-engine power only "
        "(no main motor). Validates propulsive landing, drone-arm deployment, and vehicle "
        "handling before higher-energy flights. Target window Q3–Q4 2026. Listed in production "
        "on the homepage alongside B1M-01/02/03."
    )

    pdf.h2("Mission pipeline")
    for line in [
        "STRAVOX B1M-01 — Q4 2026 – Q1 2027 — 3 km sub-scale (primary near-term mission)",
        "STRAVOX 100 m Hop — Q3–Q4 2026",
        "STRAVOX B1M-02 — TBD (follows B1M-01 lessons)",
        "STRAVOX full scale — TBD (30 km, Mach 2.5, propulsive landing; depends on B1M outcomes)",
    ]:
        pdf.bullet(line)

    pdf.h2("Ceramic nozzles")
    pdf.body(
        "Early motors lost nozzles to ejection and thermal damage. Programme goals: survive "
        "the burn, stay retained, scale to B1M, prove on the stand. Material research and "
        "prototype inserts are active; static-fire validation and B1M integration are upcoming."
    )

    pdf.h2("Octopus data link")
    pdf.body(
        "Gets pad data — and later vehicle data — into Goods Shed mission control during "
        "static fires and launches. Octopus moves data; it is not the flight computer."
    )

    # ── Tests ─────────────────────────────────────────
    pdf.add_page()
    pdf.eyebrow("Test record")
    pdf.h2("Static fire history")
    pdf.body("Published campaigns. Failures are logged as carefully as successes.")

    pdf.h3("Engine batches")
    pdf.bullet("Mk I: 3 built — 250 mm x 32 mm — 2 fired, 1 held")
    pdf.bullet("Mk II: 6 built — 300 mm x 30 mm — 2 fired, 4 remaining")
    pdf.bullet("B1M: 3 in build — 550 mm x 80 mm — ~2 kg KNO3/Sorbitol 65:35 — ~150 kgf / 3.5 s")

    pdf.h3("Campaign 1 — first fires (SF-01, SF-02)")
    pdf.bullet("SF-01 Mk I — ~300 g KNO3/Sucrose, technical grade — ~28 s burn — lost thrust data; nozzle ejected; ground equipment damaged.")
    pdf.bullet("SF-02 Mk I — fertiliser grade — ~14 s burn — 4.6 kgf peak before nozzle ejection; accidental sonic boom.")
    pdf.bullet("Lesson: nozzle retention is critical.")

    pdf.h3("Campaign 2 — Mk II (SF-03, SF-04) — 26 April")
    pdf.bullet("SF-03 Mk II (300x30 mm, 400 g KNO3/Sorbitol) — first meaningful thrust data 6.8 kgf peak; uneven burn; minor burn-throughs; fertiliser-grade KNO3.")
    pdf.bullet("SF-04 Mk II — technical-grade KNO3 — case rupture; destroyed ground infrastructure.")
    pdf.bullet("Lesson: forward closure / casing redesign continues.")

    pdf.h3("Campaign 3 — B1M static fires")
    pdf.body("Upcoming. First firing of the B1M series after build and propellant characterisation.")

    # ── Sponsorship ask ───────────────────────────────
    pdf.ensure_space(40)
    pdf.eyebrow("Sponsorship")
    pdf.h2("Why sponsor")
    pdf.body(
        "Sponsorship funds propellant, metal, electronics, and range readiness — not overhead "
        "theatre. Sponsors back a working programme with published tests, institutional partners, "
        "and a clear path to first flight."
    )
    for line in [
        "Real hardware: 4 static fires, 9 engines built, vehicles in production — campaigns published.",
        "Australia's reusable path: B1M at 3 km, then 100 m hopper, then full-scale STRAVOX.",
        "Student-led, institution-backed: 17 students at the Goods Shed with CRWA and Ballarat Tech School.",
        "Clear flight window: B1M-01 targets Q4'26–Q1'27.",
    ]:
        pdf.bullet(line)

    pdf.h2("What sponsorship funds")
    pdf.body("Cash or in-kind. No fixed price list — packages are shaped around what you can give and what the flight programme needs.")
    for t, d in [
        ("Propulsion & propellant", "KNSB ingredients, casing stock, nozzle materials, static-fire consumables."),
        ("Airframe & structures", "Tube, fins, recovery bay, machining stock for B1M and hopper."),
        ("Avionics & recovery", "Flight computers, altimeters, GPS, batteries, parachutes, harness."),
        ("Range & mission ops", "CASA path costs, range logistics, Octopus ground hardware, Goods Shed MC kit."),
        ("Workshop tooling", "Metrology, casting fixtures, test-stand instrumentation, shop upgrades."),
        ("In-kind & expertise", "Materials, CNC time, composites, electronics, legal, logistics."),
    ]:
        pdf.bullet(f"{t} — {d}")

    pdf.ensure_space(50)
    pdf.h2("Partnership levels")
    pdf.body("Levels describe relationship depth and visibility — not invented dollar amounts.")

    pdf.h3("01 — Mission Partner")
    pdf.body("Anchor support for a vehicle or campaign — B1M flight, hopper hop, or a named static-fire series.")
    for b in [
        "Primary logo on vehicle / test stand where practical",
        "Featured placement on site and programme materials",
        "Named partnership in news and flight updates",
        "Workshop visit and flight-day observer access",
        "Direct line to the team leads",
    ]:
        pdf.bullet(b)

    pdf.h3("02 — Programme Sponsor")
    pdf.body("Sustained support across propulsion, structures, or avionics — cash or in-kind.")
    for b in [
        "Logo on beyondstagezero.com partners section",
        "Credit in relevant test logs and mission pages",
        "Social recognition on @beyondstagezero",
        "Invitation to static fires and build days",
    ]:
        pdf.bullet(b)

    pdf.h3("03 — Supporter")
    pdf.body("Targeted help — a material run, a tool, a component lot, or a one-off cash gift.")
    for b in [
        "Name listed with partners & supporters",
        "Thank-you in the related campaign update",
        "Open invitation to follow the programme",
    ]:
        pdf.bullet(b)

    pdf.h2("What sponsors get back")
    for t, d in [
        ("Brand association", "Tie your name to Australia's student-built reusable flight programme."),
        ("Visible hardware", "Logos and credits on real vehicles, stands, and published test campaigns."),
        ("Talent pipeline", "Seventeen builders learning propulsion, structures, avionics, and ops."),
        ("Regional story", "Creswick and Ballarat — regional Victoria doing aerospace in a Goods Shed."),
        ("Open progress", "Fires, failures, and milestones are published. Support shows in the public record."),
        ("Access", "Come to the workshop. Watch a static fire. See the hardware you helped fund."),
    ]:
        pdf.bullet(f"{t} — {d}")

    # ── CTA ───────────────────────────────────────────
    pdf.ensure_space(45)
    pdf.ln(4)
    # Dark CTA box approximation
    pdf.set_fill_color(*INK)
    x, y = pdf.l_margin, pdf.get_y()
    pdf.rect(x, y, pdf.epw, 42, style="F")
    pdf.set_xy(x + 5, y + 4)
    pdf.set_font("Sans", "B", 8)
    pdf.set_text_color(*ACCENT)
    pdf.cell(pdf.epw - 10, 5, "NEXT STEP")
    pdf.set_xy(x + 5, y + 10)
    pdf.set_font("Sans", "B", 14)
    pdf.set_text_color(250, 250, 247)
    pdf.cell(pdf.epw - 10, 7, "Tell us what you can bring.")
    pdf.set_xy(x + 5, y + 18)
    pdf.set_font("Sans", "", 9)
    pdf.set_text_color(184, 191, 199)
    pdf.multi_cell(
        pdf.epw - 10,
        4.5,
        "Cash, materials, machining time, components, or advice — start with a short note. "
        "We'll reply with where it fits in the flight programme.",
    )
    pdf.set_xy(x + 5, y + 32)
    pdf.set_font("Sans", "B", 9)
    pdf.set_text_color(250, 250, 247)
    pdf.multi_cell(
        pdf.epw - 10,
        4.5,
        "beyondstagezero@gmail.com    ·    beyondstagezero.com    ·    @beyondstagezero",
    )

    pdf.set_y(y + 46)
    pdf.set_font("Sans", "", 8)
    pdf.set_text_color(*INK_FAINT)
    pdf.multi_cell(
        0,
        4.5,
        "Notes: CASA range clearance is planned/upcoming, not yet obtained. Spittership is an "
        "optional community programme (kickoff after first B1M static fire) and is not the core "
        "sponsorship ask. Partnership levels are relationship depth, not a fixed price list.",
    )

    OUT.parent.mkdir(parents=True, exist_ok=True)
    ARTIFACT.parent.mkdir(parents=True, exist_ok=True)
    pdf.output(str(OUT))
    pdf.output(str(ARTIFACT))
    print(f"Wrote {OUT} ({OUT.stat().st_size} bytes)")
    print(f"Wrote {ARTIFACT}")


if __name__ == "__main__":
    build()
