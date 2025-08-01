export function validateEmail (email:string) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email) && email.length <= 254;
}

export function validateMobile(mobile:string) {
    const re = /^(?:\+44|0)7\d{3}[ -]?\d{3}[ -]?\d{3}$/;
    return re.test(mobile);
}

export function validateRequiredFields(data: Record<string, any>, requiredFields: string[]): string | null {
    for (const field of requiredFields) {
        if (!data[field] || (typeof data[field] === 'string') && data[field].trim() === '') {
            return `Missing required field ${field}`;
        }
    }
    return null;
}

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

export function validateInputTypes(data: Record<string, any>): boolean {
    for (const [key, value] of Object.entries(data)) {
        if (value !== null && value !== undefined && typeof value !== 'string') {
            return false;
        }
    }
    return true;
}

export function validateName(name:string):boolean {
    const re = /^[a-zA-Z\s\-']{1,50}$/;
    return re.test(name);
}

export function validateStringLength(string: string, maxlength: number):boolean {
    return string.length <= maxlength;
}