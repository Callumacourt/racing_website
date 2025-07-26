import { useState } from "react";
import styles from './SponsorForm.module.css'

function SponsorForm () {

  const [formDetails, setFormDetails] = useState({
    companyName: '',
    contactName: '',
    contactEmail: '',
    contactNumber: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState(false)
  
  /* For mocking backend email send wait time - will remove when writing backend*/
  const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const [formErrors, setFormErrors] = useState({
    companyNameErr: '',
    contactNameErr: '',
    contactEmailErr: '',
    contactNumErr: '',
  })

  const handleFormChange = (param, value) => {
    setFormDetails(prev => ({
      ...prev,
      [param]: value,
    }));

    if (hasSubmitted && formErrors[param + 'Err']) {
        setFormErrors(prev => ({
            ...prev,
            [param + 'Err']: ''
        }));
    } 
    if (hasSubmitted) {
      setHasSubmitted(false)
    }
  };

  const validateForm = () => {
        const errors = {};

        if (!formDetails.companyName.trim()) {
            errors.companyNameErr = '*Your company name is required';
        }

        if (!formDetails.contactName.trim()) {
            errors.contactNameErr = '*A contact name is required'
        }

        if (!formDetails.contactEmail.trim()) {
            errors.contactEmailErr = '*A contact email is required'
        } else if (!/\S+@\S+\.\S+/.test(formDetails.contactEmail)) {
            errors.contactEmailErr = 'Please enter a valid email';
        }
            
        if (formDetails.contactNumber && !/^\d{10,}$/.test(formDetails.contactNumber.replace(/\D/g, ''))) {
            errors.contactNumErr = '*Please enter a valid phone number';
        }
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
   }

  const handleSubmit = async(e) => {
    e.preventDefault();

    /* Ignore bot submissions */
    const honeyPot = e.target.companyWebsite.value;
    if (honeyPot) {
      return
    }

    if (validateForm()) {
        console.log('Form submitted')
    } else {
      return
    }

    setIsSubmitting(true)
    await(wait(1000))
    setHasSubmitted(true);
    setIsSubmitting(false)

    /* Reset form details */
    setFormDetails ({
      companyName: '',
      contactName: '',
      contactEmail: '',
      contactNumber: '',
    })
  };

  return (
    <form className = {styles.sponsorForm} onSubmit={handleSubmit} noValidate>
      <label htmlFor="companyName">Company Name</label>
      <input 
        id="companyName"
        name="companyName"
        type="text"
        value={formDetails.companyName}
        onChange={(e) => handleFormChange('companyName', e.target.value)}
        className={formErrors.companyNameErr ? styles.inputError : ''}
        required
      />
      <small className={formErrors.companyNameErr ? styles.activeErr : styles.hiddenErr}>
        <i>{formErrors.companyNameErr}</i>
      </small>

      <label htmlFor="contactName">Contact Name</label>
      <input
        id="contactName"
        name="contactName"
        type="text"
        value={formDetails.contactName}
        onChange={(e) => handleFormChange('contactName', e.target.value)}
        className={formErrors.contactNameErr ? styles.inputError : ''}
        required
      />
      <small className={formErrors.contactNameErr ? styles.activeErr: styles.hiddenErr}>
        <i>{formErrors.contactNameErr}</i>
      </small>

      <label htmlFor="contactEmail">Contact Email</label>
      <input
        id="contactEmail"
        name="contactEmail"
        type="email"
        value={formDetails.contactEmail}
        onChange={(e) => handleFormChange('contactEmail', e.target.value)}
        className={formErrors.contactEmailErr ? styles.inputError : ''}
        required
      />
      <small className={formErrors.contactEmailErr ? styles.activeErr : styles.hiddenErr}>
        <i>{formErrors.contactEmailErr}</i>
      </small>

      <label htmlFor="contactNumber">Contact Number</label>
      <input
        id="contactNumber"
        name="contactNumber"
        type="tel"
        value={formDetails.contactNumber}
        onChange={(e) => handleFormChange('contactNumber', e.target.value)}
        className={formErrors.contactNumErr ? styles.inputError : ''}
      />
      <small className={formErrors.contactNumErr ? styles.activeErr : styles.hiddenErr}>
        <i>{formErrors.contactNumErr}</i>
      </small>

      {/* Honeypot input for bots */}
      <input 
        type="text" 
        name="companyWebsite"
        style={{display: 'none'}}
        tabIndex="-1"
        autoComplete="off"
      />

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
    </form>
  );
}

export default SponsorForm;
