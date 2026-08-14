import { hero, builderUrl } from '../../data/siteContent'
import { images } from '../../data/assets'
import './Hero.css'

function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero__card">
        <div className="hero__inner">
          <div className="hero__intro">
            <div className="hero__heading">
              <h1 className="hero__title">{hero.title}</h1>
              <p className="hero__subtitle">{hero.subtitle}</p>
            </div>
            <a
              className="hero__cta"
              href={builderUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="brand-text">{hero.cta}</span>
            </a>
          </div>

          <div className="hero__media">
            <img className="hero__shot" src={images.heroShot} alt="" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
