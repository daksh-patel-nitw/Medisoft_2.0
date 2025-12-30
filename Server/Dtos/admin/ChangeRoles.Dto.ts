import {assertObject,requireString} from '../commonValidation.js';

export interface UpdateRoleDepsDTO {
  name: string;
  data: string
}

export function createUpdateRoleDepsDTO(
  input: unknown
): UpdateRoleDepsDTO {
  const body = assertObject(input);
  return {
    name: requireString(body, 'name'),
    data:requireString(body, 'data')
  };
}