import { security } from '../../data/siteContent'
import './Security.css'

function Security() {
  return (
    <section className="security section" id="features">
      <div className="container">
        <div className="section__header section__header--center">
          <h2>{security.title}</h2>
        </div>

        <div className="security__grid">
          {security.cards.map((card) => (
            <article key={card.title} className="card security__card">
              <h3>{card.title}</h3>
              <p>{card.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Security
