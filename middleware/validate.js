import Joi from 'joi';

const validate = (schema) => (req, res, next) => {
  const options = {
    abortEarly: false, // Validate all fields before returning
    allowUnknown: true, // Allow unknown fields in request
    stripUnknown: true // Strip unknown fields from request
  };

  const { error, value } = schema.validate(req.body, options);

  if (error) {
    const errorMessage = error.details.map((detail) => detail.message).join(', ');
    return res.status(400).json({ message: errorMessage });
  }

  req.body = value;
  next();
};

export default validate;
