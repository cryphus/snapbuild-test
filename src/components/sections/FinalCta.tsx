import { finalCta, builderUrl } from '../../data/siteContent'
import './FinalCta.css'

function FinalCta() {
  return (
    <section className="final-cta section section--alt">
      <div className="container final-cta__inner">
        <h2>{finalCta.title}</h2>
        <p className="section__lead">{finalCta.subtitle}</p>
        <a href={builderUrl} className="btn btn-primary final-cta__button">
          {finalCta.cta}
        </a>
      </div>
    </section>
  )
}

export default FinalCta
