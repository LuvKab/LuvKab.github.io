import Link from 'next/link'
import { externalLinks, navLinks } from '@/data/profile'

export function GardenHeader() {
  return (
    <nav
      aria-label="Main navigation"
      className="pointer-events-none sticky top-0 isolate z-40 flex items-center justify-center px-1 py-4 md:justify-between"
    >
      <div className="pointer-events-auto relative flex max-w-full overflow-x-auto rounded-lg border border-neutral-200 bg-white/70 p-1 text-xs font-medium text-neutral-400 shadow-md backdrop-blur-md sm:text-sm">
        {navLinks.map((link, index) =>
          link.href.startsWith('/') ? (
            <Link
              key={link.href}
              href={link.href}
              className={
                index === 0
                  ? 'shrink-0 rounded-md bg-neutral-100 px-1 py-1 text-neutral-900 transition-colors sm:px-3'
                  : 'shrink-0 rounded-md px-1 py-1 transition-colors hover:text-neutral-900 sm:px-3'
              }
            >
              {link.label}
            </Link>
          ) : (
            <a key={link.href} href={link.href} className="shrink-0 rounded-md px-1 py-1 transition-colors hover:text-neutral-900 sm:px-3">
              {link.label}
            </a>
          ),
        )}
      </div>

      <div className="pointer-events-auto hidden gap-7 text-sm font-medium text-neutral-400 transition-opacity md:flex">
        {externalLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target={link.href.startsWith('http') ? '_blank' : undefined}
            rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
            className="cursor-alias underline-offset-4 transition-colors hover:text-neutral-900 hover:underline"
          >
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  )
}
