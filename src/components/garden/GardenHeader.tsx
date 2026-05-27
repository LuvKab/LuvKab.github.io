'use client'

import Link from 'next/link'
import clsx from 'clsx'
import { usePathname } from 'next/navigation'
import { externalLinks, navLinks } from '@/data/profile'

export function GardenHeader() {
  const pathname = usePathname()
  const isActive = (href: string, index: number) =>
    pathname === href || (index !== 0 && pathname.startsWith(href)) || (href === '/writing' && pathname.startsWith('/blog'))

  const wordmarkLink = navLinks[0]
  const sectionLinks = navLinks.slice(1)

  return (
    <nav
      aria-label="Main navigation"
      className="pointer-events-none sticky top-0 isolate z-40 flex items-center justify-between gap-3 px-1 py-5"
    >
      <Link
        href={wordmarkLink.href}
        className="pointer-events-auto font-serif text-[1.65rem] font-normal leading-none tracking-[-0.02em] text-neutral-900 transition-opacity hover:opacity-70"
      >
        {wordmarkLink.label}
        <span aria-hidden="true" className="ml-0.5 text-neutral-300">.</span>
      </Link>

      <div className="pointer-events-auto relative flex max-w-full overflow-x-auto rounded-full border border-neutral-200/80 bg-white/85 p-1 text-[0.78rem] font-medium text-neutral-500 shadow-[0_4px_20px_-12px_rgba(0,0,0,0.12)] backdrop-blur-md sm:text-[0.82rem]">
        {sectionLinks.map((link, index) =>
          link.href.startsWith('/') ? (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                'shrink-0 rounded-full px-3 py-1.5 transition-colors sm:px-4',
                isActive(link.href, index + 1)
                  ? 'bg-neutral-900 text-white'
                  : 'hover:text-neutral-900',
              )}
            >
              {link.label}
            </Link>
          ) : (
            <a
              key={link.href}
              href={link.href}
              className="shrink-0 rounded-full px-3 py-1.5 transition-colors hover:text-neutral-900 sm:px-4"
            >
              {link.label}
            </a>
          ),
        )}
      </div>

      <div className="pointer-events-auto hidden items-center gap-5 text-[0.82rem] font-medium text-neutral-500 md:flex">
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
      </div>
    </nav>
  )
}
