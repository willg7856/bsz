import assert from 'node:assert/strict'
import test from 'node:test'
import { countdownTarget, parseTime, whenLabel } from './countdownTime.js'

test('reads 24-hour and 12-hour times', () => {
  assert.deepEqual(parseTime('13:30'), [13, 30])
  assert.deepEqual(parseTime('1:30 pm'), [13, 30])
  assert.deepEqual(parseTime('12am'), [0, 0])
  assert.deepEqual(parseTime(''), [0, 0])
})

test('treats countdown times as Melbourne time in daylight saving (AEDT, UTC+11)', () => {
  const t = countdownTarget({ date: '2026-11-17', time: '13:30' })
  assert.equal(new Date(t).toISOString(), '2026-11-17T02:30:00.000Z')
})

test('treats countdown times as Melbourne time in winter (AEST, UTC+10)', () => {
  const t = countdownTarget({ date: '2026-07-01', time: '09:00' })
  assert.equal(new Date(t).toISOString(), '2026-06-30T23:00:00.000Z')
})

test('a date with no time counts down to midnight Melbourne', () => {
  const t = countdownTarget({ date: '2026-12-25' })
  assert.equal(new Date(t).toISOString(), '2026-12-24T13:00:00.000Z')
})

test('labels the time in Melbourne with its zone', () => {
  const label = whenLabel(countdownTarget({ date: '2026-11-17', time: '13:30' }), true)
  assert.match(label, /17 Nov/)
  assert.match(label, /1:30 pm/)
  assert.match(label, /AEDT|GMT\+11/)
})

test('uses the exact moment from Octopus when it sends one (after a hold)', () => {
  const t = countdownTarget({ date: '2026-11-17', time: '13:30', at: '2026-11-17T02:41:07.000Z' })
  assert.equal(new Date(t).toISOString(), '2026-11-17T02:41:07.000Z')
})

test('a test on Hold reports its stopped time', async () => {
  const { heldTime } = await import('./countdownTime.js')
  assert.equal(heldTime({ status: 'hold', held: 600000 }), 600000)
  assert.equal(heldTime({ status: 'live', held: 600000 }), undefined)
  assert.equal(heldTime({ status: 'hold' }), undefined)
})
