import { useDispatch } from "react-redux";
import { AppDispatch } from "@/Redux/store";

// Hook personalizado para despachar acciones con tipado
const useAppDispatch = () => useDispatch<AppDispatch>();

export default useAppDispatch;
