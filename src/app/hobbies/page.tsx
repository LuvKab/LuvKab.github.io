import type { Metadata } from 'next'
import { GardenPage } from '@/components/garden/GardenPage'
import { hobbyTiles } from '@/data/profile'

export const metadata: Metadata = {
  title: 'Hobbies',
  description: 'Personal photos, desk corners, books, language notes, and loose interests by Xyras.',
}

export default function HobbiesPage() {
  return (
    <GardenPage
      title="hobbies"
      description="Loose personal corners: plants, desk photos, books, language fragments, old blog notes, and small habits that are not project case studies."
      tiles={hobbyTiles}
    />
  )
}
