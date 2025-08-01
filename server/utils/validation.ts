import { validateEmail, validateRequiredFields, validateMobile, validateStringLength, validateName, sanitiseInput } from './validators';
interface ValidationResult {
  isValid: boolean;
  error?: string;
}

interface SanitisedContactData {
  fullname: string;
  email: string;
  message: string;
}

interface SanitisedSponsorData {
  companyName: string;
  contactName: string;
  contactEmail: string;
  contactNumber: string;
}

// SANITISATION FUNCTIONS
export function sanitiseContactData(body: any): SanitisedContactData {
  const { fullname, email, message } = body;
  
  return {
    fullname: sanitiseInput(fullname),
    email: sanitiseInput(email),
    message: sanitiseInput(message)
  };
}

export function sanitiseSponsorData(body: any): SanitisedSponsorData {
  const { companyName, contactName, contactEmail, contactNumber } = body;
  
  return {
    companyName: sanitiseInput(companyName),
    contactName: sanitiseInput(contactName),
    contactEmail: sanitiseInput(contactEmail),
    contactNumber: sanitiseInput(contactNumber)
  };
}

// VALIDATION FUNCTIONS
export function validateContactData(data: SanitisedContactData): ValidationResult {
  // Required fields
  const validationError = validateRequiredFields(data, ['fullname', 'email', 'message']);
  if (validationError) {
    return { isValid: false, error: `Missing required field: ${validationError}` };
  }

  // Length validation
  if (!validateStringLength(data.fullname, 50)) {
    return { isValid: false, error: 'Name too long' };
  }

  if (!validateStringLength(data.message, 1000)) {
    return { isValid: false, error: 'Message too long' };
  }

  // Format validation
  if (!validateName(data.fullname)) {
    return { isValid: false, error: 'Invalid name format' };
  }

  if (!validateEmail(data.email)) {
    return { isValid: false, error: 'Invalid email format' };
  }

  return { isValid: true };
}

export function validateSponsorData(data: SanitisedSponsorData): ValidationResult {
  // Required fields
  const validationError = validateRequiredFields(data, ['companyName', 'contactName', 'contactEmail']);
  if (validationError) {
    return { isValid: false, error: `Missing required field: ${validationError}` };
  }

  // Length validation
  if (!validateStringLength(data.companyName, 100)) {
    return { isValid: false, error: 'Company name too long' };
  }

  // Format validation
  if (!validateName(data.contactName)) {
    return { isValid: false, error: 'Invalid contact name' };
  }

  if (!validateEmail(data.contactEmail)) {
    return { isValid: false, error: 'Invalid email format' };
  }

  // Mobile validation (optional)
  if (data.contactNumber && !validateMobile(data.contactNumber)) {
    return { isValid: false, error: 'Invalid mobile number' };
  }

  return { isValid: true };
}

// INPUT TYPE VALIDATION 
export function validateInputTypes(body: any): ValidationResult {
  if (!validateInputTypes(body)) {
    return { isValid: false, error: 'Invalid input format' };
  }
  return { isValid: true };
}