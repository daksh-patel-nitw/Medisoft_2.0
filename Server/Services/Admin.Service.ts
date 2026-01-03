import 'mongoose';
import {UpdateRoleDepsDTO} from '../Dtos/admin/ChangeRoles.Dto';
import {updateMetadataArray,fetchMetadataItem} from '../Repository/GlobalMetadata.Repo';
import {fetchEmployees} from '../Repository/Employee.Repo';
import { SignUpEmployeeDTO } from '../Dtos/global/SignUpEmployee.dto';
import { generatePassword } from '../utils/passwordUtil';

/**
 * Applies updates to the role dependencies metadata using the provided payload.
 *
 * @param body - Contains the metadata key and updated dependency values
 * @returns Updated metadata record
 */
export const UpdateRoleDepsService=async (body:UpdateRoleDepsDTO)=>{
  return await updateMetadataArray(body.name,body.data,true);
}

/**
 * Fetches employee data
 * @returns display-friendly fields, and categorizes employees by role presence.
 */
export const getEmployeesService = async () => {
  const employees = await fetchEmployees();
  const roles = await fetchMetadataItem("roles");

  const employeesWithoutRole = [];
  const employeesWithRole = [];

  for (const emp of employees) {
    const mappedEmployee = {
      eid: emp.eid,
      mobile: emp.mobile,
      dep: emp.dep,
      role: emp.role,
      name: `${emp.fname} ${emp.lname}`
    };

    if (emp.role) {
      employeesWithRole.push(mappedEmployee);
    } else {
      employeesWithoutRole.push(mappedEmployee);
    }
  }

  return {
    employeesWithoutRole,
    employeesWithRole,
    roles
  }
}


export const assignRoleToEmployee = async(body:any)=>{
  
  const password=generatePassword();
  // await SignUp(body.)
}