import express from 'express';
const router = express.Router();
import { signUp, signIn, updateAccount, deleteAccount, getUserAccount, getProfileData, updatePassword, forgotPassword, getAccountsByRecoveryEmail } from '../controllers/userController.js';
import auth from '../middleware/auth.js';
import validate from '../middleware/validate.js';
import { signUpSchema, signInSchema, updateAccountSchema, updatePasswordSchema, forgetPasswordSchema } from '../validations/userValidation.js';

// User authentication and account management routes
router.post('/signup', validate(signUpSchema), signUp);
router.post('/signin', validate(signInSchema), signIn);
router.put('/account', auth, validate(updateAccountSchema), updateAccount);
router.delete('/account', auth, deleteAccount);
router.get('/account', auth, getUserAccount);
router.get('/profile/:userId', auth, getProfileData);
router.put('/password', auth, validate(updatePasswordSchema), updatePassword);
router.post('/forgot-password', validate(forgetPasswordSchema), forgotPassword);
router.get('/accounts/:recoveryEmail', auth, getAccountsByRecoveryEmail);

export default router;
