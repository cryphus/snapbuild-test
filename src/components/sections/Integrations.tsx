import { integrations } from '../../data/newSections'
import './Integrations.css'

function Integrations() {
  return (
    <section className="integrations section" id="integrations">
      <div className="container">
        <div className="section__header section__header--center">
          <p className="section__eyebrow">{integrations.eyebrow}</p>
          <h2>{integrations.title}</h2>
          <p className="section__lead">{integrations.lead}</p>
        </div>

        <div className="integrations__grid">
          {integrations.items.map((item) => (
            <div key={item.name} className="card integrations__item">
              <div className="integrations__mark" aria-hidden="true">
                {item.name.slice(0, 1)}
              </div>
              <div>
                <div className="integrations__top">
                  <h3>{item.name}</h3>
                  <span className="integrations__category">{item.category}</span>
                </div>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Integrations
