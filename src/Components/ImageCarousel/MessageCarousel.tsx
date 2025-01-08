import React, { useState, useEffect } from "react";
import styles from "./ImageCarousel.module.css";

interface MessageCarouselProps {
  messages: string[]; // Lista de mensajes a mostrar
  interval?: number; // Tiempo entre mensajes en milisegundos (opcional)
}

const MessageCarousel: React.FC<MessageCarouselProps> = ({
  messages,
  interval = 5000, // Valor por defecto: 5 segundos
}) => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentMessageIndex((prevIndex) =>
        prevIndex === messages.length - 1 ? 0 : prevIndex + 1
      );
    }, interval);

    return () => clearInterval(timer); // Limpiar el intervalo al desmontar
  }, [messages, interval]);

  return (
    <div className={styles["message-carousel"]}>
      <p>{messages[currentMessageIndex]}</p>
    </div>
  );
};

export default MessageCarousel;
