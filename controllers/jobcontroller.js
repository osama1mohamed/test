import Job from '../models/jobmodel.js';
import Application from '../models/appmodel.js';

export const addJob = async (req, res) => {
  const { jobTitle, jobLocation, workingTime, seniorityLevel, jobDescription, technicalSkills, softSkills } = req.body;
  try {
    const job = new Job({
      jobTitle,
      jobLocation,
      workingTime,
      seniorityLevel,
      jobDescription,
      technicalSkills,
      softSkills,
      addedBy: req.user._id
    });
    await job.save();
    res.status(201).json({ message: 'Job added successfully!' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateJob = async (req, res) => {
  const { jobTitle, jobLocation, workingTime, seniorityLevel, jobDescription, technicalSkills, softSkills } = req.body;
  try {
    const job = await Job.findById(req.params.jobId);
    if (job.addedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    if (jobTitle) job.jobTitle = jobTitle;
    if (jobLocation) job.jobLocation = jobLocation;
    if (workingTime) job.workingTime = workingTime;
    if (seniorityLevel) job.seniorityLevel = seniorityLevel;
    if (jobDescription) job.jobDescription = jobDescription;
    if (technicalSkills) job.technicalSkills = technicalSkills;
    if (softSkills) job.softSkills = softSkills;
    await job.save();
    res.json({ message: 'Job updated successfully!' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);
    if (job.addedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    await job.remove();
    res.json({ message: 'Job deleted successfully!' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId).populate('addedBy');
    res.json(job);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const searchJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ jobTitle: new RegExp(req.query.title, 'i') });
    res.json(jobs);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const applyToJob = async (req, res) => {
  const { jobId, userTechSkills, userSoftSkills, userResume } = req.body;
  try {
    const job = await Job.findById(jobId); // Make sure jobId is valid
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    const application = new Application({
      jobId,
      userId: req.user._id,
      userTechSkills,
      userSoftSkills,
      userResume
    });
    await application.save();
    res.status(201).json({ message: 'Applied to job successfully!' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getApplicationsForJob = async (req, res) => {
  try {
    const applications = await Application.find({ jobId: req.params.jobId }).populate('userId');
    res.json(applications);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
