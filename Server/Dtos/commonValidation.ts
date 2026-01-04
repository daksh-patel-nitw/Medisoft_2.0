
import { badRequestError, unauthorizedError } from "../Errors/BaseError";

/**
 * Asserts that the provided input is a non-null object.
 *
 * @param input - Value to validate
 * @returns The validated object
 * @throws Error if the input is not an object
 */
export function assertObject(input: unknown): Record<string, unknown> {
  if (typeof input !== 'object' || input === null) {
    throw badRequestError('Payload must be an object');
  }
  return input as Record<string, unknown>;
}

interface StringOptions {
  minLength?: number;
  maxLength?: number;
  exactLength?: number;
  allow?: 'letters' | 'digits' | 'alphanumeric' | 'all';
}

/**
 * Validates that the specified field is a string and
 * satisfies the provided length and character constraints.
 *
 * @param obj - Input object containing the field
 * @param key - Field name to validate
 * @param options - String validation rules (length and allowed characters)
 * @param flag - Indicates whether the validation error should be UI-visible
 * @returns Validated string value
 */
export function requireString(
  obj: Record<string, unknown>,
  key: string,
  options: StringOptions = {},
  flag?: boolean,
): string {
  const value: any = obj[key];

  // 1. Type Check
  if (typeof value !== 'string') {
    throw badRequestError(`${key} must be a string`);
  }

  // 2. Length Checks
  if (options.minLength !== undefined && value.length < options.minLength) {
    throw badRequestError(`${key} must be at least ${options.minLength} characters`);
  }
  if (options.maxLength !== undefined && value.length > options.maxLength) {
    throw badRequestError(`${key} cannot exceed ${options.maxLength} characters`);
  }
  if (options.exactLength !== undefined && value.length !== options.exactLength) {
    throw badRequestError(`${key} must be exactly ${options.exactLength} characters`);
  }

  // 3. Pattern Checks
  if (options.allow === 'letters' && !/^[a-zA-Z]+$/.test(value)) {
    throw badRequestError(`${key} must contain only letters`);
  }
  if (options.allow === 'digits' && !/^\d+$/.test(value)) {
    throw badRequestError(`${key} must contain only digits`);
  }
  if (options.allow === 'alphanumeric' && !/^[a-zA-Z0-9]+$/.test(value)) {
    throw badRequestError(`${key} must be alphanumeric`);
  }

  return value;
}

/**
 * Validates Name
 * @param obj - Input object containing the field
 * @param key - Field name to validate
 */
export function requireName(
  obj: Record<string, unknown>,
  key: string
) {
  return requireString(obj, key, { minLength: 2, maxLength: 18, allow: 'letters' })
}

/**
 * Validates Mobile
 * @param obj - Input object containing the field
 * @param key - Field name to validate
 */
export function requireMobile(
  obj: Record<string, unknown>,
  key: string
) {
  return requireString(obj, key, { exactLength: 10, allow: 'digits' })
}

/**
 * Validates that the specified field contains a valid email address.
 *
 * @param obj - Input object containing the email field
 * @param key - Field name to validate
 * @returns Validated email value
 */
export function requireEmail(
  obj: Record<string, unknown>,
  key: string,
  dontThrowErrorflag: boolean = false
): string {
  const value = obj[key];
  const message = "Invalid Email";

  if (typeof value !== 'string') {
    throw badRequestError(message);
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value)) {
    if (dontThrowErrorflag)
      return ""
    throw badRequestError(message);
  }

  return value.toLowerCase();
}

/**
 * Validates that the specified field contains a password
 * matching the required security rules.
 *
 * @param obj - Input object containing the password field
 * @param key - Field name to validate
 * @returns Validated password value
 */
export function requirePassword(
  obj: Record<string, unknown>,
  key: string
): string {
  const value = obj[key];
  const message = "Invalid Password or Username";

  if (typeof value !== 'string') {
    throw badRequestError(message);
  }

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$*])[A-Za-z\d@#$*]{8,16}$/;
  if (!passwordRegex.test(value)) {
    throw unauthorizedError(message);
  }

  return value;
}

/**
 * 
 * @param obj - Input object containing the password field
 * @param key - Field name to validate
 * @returns Validated Boolean value
 */
export function requireBool(
  obj: Record<string, unknown>,
  key: string
): boolean {
  const value = obj[key];
  if (typeof value !== 'boolean') {
    throw badRequestError(`Invalid value in ${key}`);
  }
  return value;
}
