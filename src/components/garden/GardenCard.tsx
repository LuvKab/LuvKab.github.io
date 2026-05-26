import Image from 'next/image'
import clsx from 'clsx'
import type { ReactNode } from 'react'
import { ArrowUpRight } from 'lucide-react'
import type { GardenTile } from '@/data/profile'

const sizeClass = {
  square: 'aspect-square',
  wide: 'min-h-[18rem] sm:aspect-[2] sm:col-span-2',
  tall: 'aspect-square sm:row-span-2 sm:aspect-auto',
}

function TagList({ tags }: { tags?: string[] }) {
  if (!tags?.length) {
    return null
  }

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span key={tag} className="rounded bg-neutral-200/60 px-2 py-1 text-xs font-medium text-neutral-500">
          {tag}
        </span>
      ))}
    </div>
  )
}

function CardShell({ tile, children }: { tile: GardenTile; children: ReactNode; index?: number }) {
  const inner = (
    <div className="group relative h-full w-full overflow-hidden rounded-lg bg-neutral-50 transition-colors duration-150 hover:bg-neutral-100 focus-within:bg-neutral-100">
      {tile.href ? (
        <div className="pointer-events-none absolute right-2 top-2 z-30 flex h-8 w-8 items-center justify-center rounded-full text-neutral-400 transition-all duration-150 group-hover:bg-white group-hover:text-neutral-900 group-hover:shadow-[0_0_0_1px_rgba(0,0,0,0.05),0_1px_0_rgba(0,0,0,0.1)]">
          <ArrowUpRight aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
        </div>
      ) : null}
      {children}
    </div>
  )

  return (
    <div
      id={tile.id === 'awta-b2b-site' ? 'projects' : tile.id === 'writing-backlog' ? 'writing' : tile.id === 'export-sales-os' ? 'systems' : tile.id === 'reading-shelf' ? 'reading' : undefined}
      className={clsx('scroll-mt-20 px-1 pb-2', sizeClass[tile.size])}
    >
      {tile.href ? (
        <a
          href={tile.href}
          target={tile.href.startsWith('http') ? '_blank' : undefined}
          rel={tile.href.startsWith('http') ? 'noreferrer' : undefined}
          className="block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400"
        >
          {inner}
        </a>
      ) : (
        inner
      )}
    </div>
  )
}

function ProjectTile({ tile, index }: { tile: GardenTile; index?: number }) {
  return (
    <CardShell tile={tile} index={index}>
      <div className="relative isolate h-full w-full">
        <div className="flex items-center justify-between pl-4 pr-2 pt-2 text-sm font-medium tracking-normal text-neutral-400">
          <span className="py-1.5">{tile.eyebrow}</span>
        </div>
        {tile.image ? (
          <div className="absolute inset-x-7 bottom-6 top-16 -z-10 transition-transform duration-150 group-hover:scale-105 sm:inset-x-10 sm:bottom-8 sm:top-20">
            <Image
              src={tile.image}
              alt={tile.imageAlt ?? ''}
              fill
              loading="eager"
              sizes={tile.size === 'wide' ? '(min-width: 1024px) 50vw, 100vw' : '(min-width: 1024px) 25vw, 100vw'}
              className="object-contain drop-shadow-[0_16px_28px_rgba(0,0,0,0.13)]"
            />
          </div>
        ) : null}
      </div>
    </CardShell>
  )
}

function PhotoTile({ tile, index }: { tile: GardenTile; index?: number }) {
  return (
    <CardShell tile={tile} index={index}>
      <div className="relative flex h-full w-full flex-col justify-between">
        {tile.image ? (
          <Image
            src={tile.image}
            alt={tile.imageAlt ?? ''}
            fill
            loading="eager"
            sizes={tile.size === 'wide' ? '(min-width: 1024px) 50vw, 100vw' : '(min-width: 1024px) 25vw, 100vw'}
            className="absolute h-full w-full rounded-lg object-cover transition-all duration-150 group-hover:mt-12"
          />
        ) : null}
        <div className="flex items-center justify-between pl-4 pr-2 pt-2 text-sm font-medium tracking-normal text-neutral-400">
          <span className="py-1.5">{tile.eyebrow}</span>
        </div>
        <div className="z-10 p-2">
          {tile.title ? (
            <span className="inline-block rounded-lg px-2 py-1 text-sm tracking-normal text-white/70 transition-colors duration-150 group-hover:bg-black/70">
              {tile.title}
              {tile.subtitle ? <span className="block text-white/55">{tile.subtitle}</span> : null}
            </span>
          ) : null}
        </div>
      </div>
    </CardShell>
  )
}

function RevealTile({ tile, index }: { tile: GardenTile; index?: number }) {
  return (
    <CardShell tile={tile} index={index}>
      <div className="absolute left-4 top-4 z-20 text-sm font-medium text-neutral-400">{tile.eyebrow}</div>
      {tile.image ? (
        <Image
          src={tile.image}
          alt={tile.imageAlt ?? ''}
          fill
          loading="eager"
          sizes="(min-width: 1024px) 25vw, 100vw"
          className="object-cover opacity-45 transition-all duration-150 group-hover:scale-105 group-hover:opacity-100"
        />
      ) : null}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-neutral-50 via-neutral-50/65 to-neutral-50/10 transition-opacity duration-150 group-hover:opacity-20" />
      <div className="relative z-20 flex h-full flex-col justify-end p-5 pt-16 transition-opacity duration-150 group-hover:opacity-25">
        {tile.status ? <span className="mb-3 w-fit rounded bg-sky-100 px-2 py-1 text-xs font-bold text-sky-700">{tile.status}</span> : null}
        {tile.title ? <h3 className="font-serif text-[clamp(2rem,2.4vw,3rem)] font-medium leading-[1.02] text-neutral-900">{tile.title}</h3> : null}
        {tile.subtitle ? <p className="mt-3 text-base leading-6 text-neutral-600">{tile.subtitle}</p> : null}
      </div>
    </CardShell>
  )
}

function TextTile({ tile, index }: { tile: GardenTile; index?: number }) {
  return (
    <CardShell tile={tile} index={index}>
      <div className="absolute left-4 top-4 z-20 text-sm font-medium text-neutral-400">{tile.eyebrow}</div>
      <div className="flex h-full flex-col justify-end p-5 pt-16">
        {tile.status ? <span className="mb-3 w-fit rounded bg-neutral-200/70 px-2 py-1 text-xs font-semibold text-neutral-500">{tile.status}</span> : null}
        {tile.title ? <h3 className="font-serif text-[clamp(1.9rem,2.2vw,2.6rem)] font-medium leading-[1.04] text-neutral-900">{tile.title}</h3> : null}
        {tile.body ? <p className="mt-4 line-clamp-6 text-[0.96rem] leading-7 text-neutral-600">{tile.body}</p> : null}
        <div className="mt-5">
          <TagList tags={tile.tags} />
        </div>
      </div>
    </CardShell>
  )
}

function ListTile({ tile, index }: { tile: GardenTile; index?: number }) {
  return (
    <CardShell tile={tile} index={index}>
      <div className="absolute left-4 top-4 z-20 text-sm font-medium text-neutral-400">{tile.eyebrow}</div>
      <div className="flex h-full flex-col justify-end p-5 pt-16">
        {tile.title ? <h3 className="font-serif text-4xl font-medium leading-[1.04] text-neutral-900">{tile.title}</h3> : null}
        {tile.body ? <p className="mt-4 max-w-2xl text-base leading-7 text-neutral-600">{tile.body}</p> : null}
        <div className="mt-6 grid gap-2">
          {tile.tags?.map((tag) => (
            <span key={tag} className="rounded bg-neutral-100 px-3 py-2 text-sm font-medium text-neutral-600 transition-colors group-hover:bg-white">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </CardShell>
  )
}

function ContactTile({ tile, index }: { tile: GardenTile; index?: number }) {
  return (
    <CardShell tile={tile} index={index}>
      <div className="absolute left-4 top-4 z-20 text-sm font-medium text-neutral-400">{tile.eyebrow}</div>
      <div className="flex h-full flex-col justify-end p-6 pt-16">
        <h3 className="max-w-3xl font-serif text-5xl font-medium leading-[1.04] text-neutral-900 max-md:text-3xl">{tile.title}</h3>
        <p className="mt-4 text-neutral-500">{tile.subtitle}</p>
      </div>
    </CardShell>
  )
}

export function GardenCard({ tile, index }: { tile: GardenTile; index?: number }) {
  if (tile.variant === 'project') {
    return <ProjectTile tile={tile} index={index} />
  }

  if (tile.variant === 'photo') {
    return <PhotoTile tile={tile} index={index} />
  }

  if (tile.variant === 'reveal') {
    return <RevealTile tile={tile} index={index} />
  }

  if (tile.variant === 'contact') {
    return <ContactTile tile={tile} index={index} />
  }

  if (tile.variant === 'list') {
    return <ListTile tile={tile} index={index} />
  }

  return <TextTile tile={tile} index={index} />
}
