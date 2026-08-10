import styles from './Contact.module.css'

export default function Contact() {
  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.layout}>
          <div className={styles.context}>
            <p className="section-label">Here's an Idea</p>
            <h1 className="section-title">You Say Hi, and I'll Say it Back</h1>
            <p className={styles.intro}>
              Whether you want to give feedback on my work, talk about
              a project, or just connect, I am easy to reach.
            </p>
            <div className={styles.details}>
              <div className={styles.detail}>
                <span className={`font-mono ${styles.detailLabel}`}>Location</span>
                <span>Metro Vancouver, BC</span>
              </div>
              <div className={styles.detail}>
                <span className={`font-mono ${styles.detailLabel}`}>Email</span>
                <a href="mailto:ryanyr@protonmail.com" className={styles.detailLink}>
                  ryanyr@protonmail.com
                </a>
              </div>
              <div className={styles.detail}>
                <span className={`font-mono ${styles.detailLabel}`}>Phone</span>
                <a href="tel:+16048165695" className={styles.detailLink}>
                  (604) 816-5695
                </a>
              </div>
            </div>
          </div>

          <div className={styles.cardWrap}>
            <img
              src="/media/ryan-headshots/For-Web-9.jpg"
              alt="Ryan O'Rourke"
              className={styles.cardPhoto}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
