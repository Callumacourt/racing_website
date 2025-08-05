import styles from './GeneralForm.module.css'

function FormEnd ({
    hasSubmitted, 
    isSubmitting,
    submitError,
    } : {
    hasSubmitted : boolean;
    isSubmitting: boolean;
    submitError: boolean;
    }) 
    {
    return (
        <>
          <>
            <div className = {submitError ? styles.activeSubmitErr : styles.hiddenSubmitErr}>
              <p>Something went wrong with your request, please try again or email us directly at</p>
              <a href="mailto:callumacourtt@gmail.com?subject=enquiry">click here</a>
            </div>
          </>
         <button 
            className = {styles.submitBtn}
            aria-label="Form submit" 
            type="submit"
            disabled = {isSubmitting}
          >
          {isSubmitting ? <div className = {styles.spinner} aria-label="Loading.."></div> : 'Submit'}
          </button>
    
          <>     
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
        </>
    )
}

export default FormEnd;