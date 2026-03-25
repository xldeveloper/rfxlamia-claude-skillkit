// installer/src/cli.js
import { intro, outro, cancel, isCancel, log } from '@clack/prompts'
import { readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { printBanner } from './banner.js'
import { selectScope } from './scope.js'
import { installSelected } from './install.js'
import { checkForUpdates } from './update.js'
import { selectTools, getToolTargets } from './tools.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const pkg = JSON.parse(readFileSync(join(__dirname, '..', 'package.json'), 'utf8'))
const manifest = JSON.parse(readFileSync(join(__dirname, '..', 'skills-manifest.json'), 'utf8'))

export async function run() {
  printBanner(pkg.version)
  await checkForUpdates()

  intro('SkillKit Core Installer')

  const selectedTools = await selectTools()
  if (isCancel(selectedTools)) { cancel('Cancelled.'); process.exit(0) }

  const scope = await selectScope(selectedTools)
  if (isCancel(scope)) { cancel('Cancelled.'); process.exit(0) }

  const targets = getToolTargets(selectedTools, scope)
  const { results, totalInstalled } = await installSelected(
    { skills: manifest.skills, agents: [] },
    targets
  )

  const targetLabels = results
    .filter(r => r.installed > 0)
    .map(r => `${r.target.name} (${r.target.scope})`)
    .join(', ')

  outro(`Done! ${totalInstalled} core skill(s) installed to ${targetLabels || 'no targets'}.`)
  log.info('For community skills & agents, run: npx @rfxlamia/sm')
  log.info('Restart your coding agent tools to pick up new skills.')
}
