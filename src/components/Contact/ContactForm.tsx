import FormInput from '../Form/FormInput'
import UseFormHandler from '../../hooks/UseFormHandler'
import FormEnd from  '../Form/FormEnd'
import styles from './ContactForm.module.css'
import { useState } from 'react'

function ContactForm () {

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
    } = UseFormHandler(['fullName', 'email', 'message'])

    const handleSubmit = async(e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (submitError) {
            setSubmitError(false)
        }

        const honeyPot = (e.currentTarget.elements.namedItem('mobile') as HTMLInputElement | null)?.value || '';
        if (honeyPot) {
            return
        }
        
        if (validateForm()) {
            setIsSubmitting(true)

            try {
                const res = await fetch('http://localhost:3000/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        fullname: formDetails.fullName,
                        email: formDetails.email,
                        message: formDetails.message
                    })
                })

                if (!res.ok) {
                    setSubmitError(true)
                    throw new Error(`HTTP Error! status: ${res.status}`)
                }
                setHasSubmitted(true)

            } catch(error) {
                setSubmitError(true)

            } finally {
                setIsSubmitting(false)
                resetForm()
            }
        }
    }

    return (
        <>
        <form className = {styles.contactForm} onSubmit={handleSubmit} noValidate>
            <FormInput
                name={'fullName'}
                label={'Full Name'}
                kind={'input'}
                type={'text'}
                value={formDetails.fullName}
                error = {formErrors.fullNameErr}
                onChange={handleFormChange}
                required={true}
            />

            <FormInput
                name={'email'}
                label={'Email'}
                kind={'input'}
                type={'email'}
                value={formDetails.email}
                error = {formErrors.emailErr}
                onChange={handleFormChange}
                required={true}
            />

            <input 
            type="text" 
            name="mobile"
            style={{display: 'none'}}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden = 'true'
            />

            <FormInput
                name={'message'}
                label={'Enquiry'}
                type='text'
                kind={'textarea'}
                value={formDetails.message}
                error = {formErrors.messageErr}
                onChange={handleFormChange}
                required={true}
            />

            <FormEnd submitError = {submitError} isSubmitting = {isSubmitting} hasSubmitted = {hasSubmitted}/>
        </form>
        </>
    )

}

export default ContactForm;