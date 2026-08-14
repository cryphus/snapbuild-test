import { useState } from 'react'
import { faq } from '../../data/siteContent'
import './Faq.css'

function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="faq section" id="faq">
      <div className="container">
        <div className="section__header section__header--center">
          <h2>{faq.title}</h2>
          <p className="section__lead">{faq.lead}</p>
        </div>

        <div className="faq__list">
          {faq.items.map((item, index) => {
            const isOpen = openIndex === index
            const panelId = `faq-panel-${index}`
            return (
              <div className="faq__item" key={item.q}>
                <button
                  type="button"
                  className="faq__trigger"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <span>{item.q}</span>
                  <span className={`faq__icon${isOpen ? ' is-open' : ''}`} aria-hidden="true">
                    +
                  </span>
                </button>
                {isOpen && (
                  <p id={panelId} className="faq__answer">
                    {item.a}
                  </p>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Faq
