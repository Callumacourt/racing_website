import styles from './SponsorForm.module.css'
import FormInput from '../Form/FormInput.js';
import FormEnd from '../Form/FormEnd'
import UseFormHandler from "../../hooks/UseFormHandler";
import { useState } from 'react';
import { FormEvent } from 'react';

function SponsorForm () {

  const [submitError, setSubmitError] = useState(false);

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

  const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (submitError) {
      setSubmitError(false)
    }

    /* Ignore bot submissions */
    const honeyPot = (e.currentTarget.elements.namedItem('companyWebsite') as HTMLInputElement)?.value;
    if (honeyPot) {
      return
    }

    if (validateForm(['companyName', 'contactName', 'contactEmail'])) {
        setIsSubmitting(true)

      try {
        const res = await fetch('http://localhost:3000/api/sponsor', {
          method: 'POST',
          headers : {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            companyName: formDetails.companyName,
            contactName: formDetails.contactName,
            contactEmail: formDetails.contactEmail,
            contactNumber: formDetails.contactNumber,
          })
        })

        if (!res.ok) {
          setSubmitError(true)
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        setHasSubmitted(true)
        
      } catch (error) {
        setSubmitError(true)
      } finally {
        setIsSubmitting(false)
        resetForm()
      }
    }
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
        kind='input'
      />

      <FormInput 
        name = {'contactName'} 
        label = {'Contact Name'}
        type = {'text'} 
        value = {formDetails.contactName} 
        onChange = {handleFormChange}
        error = {formErrors.contactNameErr}
        required = {true}
        kind='input'
      />

      <FormInput 
        name = {'contactEmail'} 
        label = {'Contact Email'}
        type = {'email'} 
        value = {formDetails.contactEmail} 
        onChange = {handleFormChange}
        error = {formErrors.contactEmailErr}
        required = {true}
        kind='input'
      />

      <FormInput 
        name = {'contactNumber'} 
        label = {'Contact Number'}
        type = {'tel'} 
        value = {formDetails.contactNumber} 
        onChange = {handleFormChange}
        error = {formErrors.contactNumberErr}
        required = {false}
        kind='input'
      />

      {/* Honeypot input for bots */}
      <input 
        type="text" 
        name="companyWebsite"
        style={{display: 'none'}}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden = 'true'
      />

      <FormEnd submitError = {submitError} hasSubmitted = {hasSubmitted} isSubmitting = {isSubmitting}/>
    </form>
  );
}

export default SponsorForm;
