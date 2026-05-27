import type { Metadata } from 'next'
import { GardenPage } from '@/components/garden/GardenPage'
import { writingDraftTiles, type GardenTile } from '@/data/profile'
import { getAllPosts } from '@/lib/blog'

export const metadata: Metadata = {
  title: 'Writing',
  description: 'Blog posts, notes, and drafts by Xyras.',
}

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
})

export default function WritingPage() {
  const posts = getAllPosts()
  const writingTiles: GardenTile[] = posts.map((post, index) => ({
    id: `writing-${post.slug}`,
    eyebrow: 'Writing · Blog',
    title: post.title,
    subtitle: dateFormatter.format(new Date(post.date)),
    body: post.excerpt,
    href: `/blog/${post.slug}`,
    size: index > 0 && index % 7 === 0 ? 'wide' : 'square',
    variant: 'writing',
  }))

  return (
    <GardenPage
      title="writing"
      description="Posts, notes, and drafts. Some are old blog entries kept intact; some are working fragments from projects and daily reviews."
      tiles={[...writingTiles, ...writingDraftTiles]}
    />
  )
}
