import { useEffect, useState } from 'react'
import { useCasesDemo } from '../../data/siteContent'
import { tabMedia } from '../../data/assets'
import { useReveal } from '../../hooks/useReveal'
import './UseCasesDemo.css'

const POINT_DURATION = 5000

function UseCasesDemo() {
  const ref = useReveal<HTMLElement>()

  const [tabId, setTabId] = useState(useCasesDemo.tabs[0].id)
  const [pointIndex, setPointIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  const activeTab = useCasesDemo.tabs.find((t) => t.id === tabId) ?? useCasesDemo.tabs[0]
  const media = tabMedia[activeTab.id] ?? []
  const pointsCount = activeTab.features.length

  // Пункты сменяются сами; пока курсор внутри списка, отсчёт стоит
  useEffect(() => {
    if (paused) return
    const timer = window.setTimeout(
      () => setPointIndex((i) => (i + 1) % pointsCount),
      POINT_DURATION,
    )
    return () => window.clearTimeout(timer)
  }, [pointIndex, tabId, paused, pointsCount])

  const selectTab = (id: string) => {
    setTabId(id)
    setPointIndex(0)
  }

  return (
    <section className="tabs" id="use-cases" ref={ref}>
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
        <div
          className="tabs__points"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {activeTab.features.map((feature, i) => {
            const isActive = i === pointIndex
            return (
              <button
                key={feature.title}
                type="button"
                className={`tabs__card${isActive ? ' is-active' : ''}`}
                aria-pressed={isActive}
                onMouseEnter={() => setPointIndex(i)}
                onFocus={() => setPointIndex(i)}
                onClick={() => setPointIndex(i)}
              >
                <span className="tabs__card-title">{feature.title}</span>

                <span className="tabs__card-desc">
                  <span>{feature.desc}</span>
                </span>

                <span className="tabs__card-progress" aria-hidden="true">
                  <span
                    className="tabs__card-progress-fill"
                    style={{ animationPlayState: paused ? 'paused' : 'running' }}
                  />
                </span>
              </button>
            )
          })}
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
