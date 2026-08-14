import { roadmap } from '../../data/siteContent'
import './Roadmap.css'

function Roadmap() {
  return (
    <section className="roadmap section" id="roadmap">
      <div className="container">
        <div className="section__header">
          <p className="section__eyebrow">{roadmap.eyebrow}</p>
          <h2>{roadmap.title}</h2>
        </div>
      </div>

      <div className="roadmap__scroll">
        <ul className="roadmap__track">
          {roadmap.items.map((item) => (
            <li key={item.title} className="card roadmap__card">
              <span className="roadmap__date">{item.date}</span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Roadmap
