import { useState } from 'react'
import { faq } from '../../data/siteContent'
import { useReveal } from '../../hooks/useReveal'
import './Faq.css'

function splitInHalf<T>(items: T[]): [T[], T[]] {
  const middle = Math.ceil(items.length / 2)
  return [items.slice(0, middle), items.slice(middle)]
}

function Faq() {
  const ref = useReveal<HTMLElement>()
  const [openKey, setOpenKey] = useState<string | null>(faq.items[0].q)

  const columns = splitInHalf(faq.items)

  return (
    <section className="faq reveal" ref={ref} id="faq">
      <div className="faq__header">
        <h2 className="faq__title">{faq.title}</h2>
        <p className="faq__lead">{faq.lead}</p>
      </div>

      <div className="faq__list">
        {columns.map((column, columnIndex) => (
          <div className="faq__col" key={columnIndex}>
            {column.map((item) => {
              const isOpen = openKey === item.q
              const panelId = `faq-panel-${item.q.slice(0, 12).replace(/\s/g, '-')}`
              return (
                <div className={`faq__item${isOpen ? ' is-open' : ''}`} key={item.q}>
                  <button
                    type="button"
                    className="faq__trigger"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenKey(isOpen ? null : item.q)}
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
        ))}
      </div>
    </section>
  )
}

export default Faq
