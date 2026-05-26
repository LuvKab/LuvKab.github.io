import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { GardenFooter } from '@/components/garden/GardenFooter'
import { getAllPosts, getPostBySlug } from '@/lib/blog'

type BlogPostPageProps = {
  params: Promise<{ slug: string }>
}

const dateFormatter = new Intl.DateTimeFormat('zh-CN', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
})

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return {}
  }

  return {
    title: post.title,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <main className="min-h-screen">
      <article className="mx-auto max-w-3xl px-5 py-10">
        <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-bold text-garden-green">
          <ArrowLeft aria-hidden="true" size={17} />
          Blog
        </Link>

        <header className="mt-14 border-b border-garden-line pb-8">
          <time dateTime={post.date} className="text-sm font-extrabold uppercase text-garden-green">
            {dateFormatter.format(new Date(post.date))}
          </time>
          <h1 className="mt-4 font-serif text-6xl font-bold leading-tight text-garden-ink max-md:text-4xl">
            {post.title}
          </h1>
          {post.tags.length ? (
            <div className="mt-5 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="rounded-md bg-garden-tag px-3 py-1 text-xs font-bold text-garden-muted">
                  #{tag}
                </span>
              ))}
            </div>
          ) : null}
        </header>

        <div className="prose-post mt-8" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
      </article>
      <GardenFooter />
    </main>
  )
}
