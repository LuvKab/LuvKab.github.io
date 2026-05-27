import type { CSSProperties } from 'react'
import { externalLinks, tiles, type GardenTile } from '@/data/profile'
import { GardenCard } from './GardenCard'

function IntroTile() {
  const dottedLinkClass =
    'rounded text-neutral-900 underline decoration-neutral-300 decoration-dotted underline-offset-[0.22em] [text-decoration-thickness:1.5px] transition-colors hover:decoration-neutral-900'
  const orangeLinkClass =
    'rounded text-neutral-900 underline decoration-2 decoration-orange-300 underline-offset-[0.22em] transition-colors hover:decoration-orange-500'
  const skyLinkClass =
    'rounded text-neutral-900 underline decoration-2 decoration-sky-300 underline-offset-[0.22em] transition-colors hover:decoration-sky-500'
  const tealLinkClass =
    'rounded text-neutral-900 underline decoration-2 decoration-teal-300 underline-offset-[0.22em] transition-colors hover:decoration-teal-500'
  const limeLinkClass =
    'rounded text-neutral-900 underline decoration-2 decoration-lime-300 underline-offset-[0.22em] transition-colors hover:decoration-lime-500'

  return (
    <section
      className="garden-enter row-span-2 px-1 pb-2 sm:col-span-2"
      style={{ '--garden-delay': '0ms' } as CSSProperties}
      aria-labelledby="intro-title"
    >
      <div className="flex h-full w-full flex-col justify-between gap-8 p-4 sm:p-8">
        <div>
          <div className="mb-6 flex items-center gap-2 font-mono text-[0.7rem] font-medium uppercase tracking-[0.18em] text-neutral-400">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500/80 ring-2 ring-emerald-500/15" />
            <span>Zhongshan · Builder</span>
            <span className="text-neutral-300">/</span>
            <span>Digital Garden</span>
          </div>
          <h1
            id="intro-title"
            className="max-w-[15em] font-serif text-[2rem] font-normal !leading-[1.12] tracking-[-0.015em] text-neutral-400 sm:text-[2.3rem] lg:text-[2.7rem] xl:text-[2.95rem]"
          >
            Hey there, I&apos;m <span className="font-medium text-neutral-900">Xyras</span>. Welcome to my{' '}
            <a href="/blog" className={dottedLinkClass}>
              digital garden
            </a>
            . I build{' '}
            <a href="/projects" className={orangeLinkClass}>
              small web tools
            </a>
            ,{' '}
            <a href="/projects" className={skyLinkClass}>
              export sites
            </a>
            , and practical systems.
            <br />
            <br />
            Around here you will find a few shipped projects, old posts, reading notes, and loose personal corners.
            <br />
            <br />
            I keep{' '}
            <a href="/writing" className={tealLinkClass}>
              writing
            </a>
            ,{' '}
            <a href="/reading" className={limeLinkClass}>
              reading
            </a>
            , and{' '}
            <a href="/hobbies" className={dottedLinkClass}>
              hobbies
            </a>{' '}
            close enough to bump into.
          </h1>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs font-medium sm:text-[0.82rem]">
          {externalLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
              className="group/btn inline-flex items-center gap-1.5 rounded-full bg-neutral-900 px-3.5 py-2 text-white transition-all hover:bg-neutral-700 first:bg-neutral-900 [&:not(:first-child)]:bg-neutral-100 [&:not(:first-child)]:text-neutral-700 [&:not(:first-child):hover]:bg-neutral-200 [&:not(:first-child):hover]:text-neutral-900"
            >
              {link.label}
              <span aria-hidden="true" className="text-current transition-transform group-hover/btn:translate-x-0.5">→</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export function GardenGrid() {
  return <GardenMasonry tiles={tiles} showIntro />
}

export function GardenMasonry({ tiles: items, showIntro = false }: { tiles: GardenTile[]; showIntro?: boolean }) {
  return (
    <div className="grid grid-cols-1 sm:grid-flow-row-dense sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {showIntro ? <IntroTile /> : null}
      {items.map((tile, index) => (
        <GardenCard key={tile.id} tile={tile} index={showIntro ? index + 1 : index} />
      ))}
    </div>
  )
}
