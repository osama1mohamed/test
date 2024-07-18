import express from 'express';
const router = express.Router();
import { addCompany, updateCompany, deleteCompany, getCompany, searchCompanies, getApplicationsForJob } from '../controllers/companyController.js';
import auth from '../middleware/auth.js';
import validate from '../middleware/validate.js';
import { addCompanySchema, updateCompanySchema } from '../validations/companyValidation.js';

// Company management routes
router.post('/company', auth, validate(addCompanySchema), addCompany);
router.put('/company/:companyId', auth, validate(updateCompanySchema), updateCompany);
router.delete('/company/:companyId', auth, deleteCompany);
router.get('/company/:companyId', auth, getCompany);
router.get('/companies', auth, searchCompanies);
router.get('/company/applications/:jobId', auth, getApplicationsForJob);

export default router;
