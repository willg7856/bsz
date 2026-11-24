import assert from 'node:assert/strict'
import test from 'node:test'
import { isTest, isTestPost, testHappening } from './testing.js'

test('countdowns of type Test are tests', () => {
  assert.equal(isTest({ category: 'test' }), true)
  assert.equal(isTest({ category: 'launch' }), false)
  assert.equal(isTest(null), false)
})

test('posts tagged Testing, Test or Tests are test updates', () => {
  for (const tag of ['Testing', 'testing', 'Test', 'Tests', 'Static fire testing']) assert.equal(isTestPost({ tag }), true, tag)
  for (const tag of ['Programme', 'Data link', 'Attestation', '', undefined]) assert.equal(isTestPost({ tag }), false, String(tag))
})

test('the testing banner only counts tests that are happening', () => {
  const now = Date.UTC(2026, 10, 17, 2, 0)
  const h = 3600_000
  assert.equal(testHappening({ status: 'scheduled', at: now + 2 * 24 * h }, now), true, 'GO within 3 days')
  assert.equal(testHappening({ status: 'scheduled', at: now + 10 * 24 * h }, now), false, 'GO in 10 days')
  assert.equal(testHappening({ status: 'scheduled', at: now - 30 * 60_000 }, now), true, 'just past T-0')
  assert.equal(testHappening({ status: 'scheduled', at: now - 2 * h }, now), false, 'long past T-0, still GO')
  assert.equal(testHappening({ status: 'live', at: now - 5 * h }, now), true, 'In progress')
  assert.equal(testHappening({ status: 'hold', at: now + 20 * 24 * h }, now), true, 'on Hold')
  assert.equal(testHappening({ status: 'done', at: now }, now), false, 'Complete')
})
