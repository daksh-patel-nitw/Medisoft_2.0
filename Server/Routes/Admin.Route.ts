import express from 'express';
import {updateRoleDeps,getEmployees,addRole,deleteRole} from '../Controllers/Admin.Controller.js';

const router = express.Router();

//updating the role OR deps of the employee for the admin panel
router.post('/',updateRoleDeps);

//Employee data for Admin
router.get('/',getEmployees);

//update the roles of the employee for the admin panel
router.patch('/',addRole);

//Delete the roles
router.delete('/admin/:id',deleteRole);

export default router;