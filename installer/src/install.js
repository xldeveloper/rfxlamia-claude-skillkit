// installer/src/install.js
import { cpSync, mkdirSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { spinner, log } from '@clack/prompts'

const __dirname = dirname(fileURLToPath(import.meta.url))
const PACKAGE_ROOT = join(__dirname, '..')

export async function installSelected({ skills, agents }, targets) {
  if (!Array.isArray(skills)) throw new TypeError('skills must be an array')
  if (!Array.isArray(targets)) throw new TypeError('targets must be an array')

  const s = spinner()
  s.start('Installing core skills...')

  const results = []
  let totalInstalled = 0

  for (const target of targets) {
    let installed = 0
    const skipped = []

    if (target.skillsDir) {
      for (const skill of skills) {
        if (!skill.name || !skill.path) {
          skipped.push(`invalid-skill-${skipped.length}`)
          continue
        }
        const src = join(PACKAGE_ROOT, skill.path)
        const dest = join(target.skillsDir, skill.name)
        if (!existsSync(src)) { skipped.push(skill.name); continue }
        mkdirSync(dest, { recursive: true })
        cpSync(src, dest, { recursive: true })
        installed++
      }
    }

    results.push({ target, installed, skipped })
    totalInstalled += installed
  }

  s.stop(`Installed ${totalInstalled} core skill(s)`)

  const allSkipped = results.flatMap(r => r.skipped)
  if (allSkipped.length > 0) {
    log.warn(`Skipped (not found in package): ${allSkipped.join(', ')}`)
  }

  return { results, totalInstalled }
}
