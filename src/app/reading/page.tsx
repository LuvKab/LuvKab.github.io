import type { Metadata } from 'next'
import { GardenPage } from '@/components/garden/GardenPage'
import { readingTiles } from '@/data/profile'

export const metadata: Metadata = {
  title: 'Reading',
  description: 'Books, notes, and references that feed product, design, sales, and systems work.',
}

export default function ReadingPage() {
  return (
    <GardenPage
      title="reading"
      description="Books, notes, and references that feed product, design, sales, and systems work. Recommendations are welcome."
      tiles={readingTiles}
    />
  )
}
