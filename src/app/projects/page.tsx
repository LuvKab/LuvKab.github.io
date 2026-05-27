import type { Metadata } from 'next'
import { GardenPage } from '@/components/garden/GardenPage'
import { projectTiles } from '@/data/profile'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Built projects with public repos, live deployments, or real shipped sites by Xyras.',
}

export default function ProjectsPage() {
  return (
    <GardenPage
      title="projects"
      description="Things I have actually built: shipped websites, public repositories, live tools, and small utilities with source or deployment links."
      tiles={projectTiles}
    />
  )
}
