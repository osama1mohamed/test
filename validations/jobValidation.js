import Joi from 'joi';

// Schema for adding a new job
export const addJobSchema = Joi.object({
  jobTitle: Joi.string().required(),
  jobLocation: Joi.string().valid('onsite', 'remotely', 'hybrid').required(),
  workingTime: Joi.string().valid('part-time', 'full-time').required(),
  seniorityLevel: Joi.string().valid('Junior', 'Mid-Level', 'Senior', 'Team-Lead', 'CTO').required(),
  jobDescription: Joi.string().required(),
  technicalSkills: Joi.array().items(Joi.string()).required(),
  softSkills: Joi.array().items(Joi.string()).required()
});

// Schema for updating job data
export const updateJobSchema = Joi.object({
  jobTitle: Joi.string(),
  jobLocation: Joi.string().valid('onsite', 'remotely', 'hybrid'),
  workingTime: Joi.string().valid('part-time', 'full-time'),
  seniorityLevel: Joi.string().valid('Junior', 'Mid-Level', 'Senior', 'Team-Lead', 'CTO'),
  jobDescription: Joi.string(),
  technicalSkills: Joi.array().items(Joi.string()),
  softSkills: Joi.array().items(Joi.string())
}).or('jobTitle', 'jobLocation', 'workingTime', 'seniorityLevel', 'jobDescription', 'technicalSkills', 'softSkills');

// Schema for applying to a job
export const applyToJobSchema = Joi.object({
  jobId: Joi.string().required(),          // Job ID to apply for
  userTechSkills: Joi.array().items(Joi.string()).required(),  // Array of technical skills of the applicant
  userSoftSkills: Joi.array().items(Joi.string()).required(),  // Array of soft skills of the applicant
  userResume: Joi.string().uri().required() // URL to the applicant's resume (assuming stored on cloud)
});