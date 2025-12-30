import { RequestHandler} from "express";
import { createUpdateRoleDepsDTO } from "../Dtos/admin/ChangeRoles.Dto.js";
import { UpdateRoleDepsServ } from "../Services/Admin.Service.js";
import { sendSuccess } from "../utils/sendResponse.js";

export const updateRoleDeps: RequestHandler = async (req, res, next) => {
  try {
    const body = createUpdateRoleDepsDTO(req.body);
    const result = await UpdateRoleDepsServ(body);
    sendSuccess(res, result, `Successfully updated the ${body.name}`);
  } catch (error) {
    next(error);
  }
};

export const getEmployees: RequestHandler = async (
  req,
  res
) => { };
export const addRole: RequestHandler = async (
  req,
  res
) => { };
export const deleteRole: RequestHandler = async (
  req,
  res
) => { };
