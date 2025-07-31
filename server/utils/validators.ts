export function validateEmail (email:string) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

export function validateMobile(mobile:string) {
    const re = /^\+?[1-9]\d{1,3}[ -]?\d{4,14}(?:[ -]?\d{2,4})?$/;
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