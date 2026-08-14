import { finalCta, builderUrl, footer } from '../../data/siteContent'
import { images } from '../../data/assets'
import './FinalCta.css'

function FinalCta() {
  return (
    <section className="launch-wrap">
      <div className="launch">
        {/* Декоративные слои: «пыль» с оригинала и два медленно плывущих пятна */}
        <div className="launch__dust" aria-hidden="true">
          <picture>
            <source media="(max-width: 767px)" srcSet={images.ctaDust.mobile} />
            <source media="(max-width: 1023px)" srcSet={images.ctaDust.tablet} />
            <img src={images.ctaDust.desktop} alt="" loading="lazy" />
          </picture>
        </div>
        <span className="launch__blob launch__blob--a" aria-hidden="true" />
        <span className="launch__blob launch__blob--b" aria-hidden="true" />

        <div className="launch__content">
          <div className="launch__intro">
            <h2 className="launch__title">{finalCta.title}</h2>
            <p className="launch__subtitle">{finalCta.subtitle}</p>
          </div>

          <div className="launch__actions">
            <a
              className="launch__btn"
              href={builderUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="brand-text">{finalCta.cta}</span>
            </a>
            <a
              className="launch__btn launch__btn--ghost"
              href={footer.contacts.demo.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {footer.contacts.demo.label}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FinalCta
