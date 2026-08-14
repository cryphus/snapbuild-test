import { useEffect, useRef } from 'react'
import { trust } from '../../data/siteContent'
import { images } from '../../data/assets'
import './TrustLogos.css'

function TrustLogos() {
  const sectionRef = useRef<HTMLElement>(null)

  // На десктопе логотипы проявляются по очереди при попадании в вьюпорт
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    if (!('IntersectionObserver' in window)) {
      el.classList.add('is-revealed')
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return
        el.classList.add('is-revealed')
        observer.disconnect()
      },
      { threshold: 0.18 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // На мобильных лента бесконечно едет, поэтому список дублируется
  const marqueeGroup = (ariaHidden: boolean) => (
    <div className="trust__group" aria-hidden={ariaHidden || undefined}>
      {images.clientLogos.map((logo, i) => (
        <div className="trust__item" key={`${logo.src}-${i}`} style={{ '--logo-index': i } as React.CSSProperties}>
          <img src={logo.src} alt={ariaHidden ? '' : logo.name} />
        </div>
      ))}
    </div>
  )

  return (
    <section className="trust" ref={sectionRef} id="logos">
      <p className="trust__eyebrow">{trust.text}</p>
      <div className="trust__track">
        {marqueeGroup(false)}
        {marqueeGroup(true)}
      </div>
    </section>
  )
}

export default TrustLogos
