import { useState } from 'react'
import { pricing, type BillingPeriod } from '../../data/newSections'
import { useReveal } from '../../hooks/useReveal'
import './Pricing.css'

function Pricing() {
  const ref = useReveal<HTMLElement>()
  const [period, setPeriod] = useState<BillingPeriod>('yearly')

  return (
    <section className="plans reveal" id="pricing" ref={ref}>
      <div className="plans__header">
        <div>
          <h2 className="plans__title">{pricing.title}</h2>
          <p className="plans__lead">{pricing.lead}</p>
        </div>

        <div className="plans__toggle" role="group" aria-label="Период оплаты">
          <button
            type="button"
            className={`plans__toggle-btn${period === 'monthly' ? ' is-active' : ''}`}
            aria-pressed={period === 'monthly'}
            onClick={() => setPeriod('monthly')}
          >
            Помесячно
          </button>
          <button
            type="button"
            className={`plans__toggle-btn${period === 'yearly' ? ' is-active' : ''}`}
            aria-pressed={period === 'yearly'}
            onClick={() => setPeriod('yearly')}
          >
            Год <span className="plans__discount">−20%</span>
          </button>
        </div>
      </div>

      <div className="plans__grid">
        {pricing.plans.map((plan) => {
          const card = (
            <div className="plans__card">
              <div className="plans__card-head">
                <h3 className="plans__name">{plan.name}</h3>
                {plan.badge && <span className="plans__badge">{plan.badge}</span>}
              </div>

              <p className="plans__desc">{plan.description}</p>

              <div className="plans__price">{plan.price[period]}</div>
              <div className="plans__note">{plan.note[period]}</div>

              <div className="plans__features">
                {plan.features.map((feature) => (
                  <div key={feature}>{feature}</div>
                ))}
              </div>

              <button
                type="button"
                className={`plans__cta${plan.highlighted ? ' plans__cta--primary' : ''}`}
              >
                {plan.cta}
              </button>
            </div>
          )

          // У выделенного тарифа рамка сделана градиентной подложкой
          return plan.highlighted ? (
            <article key={plan.name} className="plans__item plans__item--highlighted">
              {card}
            </article>
          ) : (
            <article key={plan.name} className="plans__item">
              {card}
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default Pricing
