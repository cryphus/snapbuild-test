import { useState } from 'react'
import { faq } from '../../data/siteContent'
import { useReveal } from '../../hooks/useReveal'
import './Faq.css'

function Faq() {
  const ref = useReveal<HTMLElement>()
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="faq reveal" id="faq" ref={ref}>
      <div className="faq__header">
        <h2 className="faq__title">{faq.title}</h2>
        <p className="faq__lead">{faq.lead}</p>
      </div>

      <div className="faq__list">
        {faq.items.map((item, index) => {
          const isOpen = openIndex === index
          const panelId = `faq-panel-${index}`
          return (
            <div className={`faq__item${isOpen ? ' is-open' : ''}`} key={item.q}>
              <button
                type="button"
                className="faq__trigger"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                <span className="faq__question">{item.q}</span>
                <span className="faq__icon" aria-hidden="true">
                  <span />
                  <span />
                </span>
              </button>
              <div className="faq__panel" id={panelId} hidden={!isOpen}>
                <p className="faq__answer">{item.a}</p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default Faq
