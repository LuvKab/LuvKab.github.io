import type { Metadata } from 'next'
import type { CSSProperties } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { GardenFooter } from '@/components/garden/GardenFooter'
import { GardenHeader } from '@/components/garden/GardenHeader'
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
    <main className="mx-auto min-h-screen w-full max-w-screen-sm bg-white px-8 font-sans text-neutral-900 md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-2xl">
      <GardenHeader />
      <article className="mx-auto max-w-3xl">
        <header className="garden-enter px-2 pb-10 pt-8 md:pt-12">
          <Link
            href="/blog"
            className="mb-7 inline-flex items-center gap-1.5 rounded-full bg-neutral-100 px-3 py-1.5 font-mono text-[0.7rem] font-medium uppercase tracking-[0.12em] text-neutral-500 transition-colors hover:bg-neutral-200 hover:text-neutral-900"
          >
            <span aria-hidden="true">←</span>
            <span>Writing · Blog</span>
          </Link>
          <time dateTime={post.date} className="block font-mono text-[0.72rem] font-medium uppercase tracking-[0.14em] text-neutral-400">
            {dateFormatter.format(new Date(post.date))}
          </time>
          <h1 className="mt-5 font-serif text-[2.5rem] font-normal leading-[1.02] tracking-[-0.025em] text-neutral-900 md:text-[4rem] lg:text-[4.5rem]">
            {post.title}
          </h1>
          {post.tags.length || post.categories.length ? (
            <div className="mt-7 flex flex-wrap gap-1.5">
              {[...post.categories, ...post.tags].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-neutral-100 px-2.5 py-0.5 text-[0.7rem] font-medium text-neutral-600 ring-1 ring-inset ring-neutral-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          ) : null}
        </header>

        <div className="garden-enter px-1 pb-2" style={{ '--garden-delay': '150ms' } as CSSProperties}>
          <div className="rounded-2xl bg-neutral-50 px-5 py-8 sm:px-10 sm:py-12">
            <div className="prose-post" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
          </div>
        </div>
      </article>
      <GardenFooter />
    </main>
  )
}
