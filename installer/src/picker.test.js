import { test } from 'node:test'
import assert from 'node:assert'
import { getCategoryDisplay } from './picker.js'

test('getCategoryDisplay returns icon and category label', () => {
  const skill = { name: 'test-skill', category: 'creative' }
  const result = getCategoryDisplay(skill)
  assert.strictEqual(result, '✍️ creative')
})

test('getCategoryDisplay handles uncategorized skills', () => {
  const skill = { name: 'test-skill', category: 'unknown-category' }
  const result = getCategoryDisplay(skill)
  assert.strictEqual(result, '   unknown category')
})

test('getCategoryDisplay handles missing category', () => {
  const skill = { name: 'test-skill' }
  const result = getCategoryDisplay(skill)
  assert.strictEqual(result, '   ')
})

// --- sortSkills tests (added for skillkit-help ordering) ---
import { sortSkills } from './picker.js'

test('skillkit sorts first', () => {
  const skills = [
    { name: 'readme-expert' },
    { name: 'skillkit' },
    { name: 'adversarial-review' }
  ]
  const sorted = sortSkills(skills)
  assert.strictEqual(sorted[0].name, 'skillkit')
})

test('skillkit-help sorts second', () => {
  const skills = [
    { name: 'readme-expert' },
    { name: 'skillkit-help' },
    { name: 'skillkit' },
    { name: 'adversarial-review' }
  ]
  const sorted = sortSkills(skills)
  assert.strictEqual(sorted[0].name, 'skillkit')
  assert.strictEqual(sorted[1].name, 'skillkit-help')
})

test('remaining skills sort alphabetically', () => {
  const skills = [
    { name: 'readme-expert' },
    { name: 'skillkit' },
    { name: 'adversarial-review' },
    { name: 'skillkit-help' }
  ]
  const sorted = sortSkills(skills)
  assert.strictEqual(sorted[2].name, 'adversarial-review')
  assert.strictEqual(sorted[3].name, 'readme-expert')
})
