import { Fragment, useState } from 'react'
import { posts, articlePath, smallCover, readingTime, dateLabel, type BlogPost } from '../content/posts'
import { Nav } from '../components/Nav'
import './blog.css'

// Deliberately small inline format: React escapes all content. No HTML injection.
function Inline({ text }: { text: string }) {
  const tokens = text.split(/(\[[^\]]+\]\(https?:\/\/[^\s)]+\)|\[[^\]]+\]\(\/[^\s)]+\)|`[^`]+`|\*\*[^*]+\*\*)/g)
  return <>{tokens.map((token, i) => {
    const link = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
    if (link) return <a key={i} href={link[2]}>{link[1]}</a>
    if (token.startsWith('`') && token.endsWith('`')) return <code key={i}>{token.slice(1, -1)}</code>
    if (token.startsWith('**') && token.endsWith('**')) return <strong key={i}>{token.slice(2, -2)}</strong>
    return <Fragment key={i}>{token}</Fragment>
  })}</>
}

function Header() {
  return <><a className="blog-skip" href="#main">Skip to content</a><Nav current="writing" /></>
}

function Footer() {
  return <footer className="journal-footer"><a className="journal-brand" href="/">Rudra Techie</a><p>Notes on AI, building things, and asking better questions.</p><div><a href="/blog">All writing</a><a href="/feed.xml">RSS feed ↗</a><a href="/#about">About me ↗</a></div></footer>
}

function Card({ post, featured = false }: { post: BlogPost; featured?: boolean }) {
  return <article className={`journal-card${featured ? ' featured-card' : ''}`}><a href={articlePath(post)} className="card-image" tabIndex={-1} aria-hidden="true"><img src={featured ? post.cover : smallCover(post)} width="1200" height="675" alt="" loading={featured ? 'eager' : 'lazy'} decoding="async" /></a><div className="card-copy"><p className="eyebrow">{post.category} <span>· {readingTime(post)} min read</span></p><h2><a href={articlePath(post)}>{post.title}</a></h2><p>{post.description}</p><a className="read-link" href={articlePath(post)}>Read the essay <span aria-hidden="true">↗</span><span className="sr-only">: {post.title}</span></a></div></article>
}

export function BlogIndex() {
  const [category, setCategory] = useState('All')
  const [query, setQuery] = useState('')
  const categories = ['All', ...new Set(posts.map(post => post.category))]
  const featured = posts.find(post => /linkedin|brain-rot/.test(post.slug)) ?? posts[0]
  const filtered = posts.filter(post => (category === 'All' || post.category === category) && `${post.title} ${post.description} ${post.tags.join(' ')}`.toLowerCase().includes(query.toLowerCase()))
  const isFiltered = category !== 'All' || query !== ''
  return <div className="journal"><Header /><main id="main"><section className="journal-intro"><p className="eyebrow"><span className="green-dot" /> THE NOTEBOOK / {posts.length} ESSAYS</p><h1>Less noise.<br /><em>More to think about.</em></h1><p>AI gets interesting when you look past the announcement. These are notes on what works, what falls apart, and how to build something useful yourself.</p><a href="/blog/how-to-start-learning-ai" className="intro-start">New to AI? Start with the learning guide <span aria-hidden="true">↗</span></a></section>{featured && !isFiltered && <section className="featured-section" aria-label="Featured essay"><div className="section-label"><span>01 / IN FOCUS</span><span>A LONGER LOOK</span></div><Card post={featured} featured /></section>}<section className="all-writing" aria-labelledby="writing-heading"><div className="section-label"><h2 id="writing-heading">THE WRITING</h2><a href="/feed.xml">Subscribe via RSS ↗</a></div><div className="writing-controls"><div className="category-tabs" role="group" aria-label="Filter by topic">{categories.map(item => <button key={item} type="button" aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>)}</div><label className="writing-search"><span className="sr-only">Search articles</span><input type="search" placeholder="Find something worth reading…" value={query} onChange={event => setQuery(event.target.value)} /></label></div><p className="result-count" role="status">{isFiltered ? `${filtered.length} ${filtered.length === 1 ? 'essay' : 'essays'} found` : 'Research, useful disagreements, and things to build.'}</p><div className="journal-grid">{filtered.filter(post => isFiltered || post !== featured).map(post => <Card key={post.slug} post={post} />)}</div>{filtered.length === 0 && <div className="empty-results"><h3>No essays match that yet.</h3><button onClick={() => { setQuery(''); setCategory('All') }}>Show all writing</button></div>}</section><aside className="journal-note"><span className="eyebrow">A NOTE ON THE NOTEBOOK</span><p>These essays are analysis and practical guides, with sources linked where they matter. Examples are illustrative unless a real test is explicitly described. Cover illustrations are AI generated.</p><a href="/#about">Meet the person behind the writing ↗</a></aside></main><Footer /></div>
}

export function BlogArticle({ post }: { post: BlogPost }) {
  const related = [...post.related.map(slug => posts.find(item => item.slug === slug)).filter((item): item is BlogPost => Boolean(item)), ...posts.filter(item => item.category === post.category && item.slug !== post.slug), ...posts.filter(item => item.slug !== post.slug)].filter((item, index, array) => array.findIndex(other => other.slug === item.slug) === index).slice(0, 3)
  return <div className="journal"><Header /><main id="main"><article><div className="article-heading"><nav className="breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><a href="/blog">Writing</a><span aria-hidden="true">/</span><span>{post.category}</span></nav><p className="eyebrow">{post.category} <span>· {readingTime(post)} MIN READ</span></p><h1>{post.title}</h1><p className="article-description">{post.description}</p><div className="article-byline"><a href="/#about">Rudra Techie</a><span>Written <time dateTime={post.date}>{dateLabel(post.date)}</time></span></div></div><figure className="article-cover"><img src={post.cover} srcSet={`${smallCover(post)} 600w, ${post.cover} 1200w`} sizes="(max-width: 720px) 100vw, 1200px" width="1200" height="675" alt={post.coverAlt} fetchPriority="high" /><figcaption>Conceptual cover illustration, generated with AI.</figcaption></figure><div className="article-layout"><aside className="article-toc"><nav aria-label="In this essay"><p className="eyebrow">IN THIS ESSAY</p><ol>{post.sections.map(section => <li key={section.id}><a href={`#${section.id}`}>{section.title}</a></li>)}<li><a href="#sources">Sources & further reading</a></li></ol></nav><a href="/blog" className="back-writing">← Back to the notebook</a></aside><div className="article-body"><p className="article-lede"><Inline text={post.lede} /></p>{post.sections.map(section => <section key={section.id} id={section.id}><h2>{section.title}</h2>{section.paragraphs.map((paragraph, i) => <p key={i}><Inline text={paragraph} /></p>)}{section.bullets && <ul>{section.bullets.map((item, i) => <li key={i}><Inline text={item} /></li>)}</ul>}{section.code && <pre tabIndex={0}><code>{section.code}</code></pre>}{section.table && <div className="article-table" role="region" aria-label={`${section.title}: comparison table`} tabIndex={0}><table><thead><tr>{section.table.headers.map((header, i) => <th key={i} scope="col">{header}</th>)}</tr></thead><tbody>{section.table.rows.map((row, i) => <tr key={i}>{row.map((cell, j) => <td key={j}><Inline text={cell} /></td>)}</tr>)}</tbody></table></div>}{section.callout && <aside className="article-callout"><span aria-hidden="true">↳</span><p><Inline text={section.callout} /></p></aside>}</section>)}<section id="sources" className="article-sources"><p className="eyebrow">FOLLOW THE EVIDENCE</p><h2>Sources & further reading</h2><p>Process note: AI tools assisted with research and drafting. Sources are linked so you can inspect the evidence. Unless an essay says otherwise, it does not claim hands-on testing or independent reproduction.</p><ol>{post.sources.map(source => <li key={source.url}><a href={source.url}>{source.title} <span aria-hidden="true">↗</span></a></li>)}</ol></section><div className="article-tags">{post.tags.map(tag => <span key={tag}>{tag}</span>)}</div><aside className="author-box"><span className="author-monogram" aria-hidden="true">r.</span><div><a href="/#about">Rudra Techie</a><p>Developer from Jaipur, IIT Madras student. Building small useful things and asking too many questions about AI.</p><a href="/#projects">Explore my work ↗</a></div></aside></div></div></article><section className="related-writing"><div className="section-label"><h2>KEEP THE THREAD GOING</h2><a href="/blog">All essays ↗</a></div><div className="journal-grid">{related.map(item => <Card key={item.slug} post={item} />)}</div></section></main><Footer /></div>
}

export function NotFound() {
  return <div className="journal"><Header /><main id="main" className="not-found"><p className="eyebrow">404 / THAT PAGE IS MISSING</p><h1>A dead end.<br /><em>A few good detours.</em></h1><p>This address does not point to an essay or page.</p><a className="read-link" href="/blog">Explore the notebook ↗</a><a className="read-link" href="/">Back to the portfolio ↗</a></main><Footer /></div>
}

export function WritingPreview() {
  const selection = [posts.find(post => /linkedin|brain-rot/.test(post.slug)), posts.find(post => /deepseek/.test(post.slug)), posts.find(post => /how-to-start-learning-ai/.test(post.slug))].filter((post): post is BlogPost => Boolean(post))
  return <section id="writing" className="home-writing"><div className="section-label"><span>THE NOTEBOOK</span><a href="/blog">All {posts.length} essays ↗</a></div><h2>Ideas worth<br /><em>a closer look.</em></h2><p>AI, the noise around it, and building things that actually help.</p><div className="journal-grid">{selection.map(post => <Card key={post.slug} post={post} />)}</div></section>
}
