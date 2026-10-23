import { Nav } from '../components/Nav'
import { projects, projectPath, type PortfolioProject } from '../content/projects'
import './project.css'

function ProjectHeader({ project }: { project: PortfolioProject }) {
  return <>
    <a className="blog-skip" href="#main">Skip to content</a>
    <Nav current="project" />
    <header className="project-heading">
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <a href="/">Home</a><span aria-hidden="true">/</span><a href="/#projects">Work</a><span aria-hidden="true">/</span><span>{project.title}</span>
      </nav>
      <p className="eyebrow"><span className="green-dot" />{project.category} <span>· {project.status}</span></p>
      <h1>{project.title}</h1>
      <p className="project-description">{project.description}</p>
      <div className="project-byline"><a href="/#about">Rudra Techie</a><span>Developer · Project notes</span></div>
      <div className="project-actions">
        {project.live && <a className="project-action project-action-primary" href={project.live} target="_blank" rel="noopener noreferrer">{project.liveLabel ?? 'Open the project'} <span aria-hidden="true">↗</span></a>}
        <a className="project-action" href={project.github} target="_blank" rel="noopener noreferrer">View source on GitHub <span aria-hidden="true">↗</span></a>
        {project.companion && <a className="project-action" href={project.companion.url} target="_blank" rel="noopener noreferrer">{project.companion.label} <span aria-hidden="true">↗</span></a>}
      </div>
    </header>
  </>
}

function ProjectFooter() {
  return <footer className="journal-footer"><a className="journal-brand" href="/">Rudra Techie</a><p>Projects, experiments and notes from building useful software.</p><div><a href="/#projects">All projects</a><a href="/blog">Notebook ↗</a><a href="/#contact">Contact ↗</a></div></footer>
}

function ProjectCard({ project }: { project: PortfolioProject }) {
  return <article className="journal-card project-related-card">
    <a href={projectPath(project)} className="card-image" tabIndex={-1} aria-hidden="true">
      <img src={project.coverSmall} srcSet={`${project.coverSmall} 600w, ${project.cover} 1200w`} sizes="(max-width: 720px) 100vw, 360px" width="1200" height="675" alt="" loading="lazy" decoding="async" />
    </a>
    <div className="card-copy"><p className="eyebrow">{project.category}</p><h2><a href={projectPath(project)}>{project.title}</a></h2><p>{project.description}</p><a className="read-link" href={projectPath(project)}>Project details <span aria-hidden="true">↗</span></a></div>
  </article>
}

export function ProjectPage({ project }: { project: PortfolioProject }) {
  const related = projects.filter(item => item.slug !== project.slug).slice(0, 3)
  return <div className="journal project-journal">
    <ProjectHeader project={project} />
    <main id="main">
      <figure className="project-cover">
        <img src={project.cover} srcSet={`${project.coverSmall} 600w, ${project.cover} 1200w`} sizes="(max-width: 760px) 100vw, 1200px" width="1200" height="675" alt={project.coverAlt} fetchPriority="high" />
        <figcaption>Conceptual project artwork, generated for this portfolio.</figcaption>
      </figure>
      <div className="project-layout">
        <aside className="project-aside">
          <div className="project-idea"><p className="eyebrow">THE ONE-LINE IDEA</p><p>{project.hook}</p></div>
          <div className="project-stack"><p className="eyebrow">BUILT WITH</p><ul>{project.stack.map(item => <li key={item}>{item}</li>)}</ul></div>
          <a href="/#projects" className="back-writing">← Back to all projects</a>
        </aside>
        <article className="project-body">
          <section className="project-glance" aria-labelledby="glance-title">
            <h2 id="glance-title">{project.title} at a glance</h2>
            <dl>
              <div><dt>The idea</dt><dd>{project.hook}</dd></div>
              <div><dt>What it does</dt><dd>{project.description}</dd></div>
              <div><dt>Built with</dt><dd>{project.stack.join(', ')}</dd></div>
              <div><dt>Status</dt><dd>{project.status}</dd></div>
            </dl>
          </section>
          {project.sections.map(section => <section key={section.title}>
            <h2>{section.title}</h2>
            {section.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
            {section.bullets && <ul>{section.bullets.map(item => <li key={item}>{item}</li>)}</ul>}
          </section>)}
          <section className="project-source">
            <p className="eyebrow">INSPECT THE IMPLEMENTATION</p>
            <h2>Read the code and project notes</h2>
            <p>The details above describe the public repository and project status as reviewed for this portfolio. Follow the source to inspect the implementation, setup instructions and current limitations.</p>
            <a href={project.github} target="_blank" rel="noopener noreferrer">{project.sourceLabel} <span aria-hidden="true">↗</span></a>
          </section>
          <div className="project-tags">{project.stack.map(item => <span key={item}>{item}</span>)}</div>
          <aside className="author-box"><span className="author-monogram" aria-hidden="true">r.</span><div><a href="/#about">Rudra Techie</a><p>Developer from Jaipur and IIT Madras student. I build software, test ideas and write about what I learn.</p><a href="/#projects">Explore the other projects ↗</a></div></aside>
        </article>
      </div>
      <section className="related-writing project-related">
        <div className="section-label"><h2>MORE WORK</h2><a href="/#projects">All projects ↗</a></div>
        <div className="journal-grid">{related.map(item => <ProjectCard key={item.slug} project={item} />)}</div>
      </section>
    </main>
    <ProjectFooter />
  </div>
}
