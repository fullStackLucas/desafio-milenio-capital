const Joi = require('joi');

module.exports = Joi.object({
  data: Joi.array().items(
    Joi.object({
      source: Joi.string().min(1).required().messages({
        'any.required': '400|{{#label}} is required',
        'string.empty': '400|{{#label}} is required',
        'string.base': '422|{{#label}} must be a string',
        'string.min': '422|{{#label}} must be at least 1 character long',
      }),
      target: Joi.string().min(1).required().messages({
        'any.required': '400|{{#label}} is required',
        'string.empty': '400|{{#label}} is required',
        'string.base': '422|{{#label}} must be a string',
        'string.min': '422|{{#label}} must be at least 1 character long',
      }),
      distance: Joi.number().required().messages({
        'any.required': '400|{{#label}} is required',
        'number.base': '422|{{#label}} must be a valid date',
      }),
    })
  )
});

