import { useNavigate } from "react-router-dom";

// Hook personalizado para navegar a la página principal
const useNavigateToHome = () => {
  const navigate = useNavigate();

  return () => navigate("/");
};

export default useNavigateToHome;
