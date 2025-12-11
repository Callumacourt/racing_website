import styles from './SponsorForm.module.css';
import FormInput from '../Form/FormInput.js';
import FormEnd from '../Form/FormEnd';
import UseFormHandler from "../../hooks/UseFormHandler";
import { useState, FormEvent } from 'react';

/**
 * Sponsorship enquiry form component.
 * Uses UseFormHandler for form state and validation.
 * Submits sponsor applications to the backend API ('/api/sponsor').
 */

function SponsorForm() {
    const [submitError, setSubmitError] = useState(false);
    const apiUrl = import.meta.env.VITE_API_URL;
    
    // Handles form state, validation, and helpers
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
    } = UseFormHandler(['companyName', 'contactName', 'contactEmail', 'contactNumber']);

    /**
     * Handles form submission:
     * - Honeypot spam check
     * - Validation
     * - API call and error handling
     */
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (submitError) setSubmitError(false);

        // Honeypot field for spam prevention
        const honeyPot = (e.currentTarget.elements.namedItem('companyWebsite') as HTMLInputElement)?.value;
        if (honeyPot) return;

        if (validateForm(['companyName', 'contactName', 'contactEmail'])) {
            setIsSubmitting(true);

            try {
                const res = await fetch(`${apiUrl}/api/sponsor`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        companyName: formDetails.companyName,
                        contactName: formDetails.contactName,
                        contactEmail: formDetails.contactEmail,
                        contactNumber: formDetails.contactNumber,
                    }),
                });

                if (!res.ok) {
                    setSubmitError(true);
                    throw new Error(`HTTP error! status: ${res.status}`);
                }

                setHasSubmitted(true);
            } catch (error) {
                setSubmitError(true);
            } finally {
                setIsSubmitting(false);
                resetForm();
            }
        }
    };

    return (
        <form className={styles.sponsorForm} onSubmit={handleSubmit} noValidate>
            <div className={styles.inputWrapper}>
                <FormInput
                    name="companyName"
                    label="Company Name"
                    type="text"
                    value={formDetails.companyName}
                    onChange={handleFormChange}
                    error={formErrors.companyNameErr}
                    required={true}
                    kind="input"
                />
            </div>
            <div className={styles.inputWrapper}>
                <FormInput
                    name="contactName"
                    label="Contact Name"
                    type="text"
                    value={formDetails.contactName}
                    onChange={handleFormChange}
                    error={formErrors.contactNameErr}
                    required={true}
                    kind="input"
                />
            </div>
            <div className={styles.inputWrapper}>
                <FormInput
                    name="contactEmail"
                    label="Contact Email"
                    type="email"
                    value={formDetails.contactEmail}
                    onChange={handleFormChange}
                    error={formErrors.contactEmailErr}
                    required={true}
                    kind="input"
                />
            </div>
            <div className={styles.inputWrapper}>
                <FormInput
                    name="contactNumber"
                    label="Telephone"
                    type="tel"
                    value={formDetails.contactNumber}
                    onChange={handleFormChange}
                    error={formErrors.contactNumberErr}
                    required={false}
                    kind="input"
                />
            </div>

            {/* Honeypot field for spam prevention */}
            <input
                type="text"
                name="companyWebsite"
                style={{ display: 'none' }}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
            />

            <FormEnd submitError={submitError} hasSubmitted={hasSubmitted} isSubmitting={isSubmitting} />
        </form>
    );
}

export default SponsorForm;
