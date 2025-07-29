import styles from './SponsorForm.module.css'
import FormInput from '../Form/FormInput.js';
import FormEnd from '../Form/FormEnd'
import UseFormHandler from "../../hooks/UseFormHandler";
import { FormEvent } from 'react';

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
  const wait = (ms: number) : Promise<void> => 
    new Promise(resolve => setTimeout(resolve, ms));

  const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    /* Ignore bot submissions */
    const honeyPot = (e.currentTarget.elements.namedItem('companyWebsite') as HTMLInputElement)?.value;
    if (honeyPot) {
      return
    }

    if (validateForm(['companyName', 'contactName', 'contactEmail'])) {
        console.log('Form submitted')
    } else {
      return
    }

    setIsSubmitting(true)
    await(wait(1000))
    /* Reset form details */
    setHasSubmitted(true)
    setIsSubmitting(false)
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

      <FormEnd hasSubmitted = {hasSubmitted} isSubmitting = {isSubmitting}/>
    </form>
  );
}

export default SponsorForm;
