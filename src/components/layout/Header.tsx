import { useEffect, useState } from 'react'
import { nav, builderUrl } from '../../data/siteContent'
import { images } from '../../data/assets'
import './Header.css'

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Блокируем прокрутку страницы, пока открыто мобильное меню
  useEffect(() => {
    document.documentElement.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.documentElement.style.overflow = ''
    }
  }, [menuOpen])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  return (
    <header className={`header${scrolled ? ' is-scrolled' : ''}`}>
      <div className="header__bar">
        <a href="#hero" className="header__logo">
          <img src={images.logo} alt="Снэпбилд" />
        </a>

        <nav className="header__nav" aria-label="Основная навигация">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="header__link">
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href={builderUrl}
          className="header__cta"
          target="_blank"
          rel="noopener noreferrer"
        >
          Начать сейчас
        </a>

        <button
          type="button"
          className="header__burger"
          aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className={menuOpen ? 'is-open' : undefined} />
          <span className={menuOpen ? 'is-open' : undefined} />
        </button>
      </div>

      {menuOpen && (
        <nav className="header__menu" aria-label="Мобильная навигация">
          {nav.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              style={{ animationDelay: `${60 + i * 45}ms` }}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <a
            href={builderUrl}
            className="header__menu-cta"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
          >
            Начать сейчас
          </a>
        </nav>
      )}
    </header>
  )
}

export default Header
