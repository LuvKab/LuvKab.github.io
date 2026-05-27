import { externalLinks } from '@/data/profile'

export function GardenFooter() {
  return (
    <footer className="mt-24 border-t border-neutral-200/70 px-1 pb-12 pt-8">
      <div className="flex flex-col items-start justify-between gap-4 text-[0.82rem] text-neutral-400 md:flex-row md:items-center">
        <p className="flex items-center gap-2">
          <span className="font-serif text-[0.95rem] text-neutral-900">Xyras</span>
          <span aria-hidden="true" className="text-neutral-300">·</span>
          <span>Planted in Zhongshan, China</span>
        </p>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-medium text-neutral-500">
          {externalLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
              className="underline-offset-[6px] transition-colors hover:text-neutral-900 hover:underline"
            >
              {link.label}
            </a>
          ))}
          <span aria-hidden="true" className="hidden text-neutral-300 md:inline">·</span>
          <span className="text-neutral-400">© {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  )
}
