import { useState } from 'react'
import { pricing, type BillingPeriod } from '../../data/newSections'
import { useReveal } from '../../hooks/useReveal'
import './Pricing.css'

const formatPrice = (value: number) => new Intl.NumberFormat('ru-RU').format(value)

function Pricing() {
  const ref = useReveal<HTMLElement>()

  const [period, setPeriod] = useState<BillingPeriod>('monthly')

  return (
    <section className="pricing section reveal" ref={ref} id="pricing">
      <div className="container">
        <div className="section__header section__header--center">
          <p className="section__eyebrow">{pricing.eyebrow}</p>
          <h2>{pricing.title}</h2>
          <p className="section__lead">{pricing.lead}</p>
        </div>

        <div className="pricing__toggle" role="group" aria-label="Период оплаты">
          <button
            type="button"
            className={`pricing__toggle-btn${period === 'monthly' ? ' is-active' : ''}`}
            aria-pressed={period === 'monthly'}
            onClick={() => setPeriod('monthly')}
          >
            Ежемесячно
          </button>
          <button
            type="button"
            className={`pricing__toggle-btn${period === 'yearly' ? ' is-active' : ''}`}
            aria-pressed={period === 'yearly'}
            onClick={() => setPeriod('yearly')}
          >
            Ежегодно
            <span className="pricing__discount">{pricing.discountLabel}</span>
          </button>
        </div>

        <div className="pricing__grid">
          {pricing.plans.map((plan) => {
            const price = period === 'monthly' ? plan.priceMonthly : plan.priceYearly
            return (
              <article
                key={plan.name}
                className={`card pricing__card${plan.highlighted ? ' pricing__card--highlighted' : ''}`}
              >
                {plan.highlighted && <span className="pricing__badge">Популярный</span>}
                <h3>{plan.name}</h3>
                <p className="pricing__desc">{plan.description}</p>

                <div className="pricing__price">
                  {price !== null ? (
                    <>
                      <span className="pricing__amount">{price === 0 ? '0' : formatPrice(price)}</span>
                      <span className="pricing__note">{plan.priceNote}</span>
                    </>
                  ) : (
                    <span className="pricing__amount pricing__amount--text">{plan.priceNote}</span>
                  )}
                </div>

                <ul className="pricing__features">
                  {plan.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>

                <button
                  type="button"
                  className={`btn ${plan.highlighted ? 'btn-primary' : 'btn-outline'} pricing__cta`}
                >
                  {plan.cta}
                </button>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Pricing
