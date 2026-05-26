export const navLinks = [
  { label: 'Xyras', href: '/' },
  { label: 'Projects', href: '#projects' },
  { label: 'Writing', href: '#writing' },
  { label: 'Systems', href: '#systems' },
  { label: 'Reading', href: '#reading' },
  { label: 'Blog', href: '/blog' },
]

export const externalLinks = [
  { label: 'GitHub', href: 'https://github.com/LuvKab' },
  { label: 'Email', href: 'mailto:xyras_sun@163.com' },
  { label: 'CV', href: '/resume.pdf' },
]

export type GardenTile = {
  id: string
  eyebrow: string
  title?: string
  subtitle?: string
  body?: string
  href?: string
  image?: string
  imageAlt?: string
  size: 'square' | 'wide' | 'tall'
  variant: 'project' | 'photo' | 'reveal' | 'text' | 'contact' | 'list'
  caption?: boolean
  status?: string
  tags?: string[]
}

export const tiles: GardenTile[] = [
  {
    id: 'awta-b2b-site',
    eyebrow: 'Projects · AWTA Website',
    title: 'AWTA B2B Multilingual Website',
    subtitle: '4 days · 10 languages · 170+ URLs',
    href: 'https://awtaled.com',
    image: '/images/awta-products-en.png',
    imageAlt: 'AWTA website product category section screenshot',
    size: 'wide',
    variant: 'project',
  },
  {
    id: 'factory-context',
    eyebrow: 'Projects · Manufacturing',
    title: 'Manufacturing Floor',
    subtitle: 'Where export work starts',
    image: '/images/garden/factory-line.jpg',
    imageAlt: 'Factory production line with workers and machinery',
    size: 'square',
    variant: 'photo',
    caption: true,
  },
  {
    id: 'desk-workbench',
    eyebrow: 'Tools · Workbench',
    title: 'Desk Setup',
    subtitle: 'Notes, tools, review rhythm',
    image: '/images/garden/plants-desk.jpg',
    imageAlt: 'A desk setup with plants, laptop, and monitor',
    size: 'square',
    variant: 'photo',
    caption: true,
  },
  {
    id: 'reopen-blog',
    eyebrow: 'Writing · Blog',
    title: '重开博客',
    body: 'A small note on reopening the old blog and keeping a place for language learning notes, project fragments, and personal essays.',
    status: 'APR 2026',
    tags: ['old blog', 'notes'],
    href: '/blog/reopen-blog',
    size: 'square',
    variant: 'text',
  },
  {
    id: 'ai-content-pipeline',
    eyebrow: 'Systems · AI Workflow',
    title: 'AI Content Pipeline',
    body: 'An AI-assisted workflow for turning English SEO content into multilingual drafts with protected links, image paths, and human review.',
    status: 'AI WORKFLOW',
    tags: ['9-language drafts', '3 SEO articles', 'translation workflow'],
    size: 'square',
    variant: 'text',
  },
  {
    id: 'export-sales-os',
    eyebrow: 'Systems · CRM / SOP',
    title: 'Export Sales OS',
    body: 'A personal operating system for export sales: lead pool, customer records, market strategy, scripts, CRM handoff, and review rhythm.',
    status: 'CRM / SOP',
    tags: ['lead pool', 'customer records', 'Day 0/3/7-10/21/30'],
    size: 'square',
    variant: 'text',
  },
  {
    id: 'product-data',
    eyebrow: 'Systems · Product Data',
    title: 'Product Data Workbench',
    subtitle: 'Specs, images, packaging, review loops',
    image: '/images/garden/notes-laptop.jpg',
    imageAlt: 'A laptop and handwritten notes on a work table',
    size: 'square',
    variant: 'photo',
    caption: true,
  },
  {
    id: 'hundsun-ta-testing',
    eyebrow: 'Work · Enterprise Systems',
    title: 'Hundsun TA Testing',
    body: 'Testing and delivery work for securities and fund core systems, covering requirements, defects, regression, data validation, and delivery coordination.',
    status: '2021 - 2024',
    tags: ['test lead', 'financial core systems'],
    size: 'square',
    variant: 'text',
  },
  {
    id: 'writing-backlog',
    eyebrow: 'Writing · Drafts',
    title: 'Writing Backlog',
    body: 'Working notes for turning project experience into essays about B2B websites, product data, CRM rhythm, and practical AI workflows.',
    tags: [
      'Building a B2B export website in 4 days',
      'Why factories need product data before AI',
      'CRM needs a follow-up rhythm',
    ],
    size: 'wide',
    variant: 'list',
  },
  {
    id: 'obsidian-workbench',
    eyebrow: 'Systems · Knowledge Base',
    title: 'Obsidian Workbench',
    subtitle: 'Customer notes, decisions, research, weekly review',
    image: '/images/garden/shelf-desk.jpg',
    imageAlt: 'Wall shelves with books, plants, and a desk',
    size: 'square',
    variant: 'reveal',
    caption: true,
  },
  {
    id: 'quitting-duolingo',
    eyebrow: 'Writing · Blog',
    title: '电子服刑',
    subtitle: 'April 6, 2026',
    href: '/blog/quitting-duolingo',
    image: '/blog-assets/quitting-duolingo/duolinguo1.png',
    imageAlt: 'A screenshot from the Duolingo blog post',
    size: 'square',
    variant: 'photo',
    caption: true,
  },
  {
    id: 'reading-shelf',
    eyebrow: 'Reading · Books',
    title: 'Reading Shelf',
    subtitle: 'Design, systems, sales, software',
    image: '/images/garden/desk-books.jpg',
    imageAlt: 'Books and a small plant on a desk',
    size: 'square',
    variant: 'reveal',
    caption: true,
  },
  {
    id: 'tools',
    eyebrow: 'Tools · Daily Stack',
    title: 'Tools I Keep Around',
    body: 'A practical stack for building, writing, operating, and reviewing small systems without turning every workflow into a large platform.',
    tags: ['Obsidian', 'Codex', 'ChatGPT', 'Next.js', 'Payload CMS', 'Cloudflare', 'Vercel', 'CRM systems'],
    size: 'square',
    variant: 'text',
  },
  {
    id: 'current-focus',
    eyebrow: 'Notes · Now',
    title: 'Current Focus',
    body: 'Making overseas growth work more concrete for small manufacturing teams: websites, product data, inquiries, CRM, follow-up, and useful automation.',
    status: 'ZHONGSHAN',
    size: 'square',
    variant: 'text',
  },
  {
    id: 'blog-index',
    eyebrow: 'Writing · Archive',
    title: 'Older Blog',
    body: 'The old blog files are preserved here: reopening the blog, language learning notes, and small personal essays.',
    href: '/blog',
    tags: ['3 posts', 'kept intact'],
    size: 'square',
    variant: 'text',
  },
  {
    id: 'contact',
    eyebrow: 'Contact · Say Hello',
    title: 'Open to export growth, independent-site operations, AI workflow, and B2B digitalization work.',
    subtitle: 'xyras_sun@163.com · Zhongshan, China',
    href: 'mailto:xyras_sun@163.com',
    size: 'wide',
    variant: 'contact',
  },
]
