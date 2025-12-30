
import { badRequestError } from "../Errors/BaseError.js";

//-------------------------------- Check if Object- -------------------------------------
//---------------------------------------------------------------------------------------
export function assertObject(input: unknown): Record<string, unknown> {
  if (typeof input !== 'object' || input === null) {
    throw badRequestError('Payload must be an object');
  }
  return input as Record<string, unknown>;
}

//---------------------------------- String Validator -----------------------------------
//---------------------------------------------------------------------------------------
interface StringOptions {
  minLength?: number;
  maxLength?: number;
  exactLength?: number;
  allow?: 'letters' | 'digits' | 'alphanumeric' | 'all';
}

export function requireString(
  obj: Record<string, unknown>,
  key: string,
  options: StringOptions = {}
): string {
  const value:any = obj[key];

  // 1. Type Check
  if (typeof value !== 'string') {
    badRequestError(`${key} must be a string`);
  }

  // 2. Length Checks
  if (options.minLength !== undefined && value.length < options.minLength) {
    badRequestError(`${key} must be at least ${options.minLength} characters`);
  }
  if (options.maxLength !== undefined && value.length > options.maxLength) {
    badRequestError(`${key} cannot exceed ${options.maxLength} characters`);
  }
  if (options.exactLength !== undefined && value.length !== options.exactLength) {
    badRequestError(`${key} must be exactly ${options.exactLength} characters`);
  }

  // 3. Pattern Checks
  if (options.allow === 'letters' && !/^[a-zA-Z]+$/.test(value)) {
    badRequestError(`${key} must contain only letters`);
  }
  if (options.allow === 'digits' && !/^\d+$/.test(value)) {
    badRequestError(`${key} must contain only digits`);
  }
  if (options.allow === 'alphanumeric' && !/^[a-zA-Z0-9]+$/.test(value)) {
    badRequestError(`${key} must be alphanumeric`);
  }

  return value;
}

//-------------------------------- Email Validator --------------------------------------
//---------------------------------------------------------------------------------------
export function requireEmail(
  obj: Record<string, unknown>,
  key: string
): string {
  const value = obj[key];

  if (typeof value !== 'string') {
    throw badRequestError(`${key} must be a string`);
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value)) {
    throw badRequestError(`${key} must be a valid email`);
  }

  return value.toLowerCase();
}

//------------------------------------ Int Check ----------------------------------------
//---------------------------------------------------------------------------------------
interface IntOptions {
  digitCount?: number; // e.g., 10 for mobile numbers
  min?: number;        // Value check (e.g. > 18)
  max?: number;        // Value check (e.g. < 100)
}

export function requireInteger(
  obj: Record<string, unknown>,
  key: string,
  options: IntOptions = {}
): number {
  const value:any = obj[key];

  // 1. Check if it's a number
  if (typeof value !== 'number' || Number.isNaN(value)) {
    badRequestError(`${key} must be a number`);
  }

  // 2. Check if it's an Integer (no decimals)
  if (!Number.isInteger(value)) {
    badRequestError(`${key} must be an integer`);
  }

  // 3. Digit Count Check (Convert to string to count length)
  if (options.digitCount !== undefined) {
    const digits = Math.abs(value).toString().length;
    if (digits !== options.digitCount) {
      badRequestError(`${key} must be exactly ${options.digitCount} digits`);
    }
  }

  // 4. Value Range Checks
  if (options.min !== undefined && value < options.min) {
    badRequestError(`${key} must be at least ${options.min}`);
  }
  if (options.max !== undefined && value > options.max) {
    badRequestError(`${key} must be no more than ${options.max}`);
  }

  return value;
}

//---------------------------------------------------------------------------------------