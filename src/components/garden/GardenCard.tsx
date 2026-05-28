import Image from 'next/image'
import clsx from 'clsx'
import type { CSSProperties, ReactNode } from 'react'
import { ArrowUpRight } from 'lucide-react'
import type { GardenTile } from '@/data/profile'

const sizeClass = {
  square: 'aspect-square',
  wide: 'min-h-[18rem] sm:aspect-[2] sm:col-span-2',
  tall: 'aspect-square sm:row-span-2 sm:aspect-auto',
}

const chipColors = [
  'bg-lime-50 text-lime-800 ring-lime-200',
  'bg-orange-50 text-orange-800 ring-orange-200',
  'bg-indigo-50 text-indigo-800 ring-indigo-200',
  'bg-sky-50 text-sky-800 ring-sky-200',
]

const bookCoverStyles = [
  'bg-[linear-gradient(135deg,#fef3c7_0%,#fff7ed_52%,#fed7aa_100%)]',
  'bg-[linear-gradient(135deg,#e0f2fe_0%,#f8fafc_48%,#bae6fd_100%)]',
  'bg-[linear-gradient(135deg,#ede9fe_0%,#faf5ff_50%,#ddd6fe_100%)]',
  'bg-[linear-gradient(135deg,#dcfce7_0%,#f7fee7_52%,#bbf7d0_100%)]',
  'bg-[linear-gradient(135deg,#ffe4e6_0%,#fff1f2_48%,#fecdd3_100%)]',
  'bg-[linear-gradient(135deg,#e2e8f0_0%,#f8fafc_52%,#cbd5e1_100%)]',
]

const bookSpineStyles = ['bg-amber-700/20', 'bg-sky-700/20', 'bg-violet-700/20', 'bg-emerald-700/20', 'bg-rose-700/20', 'bg-slate-700/20']

function chipClass(chip: string, index: number) {
  const normalized = chip.toLowerCase()

  if (index === 0) {
    if (normalized === 'read') {
      return 'bg-emerald-50 text-emerald-800 ring-emerald-200'
    }

    if (normalized === 'reading') {
      return 'bg-amber-50 text-amber-800 ring-amber-200'
    }

    if (normalized === 'to read') {
      return 'bg-rose-50 text-rose-800 ring-rose-200'
    }
  }

  return chipColors[index % chipColors.length]
}

function ChipRow({ status, tags, limit = 3 }: { status?: string; tags?: string[]; limit?: number }) {
  const chips = [status, ...(tags ?? [])].filter(Boolean).slice(0, limit) as string[]

  if (!chips.length) {
    return null
  }

  return (
    <div className="mb-4 flex flex-wrap gap-1.5">
      {chips.map((chip, index) => (
        <span
          key={`${chip}-${index}`}
          className={clsx(
            'rounded-full px-2 py-0.5 text-[0.66rem] font-semibold uppercase tracking-[0.08em] ring-1 ring-inset',
            chipClass(chip, index),
          )}
        >
          {chip}
        </span>
      ))}
    </div>
  )
}

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="font-mono text-[0.7rem] font-medium uppercase tracking-[0.12em] text-neutral-400">
      {children}
    </span>
  )
}

function CardShell({ tile, children, index = 0 }: { tile: GardenTile; children: ReactNode; index?: number }) {
  const enterDelay = Math.min(index, 4) * 80
  const inner = (
    <div className="group relative h-full w-full overflow-hidden rounded-xl bg-neutral-50 transition-all duration-200 ease-out hover:bg-neutral-100 hover:shadow-[0_12px_30px_-18px_rgba(0,0,0,0.18)] focus-within:bg-neutral-100 focus-within:shadow-[0_12px_30px_-18px_rgba(0,0,0,0.18)]">
      {tile.href ? (
        <div className="pointer-events-none absolute right-3 top-3 z-30 flex h-7 w-7 items-center justify-center rounded-full text-neutral-400 transition-all duration-200 group-focus-within:bg-neutral-900 group-focus-within:text-white group-focus-within:shadow-[0_4px_10px_-2px_rgba(0,0,0,0.18)] group-hover:bg-neutral-900 group-hover:text-white group-hover:shadow-[0_4px_10px_-2px_rgba(0,0,0,0.18)]">
          <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-focus-within:-translate-y-0.5 group-focus-within:translate-x-0.5" strokeWidth={2.25} />
        </div>
      ) : null}
      {children}
    </div>
  )

  return (
    <div
      id={tile.id === 'awta-b2b-site' ? 'projects' : tile.id === 'writing-backlog' ? 'writing' : tile.id === 'export-sales-os' ? 'systems' : tile.id === 'reading-shelf' ? 'reading' : undefined}
      className={clsx('garden-enter scroll-mt-20 px-1 pb-2', sizeClass[tile.size])}
      style={{ '--garden-delay': `${enterDelay}ms` } as CSSProperties}
    >
      {tile.href ? (
        <a
          href={tile.href}
          target={tile.href.startsWith('http') ? '_blank' : undefined}
          rel={tile.href.startsWith('http') ? 'noreferrer' : undefined}
          className="block h-full rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2"
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
  const coverImage = tile.fit === 'cover'
  const mobileCoverImage = coverImage || tile.size === 'wide'

  return (
    <CardShell tile={tile} index={index}>
      <div className="relative isolate h-full w-full">
        <div className="relative z-10 flex items-center justify-between pl-4 pr-2 pt-3">
          <Eyebrow>{tile.eyebrow}</Eyebrow>
        </div>
        {tile.image ? (
          <div
            className={clsx(
              'pointer-events-none absolute bottom-0 -z-10 transition-transform duration-300 ease-out group-focus-within:scale-[1.04] group-hover:scale-[1.04]',
              tile.size === 'wide' ? 'inset-x-4 top-12 sm:inset-x-10 sm:top-16' : 'inset-x-5 bottom-5 top-14',
            )}
          >
            <Image
              src={tile.image}
              alt={tile.imageAlt ?? ''}
              fill
              loading="lazy"
              sizes={tile.size === 'wide' ? '(min-width: 1024px) 50vw, 100vw' : '(min-width: 1024px) 25vw, 100vw'}
              style={mobileCoverImage ? { objectPosition: '35% 50%' } : undefined}
              className={clsx(coverImage ? 'object-cover' : tile.size === 'wide' ? 'object-cover sm:object-contain sm:object-bottom' : 'object-contain object-bottom')}
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
            loading="lazy"
            sizes={tile.size === 'wide' ? '(min-width: 1024px) 50vw, 100vw' : '(min-width: 1024px) 25vw, 100vw'}
            className="pointer-events-none absolute h-full w-full rounded-xl object-cover transition-all duration-300 ease-out group-focus-within:scale-[1.03] group-hover:scale-[1.03]"
          />
        ) : null}
        <div className="z-10 flex items-center justify-between pl-4 pr-2 pt-3">
          <span className="rounded-full bg-white/85 px-2 py-0.5 font-mono text-[0.66rem] font-medium uppercase tracking-[0.12em] text-neutral-700 backdrop-blur-sm">
            {tile.eyebrow}
          </span>
        </div>
        <div className="z-10 p-3">
          {tile.title ? (
            <span className="inline-block rounded-md bg-black/0 px-2 py-1 text-sm font-medium tracking-normal text-white [overflow-wrap:anywhere] backdrop-blur-0 transition-all duration-200 group-focus-within:bg-black/60 group-focus-within:backdrop-blur-sm group-hover:bg-black/60 group-hover:backdrop-blur-sm">
              {tile.title}
              {tile.subtitle ? <span className="block text-xs font-normal text-white/70">{tile.subtitle}</span> : null}
            </span>
          ) : null}
        </div>
      </div>
    </CardShell>
  )
}

function RevealTile({ tile, index }: { tile: GardenTile; index?: number }) {
  const titleClass =
    tile.size === 'wide'
      ? 'text-[clamp(2.2rem,2.6vw,3.2rem)]'
      : 'text-[clamp(1.8rem,2.1vw,2.6rem)]'

  return (
    <CardShell tile={tile} index={index}>
      <div className="absolute left-4 top-3 z-20">
        <Eyebrow>{tile.eyebrow}</Eyebrow>
      </div>
      {tile.image ? (
        <Image
          src={tile.image}
          alt={tile.imageAlt ?? ''}
          fill
          loading="lazy"
          sizes="(min-width: 1024px) 25vw, 100vw"
          className="pointer-events-none object-cover opacity-50 transition-all duration-300 ease-out group-focus-within:scale-[1.04] group-focus-within:opacity-100 group-hover:scale-[1.04] group-hover:opacity-100"
        />
      ) : null}
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-neutral-50 via-neutral-50/70 to-neutral-50/10 transition-opacity duration-300 group-focus-within:opacity-0 group-hover:opacity-0" />
      <div className="relative z-20 flex h-full flex-col justify-end overflow-hidden p-5 pt-16 transition-opacity duration-300 group-focus-within:opacity-0 group-hover:opacity-0">
        <ChipRow status={tile.status} tags={tile.tags} limit={2} />
        {tile.title ? (
          <h3 className={clsx('line-clamp-3 font-serif font-normal leading-[1.02] tracking-[-0.015em] text-neutral-900 [overflow-wrap:anywhere]', titleClass)}>
            {tile.title}
          </h3>
        ) : null}
        {tile.subtitle ? <p className="mt-3 line-clamp-2 text-sm leading-6 text-neutral-500">{tile.subtitle}</p> : null}
      </div>
    </CardShell>
  )
}

function TextTile({ tile, index }: { tile: GardenTile; index?: number }) {
  const titleClass =
    tile.size === 'wide'
      ? 'text-[clamp(2.4rem,3vw,3.8rem)]'
      : 'text-[clamp(2rem,2.35vw,2.85rem)]'

  return (
    <CardShell tile={tile} index={index}>
      <div className="absolute left-4 top-3 z-20">
        <Eyebrow>{tile.eyebrow}</Eyebrow>
      </div>
      <div className="flex h-full flex-col justify-end overflow-hidden p-5 pt-16">
        <ChipRow status={tile.status} tags={tile.tags} />
        {tile.title ? (
          <h3 className={clsx('line-clamp-3 font-serif font-normal leading-[1.02] tracking-[-0.02em] text-neutral-900 [overflow-wrap:anywhere]', titleClass)}>
            {tile.title}
          </h3>
        ) : null}
        {tile.subtitle ? <p className="mt-4 line-clamp-2 text-sm leading-6 text-neutral-400">{tile.subtitle}</p> : null}
        {tile.body ? <p className="mt-2 line-clamp-2 text-[0.94rem] leading-7 text-neutral-600">{tile.body}</p> : null}
      </div>
    </CardShell>
  )
}

function WritingTile({ tile, index }: { tile: GardenTile; index?: number }) {
  return (
    <CardShell tile={tile} index={index}>
      <div className="flex h-full w-full flex-col justify-between">
        <div className="flex items-center justify-between pl-4 pr-2 pt-3">
          <Eyebrow>{tile.eyebrow}</Eyebrow>
        </div>
        <div className="p-5">
          {tile.title ? (
            <h3 className="font-serif text-[1.85rem] font-normal leading-[1.08] tracking-[-0.02em] text-neutral-900 [overflow-wrap:anywhere]">
              {tile.title}
            </h3>
          ) : null}
          {tile.subtitle ? (
            <span className="mb-4 mt-2 block font-mono text-[0.68rem] font-medium uppercase tracking-[0.12em] text-neutral-400">
              {tile.subtitle}
            </span>
          ) : null}
          {tile.body ? <p className="line-clamp-4 text-[0.94rem] leading-7 tracking-normal text-neutral-600">{tile.body}</p> : null}
        </div>
      </div>
    </CardShell>
  )
}

function BookTile({ tile, index }: { tile: GardenTile; index?: number }) {
  const coverIndex = index ?? 0

  return (
    <CardShell tile={tile} index={index}>
      <div className="flex h-full w-full flex-col justify-between">
        <div className="flex items-center justify-between pl-4 pr-2 pt-3">
          <Eyebrow>{tile.eyebrow}</Eyebrow>
        </div>
        <div className="grid grow grid-cols-[0.82fr_1fr] items-end gap-5 px-6 pb-7">
          <div
            className={clsx(
              'relative aspect-[0.68] overflow-hidden rounded-md bg-white shadow-[0_10px_30px_-8px_rgba(0,0,0,0.25)] transition-transform duration-300 ease-out group-focus-within:-rotate-3 group-focus-within:scale-110 group-focus-within:shadow-[0_18px_40px_-10px_rgba(0,0,0,0.35)] group-hover:-rotate-3 group-hover:scale-110 group-hover:shadow-[0_18px_40px_-10px_rgba(0,0,0,0.35)]',
              bookCoverStyles[coverIndex % bookCoverStyles.length],
            )}
          >
            {tile.image ? (
              <Image src={tile.image} alt={tile.imageAlt ?? ''} fill sizes="160px" className="object-cover" />
            ) : (
              <>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_18%,rgba(255,255,255,0.85),transparent_28%)]" />
                <div className={clsx('absolute inset-y-0 left-0 w-3', bookSpineStyles[coverIndex % bookSpineStyles.length])} />
                <div className="absolute bottom-5 right-4 h-8 w-8 rounded-full border border-white/60 bg-white/45" />
                <div className="relative flex h-full flex-col justify-between p-4">
                  <span className="font-mono text-[0.62rem] font-semibold uppercase tracking-normal text-neutral-400">{tile.status ?? 'READ'}</span>
                  <span className="line-clamp-4 font-serif text-base font-medium leading-[1.02] text-neutral-900 [overflow-wrap:anywhere] sm:text-[1.35rem]">{tile.title}</span>
                  <span className="line-clamp-2 text-xs font-medium leading-4 text-neutral-400">{tile.subtitle}</span>
                </div>
              </>
            )}
          </div>
          <div className="tracking-normal">
            <ChipRow status={tile.status} limit={1} />
            {tile.title ? (
              <h3 className="line-clamp-4 font-serif text-[1.05rem] font-normal leading-[1.25] tracking-[-0.01em] text-neutral-900 [overflow-wrap:anywhere]">
                {tile.title}
              </h3>
            ) : null}
            {tile.subtitle ? <span className="mt-1 block text-[0.82rem] leading-5 text-neutral-400">{tile.subtitle}</span> : null}
            {tile.body ? <p className="mt-3 line-clamp-3 text-[0.82rem] leading-5 text-neutral-600">{tile.body}</p> : null}
          </div>
        </div>
      </div>
    </CardShell>
  )
}

function ListTile({ tile, index }: { tile: GardenTile; index?: number }) {
  const visibleTags = tile.tags?.slice(0, tile.size === 'wide' ? 4 : 3)
  const titleClass =
    tile.size === 'wide'
      ? 'text-[clamp(2.35rem,2.8vw,3.5rem)]'
      : 'text-[clamp(2rem,2.35vw,2.85rem)]'

  return (
    <CardShell tile={tile} index={index}>
      <div className="absolute left-4 top-3 z-20">
        <Eyebrow>{tile.eyebrow}</Eyebrow>
      </div>
      <div className="flex h-full flex-col justify-end overflow-hidden p-5 pt-16">
        <ChipRow status={tile.status} tags={tile.tags} limit={2} />
        {tile.title ? (
          <h3 className={clsx('line-clamp-3 font-serif font-normal leading-[1.02] tracking-[-0.02em] text-neutral-900 [overflow-wrap:anywhere]', titleClass)}>
            {tile.title}
          </h3>
        ) : null}
        {tile.body ? <p className="mt-3 line-clamp-3 max-w-2xl text-[0.94rem] leading-7 text-neutral-600">{tile.body}</p> : null}
        <div className="mt-4 grid gap-1.5">
          {visibleTags?.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-white/70 px-3 py-1.5 text-[0.82rem] font-medium text-neutral-600 ring-1 ring-inset ring-neutral-200/70 transition-all group-hover:bg-white group-hover:ring-neutral-300"
            >
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
      <div className="absolute left-4 top-3 z-20">
        <Eyebrow>{tile.eyebrow}</Eyebrow>
      </div>
      <div className="flex h-full flex-col justify-end p-6 pt-16">
        <h3 className="max-w-3xl font-serif text-5xl font-normal leading-[1.04] tracking-[-0.02em] text-neutral-900 [overflow-wrap:anywhere] max-md:text-3xl">
          {tile.title}
        </h3>
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

  if (tile.variant === 'writing') {
    return <WritingTile tile={tile} index={index} />
  }

  if (tile.variant === 'book') {
    return <BookTile tile={tile} index={index} />
  }

  return <TextTile tile={tile} index={index} />
}
