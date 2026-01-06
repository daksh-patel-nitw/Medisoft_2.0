import { assertObject, requireString } from '../commonValidation';

export interface UpdateRoleDepsDTO {
  name: string;
  data: string;
}

/**
 * Ensures the input is a valid object and extracts the required fields
 * with proper validation.
 * @param input - Raw input to be validated and transformed
 * @returns A validated UpdateRoleDepsDTO
 */
export function createUpdateRoleDepsDTO(
  input: unknown
): UpdateRoleDepsDTO {
  const body = assertObject(input);
  return {
    name: requireString(body, 'name'),
    data: requireString(body, 'data')
  };
}