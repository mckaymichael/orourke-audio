import { useState } from 'react'
import { submitContactForm } from '../../api/wp.js'
import styles from './Contact.module.css'

export default function Contact() {
  const [formData, setFormData] = useState({
    name:    '',
    email:   '',
    message: '',
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
            <p className="section-label">Contact</p>
            <h1 className="section-title">Say hello.</h1>
            <p className={styles.intro}>
              Whether you want to give feedback on his work, talk about
              a project, or just connect — Ryan is easy to reach.
            </p>
            <div className={styles.details}>
              <div className={styles.detail}>
                <span className={`font-mono ${styles.detailLabel}`}>Location</span>
                <span>Metro Vancouver, BC</span>
              </div>
              <div className={styles.detail}>
                <span className={`font-mono ${styles.detailLabel}`}>Remote</span>
                <span>Zoom, Google Meet, Discord</span>
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
                <p>Thanks. Ryan will get back to you within 24 hours.</p>
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit} noValidate>
                <div className={styles.row}>
                  <Field label="Your Name" name="name" type="text" value={formData.name} onChange={handleChange} required />
                  <Field label="Email Address" name="email" type="email" value={formData.email} onChange={handleChange} required />
                </div>
                <Field
                  label="Message"
                  name="message"
                  type="textarea"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="What&#39;s on your mind?"
                  rows={6}
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
                  {status === 'loading' ? 'Sending...' : 'Send Message'}
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
