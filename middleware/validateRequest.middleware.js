const Joi = require('joi'); 
const err = require("../errors/index");
const { errorHandler } = require('../utils/responseHandler');

const validateRequest = (schema, property) => { 
  return (req, res, next) => { 
    const options = {
      abortEarly: true, // include all errors
      allowUnknown: true, // ignore unknown props
      stripUnknown: false // remove unknown props
  };
    const { error } = schema.validate(req[property], options);
    const valid = error == null; 
    if (valid) { next(); } 
    else { 
      const { details } = error; 
      const message = details.map(i => i.message).join(',')
     return errorHandler(res, err.INVALID_PARAMETER, message)
    } 
  } 
} 
module.exports = validateRequest;