import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { db } from '../../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

const productSchema = z.object({
  name: z.string().min(1, { message: "Se requiere el nombre del producto" }),
  price: z.number().min(0.01, { message: "El precio debe ser superior a 0" }),
});

type ProductFormData = z.infer<typeof productSchema>;

const ProductForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
  });

  const onSubmit = async (data: ProductFormData) => {
    try {
      await addDoc(collection(db, 'products'), data);
      alert('Producto añadido correctamente!');
    } catch (error) {
      console.error('Error añadiendo el producto: ', error);
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
      <button type="submit">Añadir producto</button>
    </form>
  );
};

export default ProductForm;
