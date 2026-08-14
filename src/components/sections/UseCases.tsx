import { useState } from 'react'
import { useCases } from '../../data/newSections'
import { renderAsset } from '../../data/assets'
import { useReveal } from '../../hooks/useReveal'
import './UseCases.css'

function UseCases() {
  const ref = useReveal<HTMLElement>()
  const [index, setIndex] = useState(0)
  // Кейсы, для которых файла рендера нет — тогда показываем подложку
  const [missingRenders, setMissingRenders] = useState<string[]>([])

  const active = useCases.items[index]
  const activeHasRender = !missingRenders.includes(active.render)

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

        {/*
          Все рендеры лежат в разметке и грузятся, когда секция доходит до
          экрана: переключение кейса не ждёт загрузки и идёт плавно.
        */}
        <div className={`cases__preview${activeHasRender ? ' has-render' : ''}`}>
          {useCases.items.map((item, i) => (
            <img
              key={item.render}
              className={`cases__render${i === index ? ' is-active' : ''}`}
              src={renderAsset(item.render)}
              alt={i === index ? `3D-рендер: ${item.title}` : ''}
              loading="lazy"
              decoding="async"
              onError={() =>
                setMissingRenders((prev) =>
                  prev.includes(item.render) ? prev : [...prev, item.render],
                )
              }
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default UseCases
