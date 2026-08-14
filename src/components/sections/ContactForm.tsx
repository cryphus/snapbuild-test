import { useState, type FormEvent } from 'react'
import { contactForm, type ContactFormValues } from '../../data/newSections'
import './ContactForm.css'

type Errors = Partial<Record<keyof ContactFormValues, string>>

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(values: ContactFormValues): Errors {
  const errors: Errors = {}

  if (!values.name.trim()) {
    errors.name = 'Укажите, как к вам обращаться'
  }

  if (!values.company.trim()) {
    errors.company = 'Укажите название компании'
  }

  if (!values.email.trim()) {
    errors.email = 'Укажите email для связи'
  } else if (!emailPattern.test(values.email.trim())) {
    errors.email = 'Проверьте формат email'
  }

  if (!values.message.trim()) {
    errors.message = 'Расскажите коротко о задаче'
  } else if (values.message.trim().length < 10) {
    errors.message = 'Опишите задачу чуть подробнее (от 10 символов)'
  }

  return errors
}

const initialValues: ContactFormValues = { name: '', company: '', email: '', message: '' }

function ContactForm() {
  const [values, setValues] = useState<ContactFormValues>(initialValues)
  const [errors, setErrors] = useState<Errors>({})
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (field: keyof ContactFormValues) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setValues((prev) => ({ ...prev, [field]: e.target.value }))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const validationErrors = validate(values)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length === 0) {
      setSubmitted(true)
    }
  }

  const handleReset = () => {
    setValues(initialValues)
    setErrors({})
    setSubmitted(false)
  }

  return (
    <section className="contact-form section reveal" id="contact">
      <div className="container">
        <div className="section__header section__header--center">
          <p className="section__eyebrow">{contactForm.eyebrow}</p>
          <h2>{contactForm.title}</h2>
          <p className="section__lead">{contactForm.lead}</p>
        </div>

        <div className="contact-form__wrap">
          {submitted ? (
            <div className="card contact-form__success" role="status">
              <h3>{contactForm.successTitle}</h3>
              <p>{contactForm.successText}</p>
              <button type="button" className="btn btn-outline" onClick={handleReset}>
                Отправить ещё одну заявку
              </button>
            </div>
          ) : (
            <form className="card contact-form__form" onSubmit={handleSubmit} noValidate>
              <div className="contact-form__row">
                <div className="contact-form__field">
                  <label htmlFor="cf-name">{contactForm.fields.name}</label>
                  <input
                    id="cf-name"
                    type="text"
                    value={values.name}
                    onChange={handleChange('name')}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'cf-name-error' : undefined}
                  />
                  {errors.name && (
                    <span id="cf-name-error" className="contact-form__error">
                      {errors.name}
                    </span>
                  )}
                </div>

                <div className="contact-form__field">
                  <label htmlFor="cf-company">{contactForm.fields.company}</label>
                  <input
                    id="cf-company"
                    type="text"
                    value={values.company}
                    onChange={handleChange('company')}
                    aria-invalid={!!errors.company}
                    aria-describedby={errors.company ? 'cf-company-error' : undefined}
                  />
                  {errors.company && (
                    <span id="cf-company-error" className="contact-form__error">
                      {errors.company}
                    </span>
                  )}
                </div>
              </div>

              <div className="contact-form__field">
                <label htmlFor="cf-email">{contactForm.fields.email}</label>
                <input
                  id="cf-email"
                  type="email"
                  value={values.email}
                  onChange={handleChange('email')}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'cf-email-error' : undefined}
                />
                {errors.email && (
                  <span id="cf-email-error" className="contact-form__error">
                    {errors.email}
                  </span>
                )}
              </div>

              <div className="contact-form__field">
                <label htmlFor="cf-message">{contactForm.fields.message}</label>
                <textarea
                  id="cf-message"
                  rows={4}
                  value={values.message}
                  onChange={handleChange('message')}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'cf-message-error' : undefined}
                />
                {errors.message && (
                  <span id="cf-message-error" className="contact-form__error">
                    {errors.message}
                  </span>
                )}
              </div>

              <button type="submit" className="btn btn-primary contact-form__submit">
                {contactForm.submitLabel}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

export default ContactForm
