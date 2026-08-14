import { platform } from '../../data/siteContent'
import './Platform.css'

function Platform() {
  return (
    <section className="platform section" id="process">
      <div className="container">
        <div className="section__header section__header--center">
          <h2>{platform.title}</h2>
          <p className="section__lead">{platform.lead}</p>
        </div>

        <div className="platform__grid">
          {platform.cards.map((card) => (
            <article key={card.title} className="platform__card">
              <h3>{card.title}</h3>
              <p>{card.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Platform
