import { Nav } from './components/Nav'
import { RevealLayer } from './components/RevealLayer'
import { About } from './components/About'
import { Skills } from './components/Skills'
import { TechMarquee } from './components/TechMarquee'
import { Achievements } from './components/Achievements'
import { Projects } from './components/Projects'
import { Contact } from './components/Contact'
import TargetCursor from './components/reactbits/TargetCursor'
import { useRevealObserver } from './hooks/useReveal'
import { BlogArticle, BlogIndex, NotFound, WritingPreview } from './blog/Blog'
import { posts } from './content/posts'
import { projects } from './content/projects'
import { ProjectPage } from './projects/ProjectPage'

const BG_IMAGE_1 = '/img1.jpeg'
const BG_IMAGE_2 = '/img2.jpeg'

function Portfolio() {
  useRevealObserver()

  return (
    <div
      className="min-h-screen bg-black tracking-[-0.02em]"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <Nav />

      <section
        className="relative w-full h-screen overflow-hidden bg-black"
        style={{ height: '100dvh' }}
      >
        {/* Base image */}
        <div
          className="absolute inset-0 bg-center bg-cover bg-no-repeat z-10 hero-zoom"
          style={{ backgroundImage: `url(${BG_IMAGE_1})` }}
        />

        {/* Cursor-following reveal layer */}
        <RevealLayer image={BG_IMAGE_2} />

        {/* Heading */}
        <div className="absolute left-10 md:left-14 right-5 bottom-44 sm:bottom-48 z-50 flex flex-col items-start text-left pointer-events-none">
          <h1 className="text-white leading-[0.95]">
            <span
              className="block mb-4 text-xs sm:text-sm uppercase tracking-[0.25em] text-white/80 hero-anim hero-fade"
              style={{ animationDelay: '0.1s' }}
            >
              Rudra Techie <span className="text-white/50">· Rudra Pratap Singh</span>
            </span>
            <span
              className="block font-playfair italic font-normal text-5xl sm:text-7xl md:text-8xl hero-anim hero-reveal"
              style={{ letterSpacing: '-0.05em', animationDelay: '0.25s' }}
            >
              Building ideas
            </span>
            <span
              className="block font-normal text-5xl sm:text-7xl md:text-8xl -mt-1 hero-anim hero-reveal"
              style={{ letterSpacing: '-0.08em', animationDelay: '0.42s' }}
            >
              for the future
            </span>
          </h1>
        </div>

        {/* Bottom-left paragraph */}
        <div
          className="hidden sm:block absolute bottom-14 left-10 md:left-14 max-w-[340px] z-50 hero-anim hero-fade"
          style={{ animationDelay: '0.7s' }}
        >
          <p className="text-sm text-white/80 leading-relaxed">
            Rudra Techie (Rudra Pratap Singh) is a software developer from Jaipur and a Data
            Science student at IIT Madras. He builds web apps, Android tools and AI benchmarks
            with React, Next.js, Kotlin and Python. He won 1st place at HackPulse 2026.
          </p>
        </div>

        {/* Bottom-right block */}
        <div
          className="absolute bottom-10 sm:bottom-24 left-5 right-5 sm:left-auto sm:right-10 md:right-14 max-w-full sm:max-w-[260px] z-50 flex flex-col items-start gap-4 sm:gap-5 hero-anim hero-fade"
          style={{ animationDelay: '0.85s' }}
        >
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
            Scroll down to explore my latest work, or use the interactive spotlight to reveal the
            layers of my process.
          </p>
          <a
            href="#projects"
            className="cursor-target inline-block bg-white text-black hover:bg-gray-200 text-sm font-medium px-7 py-3 rounded-full transition-all hover:scale-[1.03] active:scale-95 hover:shadow-lg hover:shadow-white/20"
          >
            Explore Work
          </a>
        </div>
      </section>

      <main className="relative z-40 bg-black text-white">
        <About />
        <Skills />
        <TechMarquee />
        <Achievements />
        <Projects />
        <WritingPreview />
        <Contact />
      </main>
    </div>
  )
}

function App({ pathname = typeof window === 'undefined' ? '/' : window.location.pathname }: { pathname?: string }) {
  const path = pathname.replace(/\/+$/, '') || '/'
  const post = posts.find(item => path === `/blog/${item.slug}`)
  const project = projects.find(item => path === `/projects/${item.slug}`)
  let page
  if (path === '/') page = <Portfolio />
  else if (path === '/blog') page = <BlogIndex />
  else if (post) page = <BlogArticle post={post} />
  else if (project) page = <ProjectPage project={project} />
  else page = <NotFound />

  return <><TargetCursor targetSelector=".cursor-target, .journal a, .journal button, .journal input" spinDuration={2} />{page}</>
}

export default App
