import Joi from 'joi'

export const registroSchema = Joi.object({
  nombre: Joi.string().trim().min(2).max(100).required().messages({
    'string.empty': 'El nombre es obligatorio',
    'string.min': 'El nombre debe tener al menos {#limit} caracteres',
    'string.max': 'El nombre no puede superar los {#limit} caracteres',
    'any.required': 'El nombre es obligatorio'
  }),

  email: Joi.string()
    .trim()
    .lowercase()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.empty': 'El email es obligatorio',
      'string.email': 'Ingresá un email válido',
      'any.required': 'El email es obligatorio'
    }),

  password: Joi.string().min(6).max(100).required().messages({
    'string.empty': 'La contraseña es obligatoria',
    'string.min': 'La contraseña debe tener al menos {#limit} caracteres',
    'string.max': 'La contraseña no puede superar los {#limit} caracteres',
    'any.required': 'La contraseña es obligatoria'
  })
})

export const loginSchema = Joi.object({
  email: Joi.string()
    .trim()
    .lowercase()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.empty': 'El email es obligatorio',
      'string.email': 'Ingresá un email válido',
      'any.required': 'El email es obligatorio'
    }),

  password: Joi.string().required().messages({
    'string.empty': 'La contraseña es obligatoria',
    'any.required': 'La contraseña es obligatoria'
  })
})
