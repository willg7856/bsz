import assert from 'node:assert/strict'
import test from 'node:test'
import { parseWindow, rewrite, rewriteAll, windowFromFeed } from './launchWindow.js'

test('reads the window however it is typed in Octopus', () => {
  assert.deepEqual(parseWindow("Q2–Q3'27"), { from: 2, to: 3, year: 2027 })
  assert.deepEqual(parseWindow('Q2 - Q3 2027'), { from: 2, to: 3, year: 2027 })
  assert.deepEqual(parseWindow('Q2 to Q3 2027'), { from: 2, to: 3, year: 2027 })
  assert.deepEqual(parseWindow("Q3'27"), { from: 3, to: 3, year: 2027 })
  assert.equal(parseWindow('soon'), null)
})

test('rewrites every way the site writes the window', () => {
  const w = { from: 2, to: 3, year: 2027 }
  assert.equal(rewrite("Q1–Q2'27", w), "Q2–Q3'27")
  assert.equal(rewrite('Target window Q1 – Q2 2027. 3 km apogee.', w), 'Target window Q2 – Q3 2027. 3 km apogee.')
  assert.equal(rewrite('First flight is aimed at Q1 to Q2 2027.', w), 'First flight is aimed at Q2 to Q3 2027.')
  assert.equal(rewrite('some time between Q1 and Q2 2027.', w), 'some time between Q2 and Q3 2027.')
  assert.equal(rewrite('Q1–Q2 2027', w), 'Q2–Q3 2027')
  assert.equal(rewrite('Stage 06 2027-Q2', w), 'Stage 06 2027-Q2', 'leaves other dates alone')
  assert.equal(rewrite('some time between Q1 and Q2 2027.', { from: 3, to: 3, year: 2027 }), 'some time in Q3 2027.')
})

test('rewrites inside site data and reads the window from the Octopus feed', () => {
  const w = windowFromFeed({ numbers: [{ label: 'First flight window', value: "Q2–Q3'27" }] })
  assert.deepEqual(rewriteAll({ meta: [['Window', "Q1–Q2'27"]] }, w), { meta: [['Window', "Q2–Q3'27"]] })
  assert.deepEqual(windowFromFeed(null), { from: 1, to: 2, year: 2027 })
})
