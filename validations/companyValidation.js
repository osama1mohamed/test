import Joi from 'joi';

// Schema for adding a new company
export const addCompanySchema = Joi.object({
  companyName: Joi.string().required(),
  description: Joi.string().required(),
  industry: Joi.string().required(),
  address: Joi.string().required(),
  numberOfEmployees: Joi.string().required(),
  companyEmail: Joi.string().email().required()
});

// Schema for updating company data
export const updateCompanySchema = Joi.object({
  companyName: Joi.string(),
  description: Joi.string(),
  industry: Joi.string(),
  address: Joi.string(),
  numberOfEmployees: Joi.string(),
  companyEmail: Joi.string().email()
}).or('companyName', 'description', 'industry', 'address', 'numberOfEmployees', 'companyEmail');
