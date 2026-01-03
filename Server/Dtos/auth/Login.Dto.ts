import { assertObject, requireEmail, requireName, requirePassword } from '../commonValidation';

type BaseLogin = {
    password: string;
};

export type LoginDTO =
    | (BaseLogin & { id: string; email?: never; })
    | (BaseLogin & { email: string; id?: never; });

/**
 * Creates and validates a login request body from unknown input.
 *
 * Ensures the input is a valid object, validates credentials,
 * and determines whether login is performed using email or id.
 *
 * @param input - Raw input to be validated and transformed
 * @returns A validated LoginBodyDTO
 */
export function createLoginBodyDTO(
    input: unknown
): LoginDTO {
    const body = assertObject(input);
    const password = requirePassword(body, 'password')
    const email = requireEmail(body, 'uname', true);

    if (email === '') {
        return {
            id: requireName(body, 'uname'),
            password
        }
    } else {
        return {
            email,
            password
        }
    }
}
