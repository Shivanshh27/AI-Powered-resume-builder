import express from "express";
import { registerUser, loginUser, getUserbyId, getUserResumes } from "../controllers/userController.js";
import protect from "../moddlewares/authMiddleware.js";

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/data', protect, getUserbyId);
userRouter.get('/resumes', protect, getUserResumes);
export default userRouter;