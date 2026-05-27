import type { Metadata } from 'next'
import { GardenPage } from '@/components/garden/GardenPage'
import { getAllPosts } from '@/lib/blog'
import type { GardenTile } from '@/data/profile'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Older blog posts preserved from the previous Xyras site.',
}

const dateFormatter = new Intl.DateTimeFormat('zh-CN', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
})

export default function BlogPage() {
  const posts = getAllPosts()
  const blogTiles: GardenTile[] = posts.map((post) => ({
    id: `blog-${post.slug}`,
    eyebrow: 'Writing · Blog',
    title: post.title,
    subtitle: dateFormatter.format(new Date(post.date)),
    body: post.excerpt,
    href: `/blog/${post.slug}`,
    status: post.categories[0] ?? 'ARCHIVE',
    tags: post.tags.length ? post.tags : post.categories,
    size: 'square',
    variant: 'writing',
  }))

  return (
    <GardenPage
      title="blog"
      description="Older posts kept in the same garden layout: essays, notes, and small fragments from the previous site."
      tiles={blogTiles}
    />
  )
}
