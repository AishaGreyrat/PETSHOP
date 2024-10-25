import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { addProduct } from '../Components/productoService'; // Importa la función de servicio
import { useNavigate } from 'react-router-dom'; // Importa el hook useNavigate

/* Esquema de validación con zod */
const productSchema = z.object({
  name: z.string().min(1, { message: "Se requiere el nombre del producto" }),
  price: z
    .number({ invalid_type_error: "El precio debe ser un número válido" })
    .min(0.01, { message: "El precio debe ser superior a 0" }),
  quantity: z
    .number({ invalid_type_error: "La cantidad debe ser un número válido" })
    .min(1, { message: "La cantidad debe ser al menos 1" }),
});

type ProductFormData = z.infer<typeof productSchema>;

const ProductForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
  });

  const [imageBase64, setImageBase64] = useState<string | null>(null); // Estado para la imagen en Base64
  const navigate = useNavigate(); // Hook para redirigir

  // Convertir la imagen a Base64
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageBase64(reader.result as string); // Almacena la imagen en Base64
      };
      reader.readAsDataURL(file); // Convierte la imagen a Base64
    }
  };

  const onSubmit = async (data: ProductFormData) => {
    const productData = {
      ...data,
      image: imageBase64 ?? undefined, // Si imageBase64 es null, pasa undefined en su lugar
    };

    const response = await addProduct(productData);
    if (response.success) {
      alert(response.message);
      navigate('/'); // Redirige a la página de inicio ("/") después de añadir el producto
    } else {
      alert('Hubo un error al añadir el producto');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
      <div>
        <label>Imagen del producto: </label>
        <input type="file" onChange={handleImageChange} />
        {imageBase64 && <img src={imageBase64} alt="Vista previa" style={{ width: '100px' }} />} {/* Vista previa */}
      </div>
      <button type="submit">Añadir producto</button>
    </form>
  );
};

export default ProductForm;
