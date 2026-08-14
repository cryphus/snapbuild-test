import { useState } from 'react'
import { useCases } from '../../data/newSections'
import { useReveal } from '../../hooks/useReveal'
import './UseCases.css'

function UseCases() {
  const ref = useReveal<HTMLElement>()
  const [index, setIndex] = useState(0)

  const active = useCases.items[index]
  const total = String(useCases.items.length).padStart(2, '0')
  const current = String(index + 1).padStart(2, '0')

  return (
    <section className="cases reveal" id="scenarios" ref={ref}>
      <div className="cases__header">
        <h2 className="cases__title">{useCases.title}</h2>
        <p className="cases__lead">{useCases.lead}</p>
      </div>

      <div className="cases__panel">
        <div className="cases__list">
          {useCases.items.map((item, i) => {
            const isActive = i === index
            return (
              <button
                key={item.title}
                type="button"
                className={`cases__item${isActive ? ' is-active' : ''}`}
                aria-pressed={isActive}
                onClick={() => setIndex(i)}
                onMouseEnter={() => setIndex(i)}
                onFocus={() => setIndex(i)}
              >
                <span className="cases__item-title">{item.title}</span>
                <span className="cases__item-desc">
                  <span>{item.desc}</span>
                </span>
              </button>
            )
          })}
        </div>

        <div className="cases__preview" style={{ background: active.gradient }}>
          <div className="cases__preview-top">
            <span className="cases__badge">
              <span className="cases__badge-mark" style={{ background: active.accent }} />
              {active.role}
            </span>
            <span className="cases__counter">
              {current} / {total}
            </span>
          </div>

          {/* Абстрактное превью материала — меняется вместе с выбранным кейсом */}
          <div className="cases__canvas" key={index}>
            <span className="cases__caption">{active.caption}</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default UseCases
