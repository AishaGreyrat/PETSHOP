import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "@/Redux/store";

// Hook personalizado para seleccionar datos del estado global con tipado
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default useAppSelector;
