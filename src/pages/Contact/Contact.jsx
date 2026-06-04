import { useState } from 'react'
import { submitContactForm } from '../../api/wp.js'
import styles from './Contact.module.css'

const PROJECT_TYPES = [
  'Short Film',
  'Feature Film',
  'Commercial / Branded Video',
  'Trailer',
  'Game Audio',
  'Podcast',
  'Other',
]

const BUDGET_RANGES = [
  'Under $500',
  '$500 - $1,500',
  '$1,500 - $5,000',
  '$5,000+',
  'Not sure yet',
]

export default function Contact() {
  const [formData, setFormData] = useState({
    name:        '',
    email:       '',
    projectType: '',
    budget:      '',
    message:     '',
  })
  const [status, setStatus] = useState('idle')

  function handleChange(e) {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await submitContactForm(formData)
      if (res.status === 'mail_sent') {
        setStatus('success')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.layout}>
          <div className={styles.context}>
            <p className="section-label">Get in Touch</p>
            <h1 className="section-title">Start a Project</h1>
            <p className={styles.intro}>
              Tell me about your project. I&#39;ll get back to you within 24 hours
              with availability and a rough sense of scope.
            </p>
            <div className={styles.details}>
              <div className={styles.detail}>
                <span className={`font-mono ${styles.detailLabel}`}>Location</span>
                <span>Metro Vancouver, BC</span>
              </div>
              <div className={styles.detail}>
                <span className={`font-mono ${styles.detailLabel}`}>Remote</span>
                <span>Source-Connect, Zoom, Google Meet</span>
              </div>
              <div className={styles.detail}>
                <span className={`font-mono ${styles.detailLabel}`}>Response</span>
                <span>Within 24 hours</span>
              </div>
            </div>
          </div>

          <div className={styles.formWrap}>
            {status === 'success' ? (
              <div className={`card ${styles.successMsg}`}>
                <p className={`font-mono ${styles.successLabel}`}>&#10003; Message sent</p>
                <p>Thanks &#8212; I&#39;ll be in touch within 24 hours.</p>
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit} noValidate>
                <div className={styles.row}>
                  <Field label="Your Name" name="name" type="text" value={formData.name} onChange={handleChange} required />
                  <Field label="Email Address" name="email" type="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className={styles.row}>
                  <SelectField label="Project Type" name="projectType" value={formData.projectType} onChange={handleChange} options={PROJECT_TYPES} />
                  <SelectField label="Budget Range" name="budget" value={formData.budget} onChange={handleChange} options={BUDGET_RANGES} />
                </div>
                <Field
                  label="Tell me about your project"
                  name="message"
                  type="textarea"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Genre, timeline, what you&#39;re looking for audio-wise..."
                  rows={5}
                />
                <div role="alert" aria-live="assertive" aria-atomic="true">
                  {status === 'error' && (
                    <p className={styles.errorMsg}>
                      Something went wrong. Try emailing directly instead.
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  className={`btn btn-primary ${styles.submit}`}
                  disabled={status === 'loading'}
                  aria-busy={status === 'loading'}
                >
                  {status === 'loading' ? 'Sending...' : 'Send Inquiry'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function Field({ label, name, type, value, onChange, required, placeholder, rows }) {
  return (
    <div className={styles.field}>
      <label htmlFor={name} className={styles.label}>{label}</label>
      {type === 'textarea' ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          rows={rows ?? 4}
          className={styles.input}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          className={styles.input}
        />
      )}
    </div>
  )
}

function SelectField({ label, name, value, onChange, options }) {
  return (
    <div className={styles.field}>
      <label htmlFor={name} className={styles.label}>{label}</label>
      <select id={name} name={name} value={value} onChange={onChange} className={styles.input}>
        <option value="">Select...</option>
        {options.map(opt => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  )
}
