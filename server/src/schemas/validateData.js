const Joi = require('joi');

module.exports = Joi.object({
  data: Joi.array().items(
    Joi.object({
      source: Joi.string().min(1).required().messages({
        'any.required': '400|source at {{#label}} is required',
        'string.empty': '400|source at {{#label}} is required',
        'string.base': '422|source at {{#label}} must be a string',
        'string.min': '422|source at {{#label}} must be at least 1 character long',
      }),
      target: Joi.string().min(1).required().messages({
        'any.required': '400|target at {{#label}} is required',
        'string.empty': '400|target at {{#label}} is required',
        'string.base': '422|target at {{#label}} must be a string',
        'string.min': '422|target at {{#label}} must be at least 1 character long',
      }),
      distance: Joi.number().required().messages({
        'any.required': '400|distance at {{#label}} is required',
        'number.base': '422|distance at {{#label}} must be a number',
      }),
    })
  )
});

