import { useState, useEffect } from "react";

const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);

  useEffect(() => {
    const media = window.matchMedia(query);

    // Define el listener que actualiza el estado
    const listener = (event: MediaQueryListEvent) => setMatches(event.matches);

    // Agrega el listener
    media.addEventListener("change", listener);

    // Limpieza: remueve el listener cuando el componente se desmonta
    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
};

export default useMediaQuery;