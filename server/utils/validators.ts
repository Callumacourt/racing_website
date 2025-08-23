/**
 * Validates email format and length.
 * @param email - Email string to validate.
 * @returns true if valid, false otherwise.
 */
export function validateEmail (email:string) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email) && email.length <= 254;
}

/**
 * Validates mobile number format (international and local).
 * @param mobile - Mobile number string to validate.
 * @returns true if valid, false otherwise.
 */
export function validateMobile(mobile:string) {
    const re = /^(?:\+?\d{1,3}[ -]?)?(?:\d[ -]?){6,14}\d$/;
    return re.test(mobile);
}

/**
 * Checks that all required fields are present and non-empty.
 * @param data - Object containing form data.
 * @param requiredFields - Array of required field names.
 * @returns Name of missing field, or null if all present.
 */
export function validateRequiredFields(data: Record<string, any>, requiredFields: string[]): string | null {
    for (const field of requiredFields) {
        if (!data[field] || (typeof data[field] === 'string') && data[field].trim() === '') {
            return `Missing required field ${field}`;
        }
    }
    return null;
}

/**
 * Sanitises input string by trimming, removing HTML, entities, JS, and limiting length.
 * @param input - Input string to sanitise.
 * @returns Sanitised string.
 */
export function sanitiseInput(input: string | null | undefined): string {
    if (!input || typeof input !== 'string') {
        return '';
    }
    
    return input
        .trim()
        .replace(/<[^>]*>/g, '') // Remove all HTML tags
        .replace(/&[^;]+;/g, '') // Remove HTML entities
        .replace(/javascript:/gi, '') // Remove javascript: URLs
        .replace(/on\w+\s*=/gi, '') // Remove event handlers
        .replace(/[\x00-\x1f\x7f-\x9f]/g, '') // Remove control characters
        .substring(0, 1000); // Limit length
}

/**
 * Validates that all values in the object are strings.
 * @param data - Object to check.
 * @returns true if all values are strings, false otherwise.
 */
export function validateInputTypes(data: Record<string, any>): boolean {
    for (const [key, value] of Object.entries(data)) {
        if (typeof value !== 'string') {
            return false;
        }
    }
    return true;
}

/**
 * Validates name format (letters, spaces, hyphens, apostrophes, max 50 chars).
 * @param name - Name string to validate.
 * @returns true if valid, false otherwise.
 */
export function validateName(name:string):boolean {
    const re = /^[a-zA-Z\s\-']{1,50}$/;
    return re.test(name);
}

/**
 * Checks if a string is within the specified maximum length.
 * @param string - String to check.
 * @param maxlength - Maximum allowed length.
 * @returns true if within limit, false otherwise.
 */
export function validateStringLength(string: string, maxlength: number):boolean {
    return string.length <= maxlength;
}