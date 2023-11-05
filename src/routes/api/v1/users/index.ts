import express from 'express';
import { UserController } from '../../../../controllers/usersController';
import validations from '../../../../utils/validation';

const router = express.Router();

router.get('/get-user', UserController.getUser);
router.get('/get-users', UserController.getUsers);
router.post('/user', validations.validateUser, UserController.createUser);

export default router;
