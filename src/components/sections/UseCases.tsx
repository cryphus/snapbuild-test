import { useState } from 'react'
import { useCases } from '../../data/newSections'
import { renderAsset } from '../../data/assets'
import { useReveal } from '../../hooks/useReveal'
import './UseCases.css'

function UseCases() {
  const ref = useReveal<HTMLElement>()
  const [index, setIndex] = useState(0)
  // Кейсы, для которых файла рендера ещё нет — показываем подложку из макета
  const [missingRenders, setMissingRenders] = useState<string[]>([])

  const active = useCases.items[index]
  const hasRender = !missingRenders.includes(active.render)

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

        {/* В превью только рендер — без плашек и подписей */}
        <div className="cases__preview" style={{ background: active.gradient }}>
          <div className={`cases__canvas${hasRender ? ' has-render' : ''}`} key={index}>
            {hasRender && (
              <img
                className="cases__render"
                src={renderAsset(active.render)}
                alt={`3D-рендер: ${active.title}`}
                loading="lazy"
                onError={() =>
                  setMissingRenders((prev) =>
                    prev.includes(active.render) ? prev : [...prev, active.render],
                  )
                }
              />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default UseCases
