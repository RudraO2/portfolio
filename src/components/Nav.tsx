const links = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Wins', href: '#achievements' },
  { label: 'Work', href: '#projects' },
  { label: 'Writing', href: '/blog' },
  { label: 'Contact', href: '#contact' },
]

export function Nav({ current }: { current?: 'writing' }) {
  const visibleLinks = links.map(link => ({
    ...link,
    href: current && link.href.startsWith('#') ? `/${link.href}` : link.href,
  }))

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between p-4 sm:p-5">
      <a href="/" className="text-white text-2xl font-playfair italic">Rudra Techie</a>

      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-2 py-2 items-center gap-1">
        {visibleLinks.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            className="cursor-target text-white/70 hover:bg-white/20 hover:text-white transition-colors px-4 py-1.5 rounded-full text-sm font-medium"
            aria-current={current && label === 'Writing' ? 'page' : undefined}
          >
            {label}
          </a>
        ))}
      </div>

      <a
        href="mailto:24f3001340@ds.study.iitm.ac.in"
        className="cursor-target hidden lg:block bg-white/10 border border-white/20 text-white text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-white hover:text-black transition-all"
      >
        Hire Me
      </a>
      <a href="/blog" className="md:hidden text-white text-sm border border-white/30 rounded-full px-4 py-2 bg-black/40">Writing ↗</a>
    </nav>
  )
}
