import { intro, outro, cancel, isCancel, log } from '@clack/prompts'
import { readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { printBanner } from './banner.js'
import { selectScope } from './scope.js'
import { pickInstallables } from './picker.js'
import { installSelected } from './install.js'
import { checkForUpdates } from './update.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const { version } = JSON.parse(readFileSync(join(__dirname, '..', 'package.json'), 'utf8'))

export async function run() {
  printBanner(version)
  await checkForUpdates()

  intro('SkillKit Installer')

  const scope = await selectScope()
  if (isCancel(scope)) { cancel('Cancelled.'); process.exit(0) }

  const selected = await pickInstallables()
  if (isCancel(selected)) { cancel('Cancelled.'); process.exit(0) }

  const { installed } = await installSelected(selected, scope)

  outro(`Done! ${installed} item(s) installed to ${scope.scope} scope.`)
  log.info(`Restart Claude Code to pick up new skills.`)
}
