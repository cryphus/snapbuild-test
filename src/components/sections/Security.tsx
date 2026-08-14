import { security } from '../../data/siteContent'
import { images } from '../../data/assets'
import { useReveal } from '../../hooks/useReveal'
import './Security.css'

function Security() {
  const ref = useReveal<HTMLElement>()

  return (
    <section className="safe reveal" ref={ref} id="features">
      <h2 className="safe__title">Безопасность без&nbsp;компромиссов</h2>

      <div className="safe__points">
        {security.cards.map((card, i) => (
          <article key={card.title} className="safe__point">
            <div className="safe__image">
              <img src={images.security[i]} alt="" loading="lazy" />
            </div>
            <div className="safe__text">
              <h3 className="safe__point-title">{card.title}</h3>
              <p className="safe__point-desc">{card.desc}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Security
