import { useState } from "react";

/**
 * Hook for scrolling to top of the page when navigating to a new route
 */

function UseFormHandler (fieldnames: string[]) {

    // Initialise form details based on fieldnames, with empty values
    const [formDetails, setFormDetails] = useState<Record<string, string>> (
        Object.fromEntries(fieldnames.map(name => [name, '']))
    );

    // Do the same for errors
    const [formErrors, setFormErrors] = useState<Record<string, string>> (
        Object.fromEntries(fieldnames.map(name => [name + 'Err', '']))
    )

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    
    function handleFormChange (field: string, value: string) {
        // Update stored value for modified field on input
        setFormDetails (prev =>({...prev, [field]: value}));

        // Reset current field error on input
        if (formErrors[field + 'Err']) {
            setFormErrors (prev => ({...prev, [field + 'Err']: ''}))
        }
        
        // Reset submitted state
        if (hasSubmitted) {
            setHasSubmitted(false)
        }
    }

    // Validation for shared attributes across both forms (number and email)
    function validateForm (requiredFields = fieldnames) {
        // Collect all errors 
        const errors : Record<string, string> = {};
        
        for (const field of fieldnames) {
            const value = formDetails[field]?.trim();
            
            // Handle an empty required field
            if (requiredFields.includes(field) && !value) {
                errors[field + 'Err'] = '*Required field';
            } 

            else if (value) {
                // Error for invalid emails inputs
                if (field.toLowerCase().includes('email')) {
                    if (!/\S+@\S+\.\S+/.test(value)) {
                        errors[field + 'Err'] = 'Please enter a valid email';
                    }
                // Error for invalid phone numbers
                } else if (field.toLowerCase().includes('number')) {
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