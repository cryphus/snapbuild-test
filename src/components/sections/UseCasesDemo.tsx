import { useState } from 'react'
import { useCasesDemo } from '../../data/siteContent'
import './UseCasesDemo.css'

function UseCasesDemo() {
  const [activeId, setActiveId] = useState(useCasesDemo.tabs[0].id)
  const activeTab = useCasesDemo.tabs.find((tab) => tab.id === activeId) ?? useCasesDemo.tabs[0]

  return (
    <section className="use-cases-demo section" id="use-cases">
      <div className="container">
        <div className="section__header section__header--center">
          <h2>{useCasesDemo.title}</h2>
        </div>

        <div className="use-cases-demo__tablist" role="tablist" aria-label="Тип контента">
          {useCasesDemo.tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={tab.id === activeId}
              className={`use-cases-demo__tab${tab.id === activeId ? ' is-active' : ''}`}
              onClick={() => setActiveId(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="use-cases-demo__grid" role="tabpanel">
          {activeTab.features.map((feature) => (
            <article key={feature.title} className="card use-cases-demo__card">
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default UseCasesDemo
