import express from 'express';
import {updateRoleDeps,getEmployees,addRole,deleteRole} from '../Controllers/Admin.Controller';
import { requireAuth } from '../Middlewares/requireAuth';
import { authorize } from '../Middlewares/authorize';

const router = express.Router();
// router.use(requireAuth);
// router.use(authorize('admin'));

//Update the Roles and Departments
router.post('/',updateRoleDeps);

//Employee data for Admin
router.get('/',getEmployees);

//Add new roles for the employee for the admin panel
router.patch('/',addRole);

//Delete the roles for the employee
router.delete('/employee/:id',deleteRole);

export default router;