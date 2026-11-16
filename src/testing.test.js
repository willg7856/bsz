import assert from 'node:assert/strict'
import test from 'node:test'
import { isTest, isTestPost } from './testing.js'

test('countdowns of type Test are tests', () => {
  assert.equal(isTest({ category: 'test' }), true)
  assert.equal(isTest({ category: 'launch' }), false)
  assert.equal(isTest(null), false)
})

test('posts tagged Testing, Test or Tests are test updates', () => {
  for (const tag of ['Testing', 'testing', 'Test', 'Tests', 'Static fire testing']) assert.equal(isTestPost({ tag }), true, tag)
  for (const tag of ['Programme', 'Data link', 'Attestation', '', undefined]) assert.equal(isTestPost({ tag }), false, String(tag))
})
