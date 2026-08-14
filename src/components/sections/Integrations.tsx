import { useState } from 'react'
import { integrations } from '../../data/newSections'
import { useReveal } from '../../hooks/useReveal'
import './Integrations.css'

const ALL = 'Все'

function Integrations() {
  const ref = useReveal<HTMLElement>()
  const [category, setCategory] = useState(ALL)

  const countOf = (name: string) =>
    name === ALL
      ? integrations.items.length
      : integrations.items.filter((i) => i.category === name).length

  const shown = integrations.items.filter(
    (i) => category === ALL || i.category === category,
  )

  return (
    <section className="integr reveal" id="integrations" ref={ref}>
      <h2 className="integr__title">{integrations.title}</h2>
      <p className="integr__lead">{integrations.lead}</p>

      <div className="integr__filters" role="group" aria-label="Категории интеграций">
        {integrations.categories.map((name) => (
          <button
            key={name}
            type="button"
            className={`integr__filter${name === category ? ' is-active' : ''}`}
            aria-pressed={name === category}
            onClick={() => setCategory(name)}
          >
            {name} <span className="integr__count">{countOf(name)}</span>
          </button>
        ))}
      </div>

      <div className="integr__grid">
        {shown.map((item) => (
          <article className="integr__card" key={item.name}>
            <div className="integr__card-top">
              <div className="integr__mono">{item.mono}</div>
              <span className="integr__category">{item.category}</span>
            </div>
            <h3 className="integr__name">{item.name}</h3>
            <p className="integr__desc">{item.desc}</p>
          </article>
        ))}
      </div>

      <p className="integr__footnote">
        {integrations.footnote.text}
        <a href={integrations.footnote.href}>{integrations.footnote.linkText}</a>
      </p>
    </section>
  )
}

export default Integrations
