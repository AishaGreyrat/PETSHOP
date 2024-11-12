import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Actualizamos el esquema de validación para incluir la categoría
const productSchema = z.object({
  name: z.string().min(1, { message: "Se requiere el nombre del producto" }),
  price: z
    .number({ invalid_type_error: "El precio debe ser un número válido" })
    .min(0.01, { message: "El precio debe ser superior a 0" }),
  quantity: z
    .number({ invalid_type_error: "La cantidad debe ser un número válido" })
    .min(1, { message: "La cantidad debe ser al menos 1" }),
  category: z.string().min(1, { message: "Se requiere la categoría" }), // Nueva propiedad de categoría
});

type ProductFormData = z.infer<typeof productSchema>;

const ProductForm: React.FC<{ closeModal: () => void }> = ({ closeModal }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
  });

  const [imageBase64, setImageBase64] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageBase64(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (_data: ProductFormData) => {
    // Aquí iría la lógica para enviar el producto a la base de datos
    alert('Producto añadido con éxito');
    closeModal(); // Cerrar el modal después de añadir el producto
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Botón para cerrar el modal */}
        <button className="close-btn" onClick={closeModal}>&times;</button>
        <div>
          <label>Nombre del producto: </label>
          <input type="text" {...register('name')} />
          {errors.name && <span>{errors.name.message}</span>}
        </div>
        <div>
          <label>Precio: </label>
          <input type="number" step="0.01" {...register('price', { valueAsNumber: true })} />
          {errors.price && <span>{errors.price.message}</span>}
        </div>
        <div>
          <label>Cantidad: </label>
          <input type="number" {...register('quantity', { valueAsNumber: true })} />
          {errors.quantity && <span>{errors.quantity.message}</span>}
        </div>

        {/* Campo para seleccionar la categoría */}
        <div>
          <label>Categoría: </label>
          <select {...register('category')}>
            <option value="">Selecciona una categoría</option>
            <option value="Alimentación">Alimentación</option>
            <option value="Salud e Higiene">Salud e Higiene</option>
            <option value="Juguetes">Juguetes</option>
            <option value="Camas y Descanso">Camas y Descanso</option>
            <option value="Ropa y Accesorios">Ropa y Accesorios</option>
            <option value="Transporte">Transporte</option>
            <option value="Entrenamiento">Entrenamiento</option>
            <option value="Seguridad">Seguridad</option>
            <option value="Cuidado dental">Cuidado dental</option>
            <option value="Limpieza y Desinfección">Limpieza y Desinfección</option>
          </select>
          {errors.category && <span>{errors.category.message}</span>}
        </div>

        {/* Campo para cargar la imagen */}
        <div>
          <label>Imagen del producto: </label>
          <input type="file" onChange={handleImageChange} />
          {imageBase64 && <img src={imageBase64} alt="Vista previa" style={{ width: '100px' }} />}
        </div>

        <button type="submit">Añadir producto</button>
      </form>
    </div>
  );
};

export default ProductForm;