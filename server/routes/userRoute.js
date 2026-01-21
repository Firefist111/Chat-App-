import express from 'express'
import { getOtherUser, getUser, login, logout, register, updateProfile } from '../controllers/userController.js';
import { Authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/signup',register)
router.post('/login',login)
router.get('/get-profile',Authenticate,getUser)
router.get('/get-users',Authenticate,getOtherUser)
router.post('/logout',Authenticate,logout)
router.put('/update-profile',Authenticate,updateProfile)


export default router