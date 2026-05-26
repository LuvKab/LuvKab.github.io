import { tiles } from '@/data/profile'
import { GardenCard } from './GardenCard'

function IntroTile() {
  const softLinkClass =
    'rounded underline decoration-neutral-300 decoration-dotted underline-offset-[0.16em] transition-colors [text-decoration-thickness:1px] hover:text-neutral-500'
  const orangeLinkClass =
    'rounded text-neutral-900 underline-offset-4 decoration-orange-300 transition-colors hover:text-neutral-500 hover:underline'
  const skyLinkClass = 'rounded text-neutral-900 underline-offset-4 decoration-sky-300 transition-colors hover:text-neutral-500 hover:underline'
  const tealLinkClass = 'rounded text-neutral-900 underline-offset-4 decoration-teal-300 transition-colors hover:text-neutral-500 hover:underline'

  return (
    <section className="row-span-2 px-1 pb-2 sm:col-span-2 lg:aspect-square" aria-labelledby="intro-title">
      <div className="flex h-full w-full flex-col justify-between p-4 sm:p-8">
        <h1
          id="intro-title"
          className="max-w-[17em] font-serif text-2xl font-light !leading-[1.25] tracking-normal text-neutral-400 sm:text-3xl lg:text-4xl"
        >
          Hey there, I&apos;m <span className="text-neutral-900">Xyras</span>. Welcome to my{' '}
          <a href="/blog" className={softLinkClass}>
            digital garden
          </a>
          . I build{' '}
          <a href="#projects" className={orangeLinkClass}>
            B2B websites
          </a>
          ,{' '}
          <a href="#systems" className={skyLinkClass}>
            product data
          </a>
          , CRM, and AI workflows.
          <br />
          <br />
          Most of my work sits between factory reality and software: product pages, customer notes, sales rhythm, and practical tools.
          <br />
          <br />I also keep{' '}
          <a href="#writing" className={tealLinkClass}>
            blog posts
          </a>
          , reading notes, language fragments, and useful tools.
        </h1>
      </div>
    </section>
  )
}

export function GardenGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-flow-row-dense sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <IntroTile />
      {tiles.map((tile, index) => (
        <GardenCard key={tile.id} tile={tile} index={index} />
      ))}
    </div>
  )
}
