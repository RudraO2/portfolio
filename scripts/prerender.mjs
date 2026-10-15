// Injects the server-rendered app into dist/index.html so search engines and
// link previews get the full page text without running JavaScript.
import { readFile, writeFile, rm } from 'node:fs/promises'
import { pathToFileURL } from 'node:url'
import { resolve } from 'node:path'

const dist = resolve('dist')
const serverEntry = resolve('dist-server/entry-server.js')

const { render } = await import(pathToFileURL(serverEntry).href)
const html = await readFile(resolve(dist, 'index.html'), 'utf8')

const marker = '<div id="root"></div>'
if (!html.includes(marker)) throw new Error(`prerender: ${marker} not found in dist/index.html`)

await writeFile(resolve(dist, 'index.html'), html.replace(marker, `<div id="root">${render()}</div>`))
await rm(resolve('dist-server'), { recursive: true, force: true })
console.log('prerender: dist/index.html written')
