import { trust } from '../../data/siteContent'
import { images } from '../../data/assets'
import { useReveal } from '../../hooks/useReveal'
import './TrustLogos.css'

function TrustLogos() {
  const ref = useReveal<HTMLElement>()

  // На мобильных лента едет бесконечно, поэтому список дублируется
  const marqueeGroup = (ariaHidden: boolean) => (
    <div className="trust__group" aria-hidden={ariaHidden || undefined}>
      {images.clientLogos.map((logo, i) => (
        <div
          className="trust__item"
          key={`${logo.src}-${i}`}
          style={{ '--logo-index': i } as React.CSSProperties}
        >
          <img src={logo.src} alt={ariaHidden ? '' : logo.name} />
        </div>
      ))}
    </div>
  )

  return (
    <section className="trust" id="logos" ref={ref}>
      <p className="trust__eyebrow">{trust.text}</p>
      <div className="trust__track">
        {marqueeGroup(false)}
        {marqueeGroup(true)}
      </div>
    </section>
  )
}

export default TrustLogos
