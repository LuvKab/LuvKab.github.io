import { GardenFooter } from './GardenFooter'
import { GardenHeader } from './GardenHeader'
import { GardenMasonry } from './GardenGrid'
import type { GardenTile } from '@/data/profile'

type GardenPageProps = {
  title: string
  description: string
  tiles: GardenTile[]
}

export function GardenPage({ title, description, tiles }: GardenPageProps) {
  return (
    <main className="mx-auto min-h-screen w-full max-w-screen-sm bg-white px-8 font-sans text-neutral-900 md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-2xl">
      <GardenHeader />
      <section className="flex flex-col gap-5 px-2 pb-12 pt-8 md:pt-12">
        <div className="flex items-center gap-2 font-mono text-[0.7rem] font-medium uppercase tracking-[0.18em] text-neutral-400">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-neutral-900/70" />
          <span>Section</span>
          <span className="text-neutral-300">/</span>
          <span className="text-neutral-600">{title}</span>
        </div>
        <h1 className="font-serif text-[3.5rem] font-normal leading-[0.95] tracking-[-0.04em] text-neutral-900 md:text-[6rem] lg:text-[7rem]">
          {title}<span className="text-neutral-300">.</span>
        </h1>
        <p className="max-w-prose text-[1rem] leading-7 tracking-normal text-neutral-500">{description}</p>
      </section>
      <GardenMasonry tiles={tiles} />
      <GardenFooter />
    </main>
  )
}
