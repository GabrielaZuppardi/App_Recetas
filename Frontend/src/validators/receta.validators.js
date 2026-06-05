import Joi from "joi";

export const crearRecetaSchema = Joi.object({
  titulo: Joi.string()
    .trim()
    .min(3)
    .max(100)
    .required()
    .messages({
      "string.empty": "El título no puede estar vacío",
      "string.min": "El título debe tener al menos 3 caracteres",
      "string.max": "El título no puede superar los 100 caracteres",
      "any.required": "El título es obligatorio"
    }),

  descripcion: Joi.string()
    .trim()
    .min(10)
    .max(300)
    .required()
    .messages({
      "string.empty": "La descripción no puede estar vacía",
      "string.min": "La descripción debe tener al menos 10 caracteres",
      "string.max": "La descripción no puede superar los 300 caracteres",
      "any.required": "La descripción es obligatoria"
    }),

  ingredientes: Joi.string()
    .trim()
    .min(5)
    .min(1)
    .required()
    .messages({
      "array.base": "Los ingredientes deben ser un arreglo",
      "array.min": "Debe haber al menos un ingrediente",
      "any.required": "Los ingredientes son obligatorios"
    }),

  pasos: Joi.string()
    .trim()
    .min(10)
    .max(500)
    .required()
    .messages({
      "array.base": "Los pasos deben ser un arreglo",
      "array.min": "Debe haber al menos un paso",
      "any.required": "Los pasos son obligatorios"
    }),

  tiempoPreparacion: Joi.number()
    .integer()
    .min(1)
    .required()
    .messages({
      "number.base": "El tiempo de preparación debe ser un número",
      "number.integer": "El tiempo de preparación debe ser un número entero",
      "number.min": "El tiempo de preparación debe ser mayor a 0",
      "any.required": "El tiempo de preparación es obligatorio"
    }),

  dificultad: Joi.string()
    .valid("facil", "media", "dificil")
    .required()
    .messages({
      "any.only": "La dificultad debe ser 'facil', 'media' o 'dificil'",
      "any.required": "La dificultad es obligatoria"
    }),

  porciones: Joi.number()
    .integer()
    .min(1)
    .required()
    .messages({
      "number.base": "Las porciones deben ser un número",
      "number.integer": "Las porciones deben ser un número entero",
      "number.min": "Debe haber al menos 1 porción",
      "any.required": "Las porciones son obligatorias"
    }),

 imagenUrl: Joi.string()
  .trim()
  .uri()
  .optional()
  .allow("")
  .messages({
    "string.uri": "La URL de la imagen debe ser válida"
  }),

imagen: Joi.any().optional(),
    
  categoria: Joi.string()
  .hex()
  .length(24)
  .required()
  .messages({
    "string.hex": "La categoría debe ser un ObjectId válido",
    "string.length": "La categoría debe tener 24 caracteres",
    "any.required": "La categoría es obligatoria"
  })
});

