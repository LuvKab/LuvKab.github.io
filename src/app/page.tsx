import { GardenFooter } from '@/components/garden/GardenFooter'
import { GardenGrid } from '@/components/garden/GardenGrid'
import { GardenHeader } from '@/components/garden/GardenHeader'

export default function HomePage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-screen-sm bg-white px-8 font-sans md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-2xl">
      <GardenHeader />
      <GardenGrid />
      <GardenFooter />
    </main>
  )
}
