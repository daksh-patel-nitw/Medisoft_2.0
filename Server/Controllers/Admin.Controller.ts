import { RequestHandler } from "express";
import { createUpdateRoleDepsDTO } from "../Dtos/admin/ChangeRoles.Dto";
import { UpdateRoleDepsService, assignRoleToEmployee, getEmployeesService, deleteRoleOfEmployeeService } from "../Services/Admin.Service";
import { sendSuccess } from "../utils/sendResponse";
import { createSignUpEmployeeDTO } from "../Dtos/global/SignUpEmployee.dto";
import { AppError, badRequestError } from "../Errors/BaseError";

export const updateRoleDeps: RequestHandler = async (req, res, next) => {
  try {
    const body = createUpdateRoleDepsDTO(req.body);
    const result = await UpdateRoleDepsService(body);
    sendSuccess(res, result, `Successfully updated the ${body.name}`);
  } catch (error) {
    console.log("catching in controller:", error);
    next(error);
  }
};

/**
 * Controller for sending employee details along with roles
 */
export const getEmployees: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const result = await getEmployeesService();
    sendSuccess(res, result);
  } catch (error) {
    next(error);
  }
};

/**
 * Controller for assigning a role to an employee.
 */
export const addRole: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const body = createSignUpEmployeeDTO(req.body,'eid');
    await assignRoleToEmployee(body);
    sendSuccess(res, null, `Successfully assigned the role ${body.role} to ${body.name}`)
  } catch (error) {
    if (error instanceof AppError) {
      error.message = "Invalid Role"
    }
    next(error);
  }
};

/**
 * Controller for deleting a role of an employee.
 */
export const deleteRole: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const id = req.params.id;
    if (!id) {
      throw badRequestError('Employee id is required', true);
    }
    const { role, name } = await deleteRoleOfEmployeeService(id);
    sendSuccess(res, null, `Successfully deleted the ${role} role of ${name}`)
  } catch (error) {
    next(error)
  }

};
