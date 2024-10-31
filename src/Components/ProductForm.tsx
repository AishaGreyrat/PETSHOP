import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { addProduct } from '../Components/productoService';
import { useNavigate } from 'react-router-dom';

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

  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<ProductFormData | null>(null);

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

  const onSubmit = (data: ProductFormData) => {
    setFormData(data);
    setIsModalOpen(true);
  };

  const handleConfirmSubmit = async () => {
    if (formData) {
      const productData = {
        ...formData,
        image: imageBase64 ?? undefined,
      };

      const response = await addProduct(productData);
      if (response.success) {
        alert(response.message);
        navigate('/');
      } else {
        alert('Hubo un error al añadir el producto');
      }
      setIsModalOpen(false);
    }
  };

  return (
    <div>
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
          {imageBase64 && <img src={imageBase64} alt="Vista previa" style={{ width: '100px' }} />}
        </div>
        <button type="submit">Añadir producto</button>
      </form>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setIsModalOpen(false)}>&times;</span>
            <h3>¿Estás seguro de que deseas añadir este producto?</h3>
            <div>
              <button onClick={handleConfirmSubmit}>Confirmar</button>
              <button onClick={() => setIsModalOpen(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductForm;