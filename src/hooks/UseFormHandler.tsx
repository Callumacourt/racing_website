import { useState } from "react";

function UseFormHandler (fieldnames: string[]) {

    const [formDetails, setFormDetails] = useState<Record<string, string>> (
        Object.fromEntries(fieldnames.map(name => [name, '']))
    );

    const [formErrors, setFormErrors] = useState<Record<string, string>> (
        Object.fromEntries(fieldnames.map(name => [name + 'Err', '']))
    )

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    
    function handleFormChange (field: string, value: string) {
        setFormDetails (prev =>({...prev, [field]: value}));

        if (formErrors[field + 'Err']) {
            setFormErrors (prev => ({...prev, [field + 'Err']: ''}))
        }

        if (hasSubmitted) {
            setHasSubmitted(false)
        }
    }

    function validateForm (requiredFields = fieldnames) {
        const errors : Record<string, string> = {};

        console.log(`formfields ${requiredFields}`)
        
        for (const field of fieldnames) {
            const value = formDetails[field]?.trim();
            
            if (requiredFields.includes(field) && !value) {
                errors[field + 'Err'] = '*Required field';
            } 

            else if (value) {
                if (field.toLowerCase().includes('email')) {
                    if (!/\S+@\S+\.\S+/.test(value)) {
                        errors[field + 'Err'] = 'Please enter a valid email';
                    }
                } else if (field.toLowerCase().includes('number')) {
                    console.log('seeing number')
                    if (!/^\d{10,}$/.test(value.replace(/\D/g, ''))) {
                        errors[field + 'Err'] = 'Please enter a valid phone number'
                    }
                }
            }
        }
        setFormErrors(errors)
        return Object.keys(errors).length === 0;
    }

    function resetForm () {
        setFormDetails(Object.fromEntries(fieldnames.map(name => [name, ''])))
        setFormErrors(Object.fromEntries(fieldnames.map(name => [name + 'Err', ''])))
        setIsSubmitting(false)
    }

    return {
        formDetails,
        formErrors,
        handleFormChange,
        validateForm,
        isSubmitting,
        hasSubmitted,
        setIsSubmitting,
        setHasSubmitted,
        resetForm
    };
}

export default UseFormHandler;