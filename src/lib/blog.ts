import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const postsRoot = path.join(process.cwd(), 'content/posts')

export type BlogPostMeta = {
  slug: string
  title: string
  date: string
  excerpt: string
  tags: string[]
  categories: string[]
}

export type BlogPost = BlogPostMeta & {
  contentHtml: string
}

type FrontMatter = {
  title?: string
  date?: string | Date
  draft?: boolean
  tags?: string[]
  categories?: string[]
}

function isMarkdownFile(file: string) {
  return file.endsWith('.md') && !file.startsWith('_')
}

function postSources() {
  if (!fs.existsSync(postsRoot)) {
    return []
  }

  const entries = fs.readdirSync(postsRoot, { withFileTypes: true })
  const sources: Array<{ slug: string; filePath: string; assetDir: string }> = []

  for (const entry of entries) {
    const entryPath = path.join(postsRoot, entry.name)

    if (entry.isFile() && isMarkdownFile(entry.name)) {
      sources.push({
        slug: entry.name.replace(/\.md$/, ''),
        filePath: entryPath,
        assetDir: postsRoot,
      })
      continue
    }

    if (entry.isDirectory()) {
      const indexPath = path.join(entryPath, 'index.md')
      if (fs.existsSync(indexPath)) {
        sources.push({
          slug: entry.name,
          filePath: indexPath,
          assetDir: entryPath,
        })
      }
    }
  }

  return sources
}

function normalizeDate(date: FrontMatter['date']) {
  if (!date) {
    return new Date(0).toISOString()
  }

  const parsed = date instanceof Date ? date : new Date(date)
  if (Number.isNaN(parsed.getTime())) {
    return new Date(0).toISOString()
  }

  return parsed.toISOString()
}

function excerptFromMarkdown(markdown: string) {
  const withoutImages = markdown.replace(/!\[[^\]]*]\([^)]+\)/g, '')
  const paragraph = withoutImages
    .split(/\n{2,}/)
    .map((line) => line.replace(/[#>*_`-]/g, '').trim())
    .find(Boolean)

  return paragraph ? paragraph.slice(0, 140) : ''
}

function rewriteImages(markdown: string, slug: string) {
  return markdown.replace(/!\[([^\]]*)]\((?!https?:\/\/|\/)([^)]+)\)/g, (_match, alt: string, src: string) => {
    const cleanSrc = src.replace(/^\.\//, '')
    return `![${alt}](/blog-assets/${slug}/${cleanSrc})`
  })
}

function readMeta(source: { slug: string; filePath: string; assetDir: string }): BlogPostMeta | null {
  const file = fs.readFileSync(source.filePath, 'utf8')
  const { data, content } = matter(file)
  const frontMatter = data as FrontMatter

  if (frontMatter.draft) {
    return null
  }

  return {
    slug: source.slug,
    title: frontMatter.title ?? source.slug,
    date: normalizeDate(frontMatter.date),
    excerpt: excerptFromMarkdown(content),
    tags: frontMatter.tags ?? [],
    categories: frontMatter.categories ?? [],
  }
}

export function getAllPosts(): BlogPostMeta[] {
  return postSources()
    .map(readMeta)
    .filter((post): post is BlogPostMeta => Boolean(post))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const source = postSources().find((item) => item.slug === slug)
  if (!source) {
    return null
  }

  const file = fs.readFileSync(source.filePath, 'utf8')
  const { data, content } = matter(file)
  const frontMatter = data as FrontMatter

  if (frontMatter.draft) {
    return null
  }

  const contentHtml = String(await remark().use(html, { sanitize: false }).process(rewriteImages(content, source.slug)))

  return {
    slug: source.slug,
    title: frontMatter.title ?? source.slug,
    date: normalizeDate(frontMatter.date),
    excerpt: excerptFromMarkdown(content),
    tags: frontMatter.tags ?? [],
    categories: frontMatter.categories ?? [],
    contentHtml,
  }
}
