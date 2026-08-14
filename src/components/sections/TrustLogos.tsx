import { trust } from '../../data/siteContent'
import './TrustLogos.css'

function TrustLogos() {
  return (
    <section className="trust section--tight">
      <div className="container">
        <p className="trust__text">{trust.text}</p>
        <ul className="trust__logos">
          {trust.logos.map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default TrustLogos
