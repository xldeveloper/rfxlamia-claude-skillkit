#!/usr/bin/env node
import { readdirSync, readFileSync, writeFileSync } from 'fs'
import { join, resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

const skills = readdirSync(join(root, 'skills'))
  .filter(d => !d.startsWith('.'))
  .map(name => {
    let description = ''
    let category = 'core'
    try {
      const content = readFileSync(join(root, 'skills', name, 'SKILL.md'), 'utf8')
      const descMatch = content.match(/^description:\s*[>|]?\s*\n?(.*)/m)
      if (descMatch) description = descMatch[1].trim().replace(/^["']|["']$/g, '')
    } catch {}
    return { name, description, category, type: 'skill', path: `skills/${name}` }
  })

const manifest = { skills, agents: [] }
writeFileSync(join(root, 'installer', 'skills-manifest.json'), JSON.stringify(manifest, null, 2))
console.log(`Generated manifest: ${skills.length} skills`)
