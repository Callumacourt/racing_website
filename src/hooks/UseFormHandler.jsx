import { useState } from "react";

function UseFormHandler (fieldnames) {

    const [formDetails, setFormDetails] = useState (
        Object.fromEntries(fieldnames.map(name => [name, '']))
    );

    const [formErrors, setFormErrors] = useState (
        Object.fromEntries(fieldnames.map(name => [name + 'Err', '']))
    )

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    
    function handleFormChange (field, value) {
        console.log(formDetails)
        setFormDetails (prev =>({...prev, [field]: value}));

        if (formErrors[field + 'err']) {
            setFormErrors (prev => ({...prev, [field + 'Err']: ''}))
        }

        if (hasSubmitted) {
            setHasSubmitted(false)
        }
    }

    function validateForm (requiredFields = fieldnames) {
        const errors = {}

        for (const field of requiredFields) {
            if (!formDetails[field]?.trim()) {
                errors[field + 'Err'] = '*Required field';
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

export default UseFormHandler