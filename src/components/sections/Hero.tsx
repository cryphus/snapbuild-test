import { hero, builderUrl } from '../../data/siteContent'
import './Hero.css'

function Hero() {
  return (
    <section className="hero section" id="hero">
      <div className="container hero__inner">
        <h1>{hero.title}</h1>
        <p className="hero__subtitle">{hero.subtitle}</p>
        <a href={builderUrl} className="btn btn-primary hero__cta">
          {hero.cta}
        </a>
      </div>
    </section>
  )
}

export default Hero
