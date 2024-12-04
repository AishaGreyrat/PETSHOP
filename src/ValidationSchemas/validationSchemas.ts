import { z } from 'zod';

// Esquema de validación para el formulario de registro
export const registerSchema = z.object({
  email: z.string().email("El email no es válido"),  // Validación de email
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),  // Validación de password
  confirmPassword: z.string().min(6, "La confirmación de la contraseña debe tener al menos 6 caracteres")  // Confirmación de contraseña
}).refine(data => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],  // Aplica el error a la confirmación de la contraseña
});

// Inferir el tipo de datos del formulario de registro a partir del esquema Zod
export type RegisterFormData = z.infer<typeof registerSchema>;

// Esquema de validación para el formulario de login
export const loginSchema = z.object({
  email: z.string().email("El email no es válido"),  // Validación de email
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),  // Validación de contraseña
});

// Inferir el tipo de datos del formulario de login a partir del esquema Zod
export type LoginFormData = z.infer<typeof loginSchema>;

// Esquema de validación para el formulario de productos
export const AddproductSchema = z.object({
  name: z.string().min(1, { message: "Se requiere el nombre del producto" }),  // Validación del nombre del producto
  price: z
    .number({ invalid_type_error: "El precio debe ser un número válido" })
    .min(0.01, { message: "El precio debe ser superior a 0" }),  // Validación del precio
  quantity: z
    .number({ invalid_type_error: "La cantidad debe ser un número válido" })
    .min(1, { message: "La cantidad debe ser al menos 1" }),  // Validación de la cantidad
  category: z.string().min(1, { message: "Se requiere la categoría" }),  // Validación de la categoría
});

// Inferir el tipo de datos del formulario de productos a partir del esquema Zod
export type ProductFormData = z.infer<typeof AddproductSchema>;
