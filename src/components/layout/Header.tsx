import { useState } from 'react'
import { nav, builderUrl } from '../../data/siteContent'
import './Header.css'

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="header">
      <div className="container header__inner">
        <a href="/" className="header__logo">
          снэпбилд
        </a>

        <nav className="header__nav" aria-label="Основная навигация">
          {nav.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <a href={builderUrl} className="btn btn-primary header__cta">
          Начать сейчас
        </a>

        <button
          type="button"
          className="header__toggle"
          aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {menuOpen && (
        <nav className="header__mobile-nav" aria-label="Мобильная навигация">
          {nav.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
              {item.label}
            </a>
          ))}
          <a href={builderUrl} className="btn btn-primary">
            Начать сейчас
          </a>
        </nav>
      )}
    </header>
  )
}

export default Header
