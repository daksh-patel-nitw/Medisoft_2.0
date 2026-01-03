import { employeeModel } from "../Models/employee";

export const fetchEmployees = async () => {
  return await employeeModel.find(
    {},
    {
      mid: 1,
      fname: 1,
      lname: 1,
      mobile: 1,
      dep: 1,
      role: 1
    }
  ).lean();
};

//----------------------------------- End ---------------------------------------