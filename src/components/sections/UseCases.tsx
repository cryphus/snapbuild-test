import { useCases } from '../../data/newSections'
import { useReveal } from '../../hooks/useReveal'
import './UseCases.css'

function UseCases() {
  const ref = useReveal<HTMLElement>()

  return (
    <section className="use-cases section reveal" ref={ref} id="scenarios">
      <div className="container">
        <div className="section__header">
          <p className="section__eyebrow">{useCases.eyebrow}</p>
          <h2>{useCases.title}</h2>
          <p className="section__lead">{useCases.lead}</p>
        </div>

        <div className="use-cases__grid">
          {useCases.items.map((item) => (
            <article key={item.title} className="card use-cases__card">
              <span className="use-cases__role">{item.role}</span>
              <h3>{item.title}</h3>
              <p className="use-cases__scenario">{item.scenario}</p>
              <p className="use-cases__result">{item.result}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default UseCases
