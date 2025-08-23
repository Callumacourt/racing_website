import styles from './GeneralForm.module.css'

/**
 * Shared end of form component for both forms, handles success / error messaging status of submission
 * @param hasSubmitted - Boolean to indicate whether an attempt to submit has been made already
 * @param isSubmitting - Boolean to indicate whether form is in process of submitting
 * @param submitError -  Boolean to inidcate whether there was an error in submitting the form
 * @returns JSX for form end section
 */

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
              <p>Something went wrong with your request, please try again or click here to email us</p>
              <a href="mailto:callumacourtt@gmail.com?subject=sponsorEnquiry">cardiffautonomousracing@cardiff.ac.uk</a>
            </div>
          </>
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
          <button 
              className = {styles.submitBtn}
              aria-label="Form submit" 
              type="submit"
              disabled = {isSubmitting}
            >
            {isSubmitting ? <div className = {styles.spinner} aria-label="Loading.."></div> : 'Submit'}
            </button>
          <>     
            </>
        </>
    )
}

export default FormEnd;