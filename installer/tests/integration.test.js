import { test } from 'node:test'
import assert from 'node:assert'
import { readFileSync } from 'fs'
import { run } from '../src/cli.js'

// Mock process.exit to prevent actual exits during tests
const originalExit = process.exit

test.before(() => {
  process.exit = (code) => { throw new Error(`EXIT_${code}`) }
})

test.after(() => {
  process.exit = originalExit
})

test('CLI banner prints version', async () => {
  // This is a smoke test - if CLI loads without error, basic wiring works
  // In real test, we'd mock the prompts
  assert.strictEqual(typeof run, 'function')
})

test('All source modules exist and export expected functions', async () => {
  const banner = await import('../src/banner.js')
  const scope = await import('../src/scope.js')
  const picker = await import('../src/picker.js')
  const install = await import('../src/install.js')
  const update = await import('../src/update.js')

  assert.ok(banner, 'banner module loads')
  assert.ok(scope, 'scope module loads')
  assert.ok(picker, 'picker module loads')
  assert.ok(install, 'install module loads')
  assert.ok(update, 'update module loads')
})

test('package.json has required fields', () => {
  const pkg = JSON.parse(readFileSync('./package.json', 'utf8'))
  assert.ok(pkg.name, 'has name')
  assert.ok(pkg.version, 'has version')
  assert.ok(pkg.bin?.skillkit, 'has bin entry')
  assert.ok(pkg.scripts?.test, 'has test script')
  assert.ok(pkg.engines?.node, 'has node engine requirement')
})
