import express from 'express';
const router = express.Router();
import { addJob, updateJob, deleteJob, getJob, searchJobs, applyToJob } from '../controllers/jobController.js';
import auth from '../middleware/auth.js';
import validate from '../middleware/validate.js';
import { addJobSchema, updateJobSchema, applyToJobSchema } from '../validations/jobValidation.js';

// Job management routes
router.post('/job', auth, validate(addJobSchema), addJob);
router.put('/job/:jobId', auth, validate(updateJobSchema), updateJob);
router.delete('/job/:jobId', auth, deleteJob);
router.get('/job/:jobId', auth, getJob);
router.get('/jobs', auth, searchJobs);
router.post('/job/apply', auth, validate(applyToJobSchema), applyToJob);

export default router;
