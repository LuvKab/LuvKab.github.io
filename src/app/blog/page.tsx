import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { GardenFooter } from '@/components/garden/GardenFooter'
import { getAllPosts } from '@/lib/blog'

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

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-4xl px-5 py-10">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-garden-green">
          <ArrowLeft aria-hidden="true" size={17} />
          Home
        </Link>

        <header className="mt-14 border-b border-garden-line pb-8">
          <p className="mb-3 text-sm font-extrabold uppercase text-garden-green">Blog</p>
          <h1 className="font-serif text-6xl font-bold leading-tight text-garden-ink max-md:text-4xl">
            Older notes, kept intact.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-garden-body">
            The old blog files are preserved here instead of being folded into the new homepage.
          </p>
        </header>

        <div className="mt-8 grid gap-4">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="rounded-md border border-garden-line bg-garden-paper p-5 transition hover:-translate-y-0.5 hover:border-garden-ink hover:shadow-soft"
            >
              <div className="flex flex-wrap items-center gap-3 text-sm font-bold text-garden-muted">
                <time dateTime={post.date}>{dateFormatter.format(new Date(post.date))}</time>
                {post.categories.map((category) => (
                  <span key={category} className="rounded-md bg-garden-tag px-2 py-1 text-xs">
                    {category}
                  </span>
                ))}
              </div>
              <h2 className="mt-3 font-serif text-3xl font-bold leading-tight text-garden-ink">{post.title}</h2>
              {post.excerpt ? <p className="mt-3 max-w-2xl leading-7 text-garden-body">{post.excerpt}</p> : null}
            </Link>
          ))}
        </div>
      </div>
      <GardenFooter />
    </main>
  )
}
