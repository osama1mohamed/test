import Company from '../models/companymodel.js';

export const addCompany = async (req, res) => {
  const { companyName, description, industry, address, numberOfEmployees, companyEmail } = req.body;
  try {
    const company = new Company({
      companyName,
      description,
      industry,
      address,
      numberOfEmployees,
      companyEmail,
      companyHR: req.user._id
    });
    await company.save();
    res.status(201).json({ message: 'Company added successfully!' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateCompany = async (req, res) => {
  const { companyName, description, industry, address, numberOfEmployees, companyEmail } = req.body;
  try {
    const company = await Company.findById(req.params.companyId);
    if (company.companyHR.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    if (companyName) company.companyName = companyName;
    if (description) company.description = description;
    if (industry) company.industry = industry;
    if (address) company.address = address;
    if (numberOfEmployees) company.numberOfEmployees = numberOfEmployees;
    if (companyEmail) company.companyEmail = companyEmail;
    await company.save();
    res.json({ message: 'Company updated successfully!' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteCompany = async (req, res) => {
  try {
    const company = await Company.findById(req.params.companyId);
    if (company.companyHR.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    await company.remove();
    res.json({ message: 'Company deleted successfully!' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getCompany = async (req, res) => {
  try {
    const company = await Company.findById(req.params.companyId).populate('companyHR');
    res.json(company);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const searchCompanies = async (req, res) => {
  try {
    const companies = await Company.find({ companyName: new RegExp(req.query.name, 'i') });
    res.json(companies);
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
