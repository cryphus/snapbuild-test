import { useEffect, useState } from 'react'
import { testimonials } from '../../data/newSections'
import { useReveal } from '../../hooks/useReveal'
import './Testimonials.css'

const AUTOPLAY_DELAY = 7000

function Testimonials() {
  const ref = useReveal<HTMLElement>()

  const [index, setIndex] = useState(0)
  // Направление нужно, чтобы отзыв въезжал с той стороны, куда листают
  const [direction, setDirection] = useState<'next' | 'prev'>('next')
  const [paused, setPaused] = useState(false)
  const total = testimonials.items.length
  const current = testimonials.items[index]

  const goTo = (next: number) => {
    const target = ((next % total) + total) % total
    if (target === index) return
    // при перелистывании через край считаем направление по самому шагу
    const forward = next > index
    setDirection(forward ? 'next' : 'prev')
    setIndex(target)
  }

  // Автосмена; пока курсор на карусели, отсчёт стоит
  useEffect(() => {
    if (paused) return
    const timer = window.setTimeout(() => {
      setDirection('next')
      setIndex((i) => (i + 1) % total)
    }, AUTOPLAY_DELAY)
    return () => window.clearTimeout(timer)
  }, [index, paused, total])

  return (
    <section className="testimonials section reveal" ref={ref} id="testimonials">
      <div className="container">
        <div className="section__header section__header--center">
          <p className="section__eyebrow">{testimonials.eyebrow}</p>
          <h2>{testimonials.title}</h2>
        </div>

        <div
          className="testimonials__carousel"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          <button
            type="button"
            className="testimonials__arrow"
            aria-label="Предыдущий отзыв"
            onClick={() => goTo(index - 1)}
          >
            ‹
          </button>

          <article className={`card testimonials__card is-${direction}`} key={index}>
            <p className="testimonials__quote">«{current.quote}»</p>
            <div className="testimonials__author">
              <div>
                <p className="testimonials__name">{current.name}</p>
                <p className="testimonials__role">
                  {current.role}, {current.company}
                </p>
              </div>
              <p className="testimonials__result">{current.result}</p>
            </div>
          </article>

          <button
            type="button"
            className="testimonials__arrow"
            aria-label="Следующий отзыв"
            onClick={() => goTo(index + 1)}
          >
            ›
          </button>
        </div>

        <div className="testimonials__dots" role="tablist" aria-label="Отзывы">
          {testimonials.items.map((item, i) => (
            <button
              key={item.name}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Отзыв ${i + 1} из ${total}`}
              className={`testimonials__dot${i === index ? ' is-active' : ''}`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
