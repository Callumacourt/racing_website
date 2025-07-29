import FormInput from '../Form/FormInput'
import UseFormHandler from '../../hooks/UseFormHandler'
import FormEnd from  '../Form/FormEnd'
import styles from './ContactForm.module.css'

function ContactForm () {

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

    const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    const handleSubmit = async(e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const honeyPot = (e.currentTarget.elements.namedItem('mobile') as HTMLInputElement | null)?.value || '';
        if (honeyPot) {
            return
        }
        
        if (validateForm()) {
            setIsSubmitting(true)
            await(wait(1000))
            setHasSubmitted(true)
            setIsSubmitting(false)
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

            <FormEnd isSubmitting = {isSubmitting} hasSubmitted = {hasSubmitted}/>
        </form>
        </>
    )
}

export default ContactForm;