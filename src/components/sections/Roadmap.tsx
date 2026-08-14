import { useRef } from 'react'
import { roadmap } from '../../data/siteContent'
import './Roadmap.css'

function Roadmap() {
  const scrollerRef = useRef<HTMLDivElement>(null)

  // Перетаскивание ленты мышью — как в оригинале
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') return
    const scroller = scrollerRef.current
    if (!scroller) return

    const startX = e.pageX
    const startLeft = scroller.scrollLeft
    scroller.classList.add('is-dragging')

    const onMove = (ev: PointerEvent) => {
      scroller.scrollLeft = startLeft - (ev.pageX - startX)
    }
    const release = () => {
      scroller.classList.remove('is-dragging')
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', release)
      window.removeEventListener('pointercancel', release)
    }

    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', release)
    window.addEventListener('pointercancel', release)
    e.preventDefault()
  }

  return (
    <section className="rmap reveal" id="roadmap">
      <div className="rmap__header">
        <p className="rmap__eyebrow">{roadmap.eyebrow}</p>
        <h2 className="rmap__title">{roadmap.title}</h2>
      </div>

      <div
        className="rmap__scroll"
        ref={scrollerRef}
        onPointerDown={handlePointerDown}
      >
        <ul className="rmap__track">
          {roadmap.items.map((item) => (
            <li key={item.title} className="rmap__item">
              <div className="rmap__marker" aria-hidden="true">
                <span className="rmap__dot-halo" />
                <span className="rmap__dot-core" />
              </div>
              <span className="rmap__date">{item.date}</span>
              <h3 className="rmap__name">{item.title}</h3>
              <p className="rmap__desc">{item.desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Roadmap
