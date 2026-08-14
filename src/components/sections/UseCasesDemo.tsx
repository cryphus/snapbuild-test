import { useState } from 'react'
import { useCasesDemo } from '../../data/siteContent'
import { tabMedia } from '../../data/assets'
import { useReveal } from '../../hooks/useReveal'
import './UseCasesDemo.css'

function UseCasesDemo() {
  const ref = useReveal<HTMLElement>()

  const [tabId, setTabId] = useState(useCasesDemo.tabs[0].id)
  const [pointIndex, setPointIndex] = useState(0)

  const activeTab = useCasesDemo.tabs.find((t) => t.id === tabId) ?? useCasesDemo.tabs[0]
  const media = tabMedia[activeTab.id] ?? []

  const selectTab = (id: string) => {
    setTabId(id)
    setPointIndex(0)
  }

  return (
    <section className="tabs reveal" ref={ref} id="use-cases">
      <div className="tabs__header">
        <h2 className="tabs__title">{useCasesDemo.title}</h2>

        <div className="tabs__group" role="tablist" aria-label="Тип контента">
          {useCasesDemo.tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={tab.id === tabId}
              className={`tabs__tab${tab.id === tabId ? ' is-active' : ''}`}
              onClick={() => selectTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="tabs__body">
        <div className="tabs__points">
          {activeTab.features.map((feature, i) => (
            <button
              key={feature.title}
              type="button"
              className={`tabs__card${i === pointIndex ? ' is-active' : ''}`}
              aria-pressed={i === pointIndex}
              onClick={() => setPointIndex(i)}
            >
              <span className="tabs__card-progress" aria-hidden="true">
                <span className="tabs__card-progress-fill" />
              </span>
              <span className="tabs__card-title">{feature.title}</span>
              <span className="tabs__card-desc">{feature.desc}</span>
            </button>
          ))}
        </div>

        <div className="tabs__panel">
          {media.map((src, i) => (
            <img
              key={src}
              className={`tabs__media${i === pointIndex ? ' is-active' : ''}`}
              src={src}
              alt=""
              loading="lazy"
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default UseCasesDemo
