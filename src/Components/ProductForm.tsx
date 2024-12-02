import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { addProduct } from "../Components/productoService";
import { useNavigate } from "react-router-dom";
import "../Styles/AppBar.css";

// Esquema de validación
const productSchema = z.object({
  name: z.string().min(1, { message: "Se requiere el nombre del producto" }),
  price: z
    .number({ invalid_type_error: "El precio debe ser un número válido" })
    .min(0.01, { message: "El precio debe ser superior a 0" }),
  quantity: z
    .number({ invalid_type_error: "La cantidad debe ser un número válido" })
    .min(1, { message: "La cantidad debe ser al menos 1" }),
  category: z.string().min(1, { message: "Se requiere la categoría" }),
});

type ProductFormData = z.infer<typeof productSchema>;

type ProductFormProps = {
  closeModal?: () => void;
};

const ProductForm: React.FC<ProductFormProps> = ({ closeModal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
  });

  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const navigate = useNavigate();
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
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

  function closeRegisterModal(
    event: React.MouseEvent<HTMLButtonElement>
  ): void {
    event.stopPropagation(); // Si necesitas evitar que el evento burbujee
    setIsRegisterModalOpen(false); // Esta línea sigue cerrando el modal
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="modal-body">
          <h2>Agregar Producto</h2>
          <label>Nombre del producto: </label>
          <input type="text" {...register("name")} />
          {errors.name && <span>{errors.name.message}</span>}

          <label>Precio: </label>
          <input
            type="number"
            step="0.01"
            {...register("price", { valueAsNumber: true })}
          />
          {errors.price && <span>{errors.price.message}</span>}

          <label>Cantidad: </label>
          <input
            type="number"
            {...register("quantity", { valueAsNumber: true })}
          />
          {errors.quantity && <span>{errors.quantity.message}</span>}
        </div>

        <div className="modal-body">
          <label>Categoría: </label>
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
            <option value="Limpieza y Desinfección">
              Limpieza y Desinfección
            </option>
          </select>
          {errors.category && <span>{errors.category.message}</span>}
        </div>

        <div>
          <label>Imagen del producto: </label>
          <input type="file" onChange={handleImageChange} />
          {imageBase64 && (
            <img
              src={imageBase64}
              alt="Vista previa"
              style={{ width: "100px" }}
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

export default ProductForm;
