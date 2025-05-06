"use client";
// для обработки (отправки) файла в чате
import styles from "@/styles/chat.module.css";

export default function FileUploadButton() {
  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      console.log("Выбран файл:", files[0]);
    }
  };

  return (
    <div className={styles.file}>
      <label htmlFor="file-upload">
        <img src="/img/screpka.svg" alt="Прикрепить файл" />
      </label>
      <input
        id="file-upload"
        type="file"
        className={styles.fileInput}
        onChange={handleFileChange}
      />
    </div>
  );
}
