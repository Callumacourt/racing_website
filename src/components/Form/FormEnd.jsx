import styles from './GeneralForm.module.css'

function FormEnd ({hasSubmitted, isSubmitting}) {
    return (
        <>
          <button 
                className = {styles.submitBtn}
                aria-label="Form submit" 
                type="submit"
                disabled = {isSubmitting}
              >{isSubmitting ? <div className = {styles.spinner} aria-label="Loading.."></div> : 'Submit'}</button>
              
              {hasSubmitted && (
                <div className={styles.successMessage}>
                  <svg 
                    className={styles.checkIcon}
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="white" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <polyline 
                      className={styles.checkPath}
                      points="20 6 9 17 4 12"
                    />
                  </svg>
                  <span className = {styles.thankYouText}>Thank you! We'll be in touch soon.</span>
                </div>
              )}
        </>
    )
}

export default FormEnd;