import { useState } from "react";
import styles from './SponsorForm.module.css'
import FormInput from '../Form/FormInput';
import UseFormHandler from "../../hooks/UseFormHandler";

function SponsorForm () {

  const {
    formDetails,
      formErrors,
      handleFormChange,
      validateForm,
      isSubmitting,
      hasSubmitted,
      setIsSubmitting,
      setHasSubmitted,
      resetForm
  } = UseFormHandler(['companyName', 'contactName', 'contactEmail', 'contactNumber'])


  /* For mocking backend email send wait time - will remove when writing backend*/
  const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));


/*const validateForm = () => {
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
        */

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
    /* Reset form details */
    setHasSubmitted(true)
    resetForm()
  };

  return (
    <form className = {styles.sponsorForm} onSubmit={handleSubmit} noValidate>

      <FormInput 
        name = {'companyName'} 
        label = {'Company Name'}
        type = {'text'} 
        value = {formDetails.companyName} 
        onChange = {handleFormChange}
        error = {formErrors.companyNameErr}
        required = {true}
        styles = {styles}
      />

      <FormInput 
        name = {'contactName'} 
        label = {'Contact Name'}
        type = {'text'} 
        value = {formDetails.contactName} 
        onChange = {handleFormChange}
        error = {formErrors.contactNameErr}
        required = {true}
        styles = {styles}
      />

      <FormInput 
        name = {'contactEmail'} 
        label = {'Contact Email'}
        type = {'email'} 
        value = {formDetails.contactEmail} 
        onChange = {handleFormChange}
        error = {formErrors.contactEmailErr}
        required = {true}
        styles = {styles}
      />

      <FormInput 
        name = {'contactNumber'} 
        label = {'Contact Number'}
        type = {'tel'} 
        value = {formDetails.contactNumber} 
        onChange = {handleFormChange}
        error = {formErrors.contactNumErr}
        required = {false}
        styles = {styles}
      />

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
