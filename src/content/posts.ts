export interface ArticleSection {
  id: string
  title: string
  paragraphs: string[]
  bullets?: string[]
  code?: string
  table?: { headers: string[]; rows: string[][] }
  callout?: string
}

export interface BlogPost {
  slug: string
  title: string
  description: string
  category: string
  tags: string[]
  cover: string
  coverAlt: string
  lede: string
  sections: ArticleSection[]
  sources: { title: string; url: string }[]
  related: string[]
  status: 'ready' | 'draft'
  date: string
}

const collections = import.meta.glob<BlogPost[]>('./*.json', { eager: true, import: 'default' })
export const posts = Object.values(collections).flat().filter(post => post.status === 'ready')
export const articlePath = (post: BlogPost) => `/blog/${post.slug}`
export const smallCover = (post: BlogPost) => post.cover.replace(/\.webp$/, '-small.webp')
export const wordCount = (post: BlogPost) => [post.lede, ...post.sections.flatMap(section => [section.title, ...section.paragraphs, ...(section.bullets ?? []), section.callout ?? '', section.code ?? '', ...(section.table?.rows.flat() ?? [])])].join(' ').split(/\s+/).filter(Boolean).length
export const readingTime = (post: BlogPost) => Math.max(1, Math.ceil(wordCount(post) / 220))
export const dateLabel = (date: string) => new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'Asia/Kolkata' }).format(new Date(`${date}T12:00:00+05:30`))
