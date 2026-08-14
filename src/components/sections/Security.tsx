import { security } from '../../data/siteContent'
import { images } from '../../data/assets'
import './Security.css'

function Security() {
  return (
    <section className="safe" id="features">
      <div className="safe__hero">
        <h2 className="safe__title">
          <span>Безопасность</span>
          <span className="brand-text">без компромиссов</span>
        </h2>
        <p className="safe__subtitle">
          Контроль над моделями, данными и инфраструктурой остаётся на вашей стороне
        </p>
      </div>

      <div className="safe__points">
        {security.cards.map((card, i) => (
          <article key={card.title} className="safe__point">
            <div className="safe__image">
              <img src={images.security[i]} alt="" loading="lazy" />
            </div>
            <h3 className="safe__point-title">{card.title}</h3>
            <p className="safe__point-desc">{card.desc}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Security
