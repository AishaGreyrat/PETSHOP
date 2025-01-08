import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'; 
import { useNavigate } from 'react-router-dom';
import { addProduct } from '@/Services/productoService'; 
import { AddProductFormProps } from '@/Types/types';
import { AddproductSchema, ProductFormData } from '@/ValidationSchemas/validationSchemas';  
import { useAdminCheck } from '../../../Roles/useAdminCheck'; // Hook para verificar si el usuario es administrador

import '../../AppBar/Appbar.module.css';

const AddProductForm: React.FC<AddProductFormProps> = ({ closeModal }) => {
  const { isAdmin, loading } = useAdminCheck(); // Hook para verificar si el usuario es admin
  const navigate = useNavigate();
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [formData, setFormData] = useState<ProductFormData | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<ProductFormData>({
    resolver: zodResolver(AddproductSchema),
  });

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
    setIsRegisterModalOpen(true);
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
        navigate("/");  
      } else {
        alert("Hubo un error al añadir el producto");
      }

      setIsRegisterModalOpen(false);
      if (closeModal) closeModal();
    }
  };

  function closeRegisterModal(event: React.MouseEvent<HTMLButtonElement>) {
    event.stopPropagation(); 
    setIsRegisterModalOpen(false); 
  }

  // Verificamos si el usuario es admin y está cargando la verificación
  if (loading) {
    return <p>Cargando...</p>;
  }

  if (!isAdmin) {
    return <p>No tienes permisos para agregar productos.</p>;
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="add-product-form">
        <div>
          <h2>Agregar Producto</h2>
          <label htmlFor="name">Nombre del producto: </label>
          <input type="text" {...register("name")} />
          {errors.name && <span>{errors.name.message}</span>}
        </div>

        <div>
          <label htmlFor="price">Precio: </label>
          <input
            type="number"
            step="0.01"
            {...register("price", { valueAsNumber: true })}
          />
          {errors.price && <span>{errors.price.message}</span>}
        </div>

        <div>
          <label htmlFor="quantity">Cantidad: </label>
          <input
            type="number"
            {...register("quantity", { valueAsNumber: true })}
          />
          {errors.quantity && <span>{errors.quantity.message}</span>}
        </div>

        <div>
          <label htmlFor="category">Categoría: </label>
          <select {...register("category")}>
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

        <div>
          <label htmlFor="image">Imagen del producto: </label>
          <input type="file" onChange={handleImageChange} />
          {imageBase64 && (
            <img
              src={imageBase64}
              alt="Vista previa"
              className="ImagePrev"
            />
          )}
        </div>

        <button className="añadir" type="submit">
          Añadir producto
        </button>
      </form>

      {isRegisterModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-button" onClick={closeRegisterModal}>
              &times;
            </button>
            <h3>¿Estás seguro de que deseas añadir este producto?</h3>
            <div>
              <button onClick={handleConfirmSubmit}>Confirmar</button>
              <button onClick={() => setIsRegisterModalOpen(false)}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddProductForm;
