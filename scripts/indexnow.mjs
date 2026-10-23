// Ping IndexNow (Bing, Yandex, Naver, Seznam) with every URL in the live sitemap.
// Run after a deploy: node scripts/indexnow.mjs
import { readdir, readFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const host = 'rudratechie.xyz'
const origin = `https://${host}`
const keyFile = (await readdir(resolve('public'))).find(name => /^[a-f0-9]{32}\.txt$/.test(name))
if (!keyFile) throw new Error('No IndexNow key file (<32 hex chars>.txt) in public/')
const key = keyFile.replace('.txt', '')
if ((await readFile(resolve('public', keyFile), 'utf8')).trim() !== key) throw new Error('Key file content does not match its name')

const sitemap = await (await fetch(`${origin}/sitemap.xml`)).text()
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1]).filter(url => url.startsWith(origin))
const response = await fetch('https://api.indexnow.org/IndexNow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host, key, keyLocation: `${origin}/${keyFile}`, urlList }),
})
console.log(`IndexNow: ${response.status} ${response.statusText} for ${urlList.length} URLs`)
if (!response.ok && response.status !== 202) process.exit(1)
