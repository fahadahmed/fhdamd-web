import { Link } from "@remix-run/react"
export default function Navigation() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <img src="/images/logo.svg" alt="Fahad Ahmed" />
      <Link to="/"><img src="/images/home-menu-item.svg" alt="Home" width="48" /></Link>
      <Link to="/about"><img src="/images/about-menu-item.svg" alt="Home" width="48" /></Link>
      <Link to="/search"><img src="/images/search-menu-item.svg" alt="Home" width="48" /></Link>
      <Link to="/issues"><img src="/images/blog-menu-item.svg" alt="Home" width="48" /></Link>
    </div>
  )
}