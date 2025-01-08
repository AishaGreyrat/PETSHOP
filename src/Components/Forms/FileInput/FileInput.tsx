import React from 'react';
import { uploadFile } from 'firebaseConfig';
import styles from "./Fileinput.module.css";

const FileInput: React.FC = () => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      uploadFile(e.target.files[0]); // Llama a la función para subir el archivo
    }
  };

  return (
    <div className={styles["FileInputContent"]}>
      <input type="file" onChange={handleFileChange} />
    </div>
  );
};

export default FileInput;
