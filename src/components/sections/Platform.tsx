import { platform } from '../../data/siteContent'
import { images } from '../../data/assets'
import { useReveal } from '../../hooks/useReveal'
import './Platform.css'

function Platform() {
  const ref = useReveal<HTMLElement>()

  return (
    <section className="steps reveal" id="process" ref={ref}>
      <div className="steps__header">
        <h2 className="steps__title">{platform.title}</h2>
        <p className="steps__subtitle">{platform.lead}</p>
      </div>

      <div className="steps__grid">
        {platform.cards.map((card, i) => (
          <article key={card.title} className="steps__card">
            <img className="steps__media" src={images.steps[i]} alt="" loading="lazy" />
            <div className="steps__copy">
              <h3 className="steps__name">{card.title}</h3>
              <p className="steps__desc">{card.desc}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Platform
