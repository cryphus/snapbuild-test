import { useState } from 'react'
import { testimonials } from '../../data/newSections'
import './Testimonials.css'

function Testimonials() {
  const [index, setIndex] = useState(0)
  const total = testimonials.items.length
  const current = testimonials.items[index]

  const goTo = (next: number) => {
    setIndex(((next % total) + total) % total)
  }

  return (
    <section className="testimonials section reveal" id="testimonials">
      <div className="container">
        <div className="section__header section__header--center">
          <p className="section__eyebrow">{testimonials.eyebrow}</p>
          <h2>{testimonials.title}</h2>
        </div>

        <div className="testimonials__carousel">
          <button
            type="button"
            className="testimonials__arrow"
            aria-label="Предыдущий отзыв"
            onClick={() => goTo(index - 1)}
          >
            ‹
          </button>

          <article className="card testimonials__card">
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
