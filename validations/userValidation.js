import Joi from 'joi';

// Schema for user sign up
export const signUpSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  userName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(8),
  recoveryEmail: Joi.string().email(),
  DOB: Joi.date().required(),
  mobileNumber: Joi.string().required().min(11).max(11),
  role: Joi.string().valid('User', 'Company_HR').required()
});

export const signInSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

// Schema for user update account
export const updateAccountSchema = Joi.object({
  firstName: Joi.string(),
  lastName: Joi.string(),
  userName: Joi.string().required(),
  email: Joi.string().email(),
  recoveryEmail: Joi.string().email(),
  mobileNumber: Joi.string(),
  DOB: Joi.date().iso(),
}).or('firstName', 'lastName', 'userName','email', 'recoveryEmail', 'mobileNumber', 'DOB');

// Schema for updating user password
export const updatePasswordSchema = Joi.object({
  currentPassword: Joi.string().required(),
  newPassword: Joi.string().required().min(8)
});

// Schema for forgetting password
export const forgetPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
  newPassword: Joi.string().required().min(8)
});

// Schema for searching users by recovery email
export const searchByRecoveryEmailSchema = Joi.object({
  recoveryEmail: Joi.string().email().required()
});
