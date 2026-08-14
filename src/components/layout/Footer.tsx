import { footer } from '../../data/siteContent'
import { images } from '../../data/assets'
import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <a href="#hero" className="footer__logo">
            <img src={images.logo} alt="Снэпбилд" />
          </a>
          <p>{footer.tagline}</p>
        </div>

        <div className="footer__col">
          <h4>Навигация</h4>
          <ul>
            {footer.nav.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__col">
          <h4>Документация</h4>
          <ul>
            <li>
              <a href="/privacy">Политика конфиденциальности</a>
            </li>
            <li>
              <a href="#faq">FAQ</a>
            </li>
          </ul>
        </div>

        <div className="footer__col">
          <h4>Контакты</h4>
          <ul>
            <li>
              <a href={footer.contacts.demo.href} target="_blank" rel="noreferrer">
                {footer.contacts.demo.label}
              </a>
            </li>
            <li>
              <a href={footer.contacts.telegram.href} target="_blank" rel="noreferrer">
                {footer.contacts.telegram.label}
              </a>
            </li>
            <li>
              <a href={`mailto:${footer.contacts.email}`}>{footer.contacts.email}</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        <p>{footer.copyright}</p>
      </div>
    </footer>
  )
}

export default Footer
