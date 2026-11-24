import assert from 'node:assert/strict'
import test from 'node:test'
import { _resetHolds, clockNow } from './hold.js'

const at = 1_000_000
const c = (status, extra = {}) => ({ name: 'Pressure test', date: '2026-11-17', time: '13:30', at, status, ...extra })

test('a scheduled countdown runs with real time', () => {
  _resetHolds()
  assert.equal(clockNow(c('scheduled'), 500), 500)
  assert.equal(clockNow(c('scheduled'), 600), 600)
})

test('a held countdown stops where it was first seen', () => {
  _resetHolds()
  assert.equal(clockNow(c('hold'), 500), 500)
  assert.equal(clockNow(c('hold'), 900), 500)
})

test('a held countdown uses heldAt from Octopus when given', () => {
  _resetHolds()
  assert.equal(clockNow(c('hold', { heldAt: 400 }), 900), 400)
  assert.equal(clockNow(c('hold', { heldAt: new Date(300).toISOString() }), 900), 300)
})

test('a hold never runs past T-0', () => {
  _resetHolds()
  assert.equal(clockNow(c('hold'), at + 5000), at)
})

test('lifting the hold resumes real time, and a new hold freezes afresh', () => {
  _resetHolds()
  clockNow(c('hold'), 500)
  assert.equal(clockNow(c('scheduled'), 700), 700)
  assert.equal(clockNow(c('hold'), 800), 800)
})

test('a held countdown uses the exact stopped time Octopus sends (held = ms left)', () => {
  _resetHolds()
  assert.equal(clockNow(c('hold', { held: 600_000 }), 900), at - 600_000)
  assert.equal(clockNow(c('hold', { held: 600_000, heldAt: 400 }), 5_000_000), at - 600_000)
})
