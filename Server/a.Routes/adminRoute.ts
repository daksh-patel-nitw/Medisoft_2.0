import express from 'express';
const router = express.Router();

//updating the role OR deps of the employee for the admin panel
router.post('/',updateRoleDeps);

//Employee data for Admin
router.get('/',getEmployees);

//update the roles of the employee for the admin panel
router.patch('/',updateRole);

//Delete the roles
router.delete('/admin/:id',deleteRole);
