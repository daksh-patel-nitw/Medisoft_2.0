import express from 'express';
import {updateRoleDeps,getEmployees,addRole,deleteRole} from '../Controllers/Admin.Controller';

const router = express.Router();

console.log('Admin routes loaded');

//updating the role OR deps of the employee for the admin panel
router.post('/',updateRoleDeps);
console.log('Admin Roy=ue after updateRolesDeps.')
//Employee data for Admin
router.get('/',getEmployees);

//update the roles of the employee for the admin panel
router.patch('/',addRole);

//Delete the roles
router.delete('/admin/:id',deleteRole);

export default router;