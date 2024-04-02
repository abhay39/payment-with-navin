import express from 'express';
import { getCurrentUserDetails, login, signup, totalUsers } from '../controllers/authController.js';

const router=express.Router();


router.get("/",totalUsers)
router.get("/getCurrentUserDetails/:token",getCurrentUserDetails)
router.post("/signup",signup)
router.post("/login",login)

export default router;