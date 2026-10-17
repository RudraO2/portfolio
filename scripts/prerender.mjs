// Generate static documents and discovery files from one content source.
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { pathToFileURL } from 'node:url'
import { resolve, dirname } from 'node:path'

const dist = resolve('dist')
const origin = 'https://rudratechie.xyz'
const { render, posts } = await import(pathToFileURL(resolve('dist-server/entry-server.js')).href)
const template = await readFile(resolve(dist, 'index.html'), 'utf8')
const marker = '<div id="root"></div>'
if (!template.includes(marker)) throw new Error(`Missing root marker: ${marker}`)
const escape = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' }[char]))
const json = value => JSON.stringify(value).replace(/</g, '\\u003c')
const person = { '@type': 'Person', '@id': `${origin}/#person`, name: 'Rudra Techie', url: `${origin}/#about` }
const articleUrl = post => `${origin}/blog/${post.slug}`

function metadata({ title, description, path, image, imageAlt, type = 'website', post, noindex = false }) {
  const url = `${origin}${path}`
  const breadcrumbs = path === '/blog' ? [{ name: 'Home', item: `${origin}/` }, { name: 'Writing', item: url }] : [{ name: 'Home', item: `${origin}/` }, { name: 'Writing', item: `${origin}/blog` }, { name: post?.title ?? 'Page not found', item: url }]
  const graph = post ? [person, { '@type': 'BlogPosting', '@id': `${url}#article`, headline: post.title, description, image: [`${origin}${image}`], author: { '@id': person['@id'] }, publisher: { '@id': person['@id'] }, mainEntityOfPage: url, datePublished: `${post.date}T12:00:00+05:30`, dateModified: `${post.date}T12:00:00+05:30`, inLanguage: 'en', articleSection: post.category, keywords: post.tags.join(', '), citation: post.sources.map(source => source.url) }] : [{ '@type': 'CollectionPage', name: 'The Notebook | Rudra Techie', url, description, author: person, mainEntity: { '@type': 'ItemList', itemListElement: posts.map((item, index) => ({ '@type': 'ListItem', position: index + 1, name: item.title, url: articleUrl(item) })) } }]
  if (!noindex) graph.push({ '@type': 'BreadcrumbList', itemListElement: breadcrumbs.map((item, index) => ({ '@type': 'ListItem', position: index + 1, ...item })) })
  return `<title>${escape(title)}</title>
    <meta name="description" content="${escape(description)}" />
    <meta name="robots" content="${noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'}" />
    <link rel="canonical" href="${url}" />
    <meta property="og:type" content="${type}" />
    <meta property="og:site_name" content="Rudra Techie" />
    <meta property="og:locale" content="en_IN" />
    <meta property="og:title" content="${escape(title)}" />
    <meta property="og:description" content="${escape(description)}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="${origin}${image}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="${post ? '675' : '630'}" />
    <meta property="og:image:alt" content="${escape(imageAlt)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escape(title)}" />
    <meta name="twitter:description" content="${escape(description)}" />
    <meta name="twitter:image" content="${origin}${image}" />
    <meta name="twitter:image:alt" content="${escape(imageAlt)}" />
    ${post ? `<meta property="article:published_time" content="${post.date}T12:00:00+05:30" /><meta property="article:author" content="${origin}/#about" />` : ''}
    ${noindex ? '' : `<script type="application/ld+json">${json({ '@context': 'https://schema.org', '@graph': graph })}</script>`}`
}

function cleanHead(html) {
  return html.replace(/<title>[\s\S]*?<\/title>/g, '')
    .replace(/<meta\b(?=[^>]*(?:name="(?:description|robots|twitter:[^"]+)"|property="(?:og:[^"]+|profile:[^"]+)"))[^>]*>/g, '')
    .replace(/<link\b(?=[^>]*rel="canonical")[^>]*>/g, '')
    .replace(/<link\b(?=[^>]*rel="preload")(?=[^>]*as="image")[^>]*>/g, '')
    .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g, '')
}

async function writePage(path, head, filename) {
  const html = cleanHead(template).replace('</head>', `${head}\n</head>`).replace(marker, `<div id="root">${render(path)}</div>`)
  const destination = resolve(dist, filename)
  await mkdir(dirname(destination), { recursive: true })
  await writeFile(destination, html)
}

await writeFile(resolve(dist, 'index.html'), template.replace(marker, `<div id="root">${render('/')}</div>`))
await writePage('/blog', metadata({ title: 'AI, benchmarks & building | Rudra Techie', description: 'Essays on LinkedIn AI slop, model benchmarks, coding agents, speech recognition, and learning AI by building useful projects. By Rudra Techie.', path: '/blog', image: '/images/portfolio-cover.jpg', imageAlt: 'A glass mechanism surrounded by paper noise, an illustration about building useful things' }), 'blog/index.html')
for (const post of posts) {
  await writePage(`/blog/${post.slug}`, metadata({ title: `${post.title} | Rudra Techie`, description: post.description, path: `/blog/${post.slug}`, image: post.cover, imageAlt: post.coverAlt, type: 'article', post }), `blog/${post.slug}/index.html`)
}
await writePage('/404', metadata({ title: 'Page not found | Rudra Techie', description: 'This page could not be found. Explore the portfolio or read the notebook.', path: '/404', image: '/images/portfolio-cover.jpg', imageAlt: 'Rudra Techie notebook', noindex: true }), '404.html')

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n  <url><loc>${origin}/</loc><image:image><image:loc>${origin}/images/portfolio-cover.jpg</image:loc></image:image></url>\n  <url><loc>${origin}/blog</loc></url>\n${posts.map(post => `  <url><loc>${articleUrl(post)}</loc><lastmod>${post.date}</lastmod><image:image><image:loc>${origin}${post.cover}</image:loc><image:title>${escape(post.title)}</image:title></image:image></url>`).join('\n')}\n</urlset>\n`
const feed = `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>Rudra Techie: The Notebook</title><link>${origin}/blog</link><description>AI, benchmarks, and building useful things.</description><language>en</language><atom:link href="${origin}/feed.xml" rel="self" type="application/rss+xml" />${posts.map(post => `<item><title>${escape(post.title)}</title><link>${articleUrl(post)}</link><guid isPermaLink="true">${articleUrl(post)}</guid><description>${escape(post.description)}</description><pubDate>${new Date(`${post.date}T12:00:00+05:30`).toUTCString()}</pubDate><category>${escape(post.category)}</category></item>`).join('')}</channel></rss>\n`
const existingLlms = (await readFile(resolve('public/llms.txt'), 'utf8')).split('\n## Writing\n')[0].trimEnd()
const llms = `${existingLlms}\n\n## Writing\n\n- [The Notebook](${origin}/blog): Essays about AI culture, research, benchmarks and building.\n${posts.map(post => `- [${post.title}](${articleUrl(post)}): ${post.description}`).join('\n')}\n`
for (const [filename, content] of [['sitemap.xml', sitemap], ['feed.xml', feed], ['llms.txt', llms]]) {
  await writeFile(resolve(dist, filename), content)
  await writeFile(resolve('public', filename), content)
}
console.log(`Prerendered homepage, notebook, ${posts.length} articles, and 404. Generated sitemap, RSS and llms.txt.`)
