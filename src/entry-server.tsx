import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App.tsx'
export { posts } from './content/posts'
export { projects } from './content/projects'

/** Used at build time only: turns the app into static HTML for crawlers. */
export function render(pathname = '/') {
  return renderToString(
    <StrictMode>
      <App pathname={pathname} />
    </StrictMode>,
  )
}
