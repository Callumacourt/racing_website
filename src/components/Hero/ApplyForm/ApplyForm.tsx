import { useState } from "react";
import arrowRight from "../../../assets/images/icons/arrow-right.svg"
import styles from "./ApplyForm.module.css";

function ApplyForm() {
    const re = /^[A-Za-z0-9._%+-]+@cardiff\.ac\.uk$/i

    const [uniEmail, setUniEmail] = useState('')
    const [error, setError] = useState('')
    const [submitError, setSubmitError] = useState(false)
    const [submitState, setSubmitState] = useState('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        submitError && setSubmitError(false);
        const value = e.target.value;
        setUniEmail(value);
        if (submitState === 'attempted' || submitState === 'submitted') {
            validateInput(value);
        }
    }

    const validateInput = (uniEmail: string) => {
        if (uniEmail.trim().length <= 0) {
            setError('Please enter an email');
            return false;
        }
        if (!re.test(uniEmail)) {
            setError('Please enter a valid Cardiff University email');
            return false;
        }
        setError('');
        return true;
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitState('attempted');

        if (validateInput(uniEmail)) {
            setSubmitState('submitting');
            try {
                const res = await fetch('/api/apply', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: uniEmail })
                });
                if (!res.ok) {
                    setSubmitError(true);
                    setSubmitState('');
                    return;
                }
                setSubmitState('submitted');
            } catch (error) {
                setSubmitError(true);
                setSubmitState('');
            }
        }
    }

    return (
        <div className={styles.formContainer}>
            <form className={styles.applyForm} onSubmit={handleSubmit} noValidate>
                <div className={styles.inputContainer}>
                    <input 
                        type="email" 
                        name="uniEmail"
                        value={uniEmail}
                        onChange={handleChange}
                        placeholder="Cardiff University Email"
                        aria-label="Cardiff University Email"
                        required
                    />
                </div>
                <button aria-label="Submit button" type="submit">
                    {submitState === 'submitting' ? (
                        <div className={styles.spinner}/>
                    ) : submitState === 'submitted' ? (
                        <div>✓</div>
                    ) : (
                        <img src={arrowRight} alt="Submit" />
                    )}
                </button>
            </form>
            
            <div className={styles.errorContainer}>
                {error && <small className={styles.errorMessage}>{error}</small>}
                {submitError && 
                <small className={styles.errorMessage}>
                    Submission Error: Please try again or click here to email us{" "}
                <a href="mailto:cardiffautonomousracing@cardiff.ac.uk?subject=Team%20application&body=Hello,%20I%20would%20like%20to%20apply.">
                cardiffautonomousracing@cardiff.ac.uk
                </a>
                </small>}
            </div>
        </div>
    )
}

export default ApplyForm;