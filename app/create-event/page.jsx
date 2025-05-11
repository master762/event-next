"use client";
import React, { useState } from "react";
import styles from "@/styles/createEvent.module.css";

export default function CreateEvent() {
  // Основные данные мероприятия
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    coverImage: null,
    budget: "",
    deadline: "",
    participants: [],
  });

  // Данные нового участника
  const [newParticipant, setNewParticipant] = useState({
    name: "",
    email: "",
    role: "organizer",
    customRole: "",
    subRole: "",
  });

  // Состояние для отображения формы добавления участника
  const [showParticipantForm, setShowParticipantForm] = useState(false);

  // Обработчик изменения основных полей
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData((prev) => ({ ...prev, [name]: value }));
  };

  // Обработчик загрузки изображения
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEventData((prev) => ({ ...prev, coverImage: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Обработчик изменения полей участника
  const handleParticipantChange = (e) => {
    const { name, value } = e.target;
    setNewParticipant((prev) => ({ ...prev, [name]: value }));
  };

  // Добавление нового участника
  const addParticipant = () => {
    if (newParticipant.name && newParticipant.email) {
      setEventData((prev) => ({
        ...prev,
        participants: [...prev.participants, newParticipant],
      }));
      setNewParticipant({
        name: "",
        email: "",
        role: "organizer",
        customRole: "",
        subRole: "",
      });
      setShowParticipantForm(false);
    }
  };

  // Удаление участника
  const removeParticipant = (index) => {
    setEventData((prev) => ({
      ...prev,
      participants: prev.participants.filter((_, i) => i !== index),
    }));
  };

  // Отправка формы
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Данные мероприятия:", eventData);
    // Здесь будет логика отправки данных на сервер
    alert("Мероприятие успешно создано!");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Создание нового мероприятия</h1>

      <form onSubmit={handleSubmit} className={styles.eventForm}>
        {/* Блок основной информации */}
        <div className={styles.formSection}>
          <h2 className={styles.sectionTitle}>Основная информация</h2>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Название мероприятия</label>
            <input
              type="text"
              name="title"
              value={eventData.title}
              onChange={handleInputChange}
              className={styles.formInput}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Описание</label>
            <textarea
              name="description"
              value={eventData.description}
              onChange={handleInputChange}
              rows={5}
              className={styles.formTextarea}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Обложка мероприятия</label>
            <div className={styles.imageUpload}>
              {eventData.coverImage ? (
                <div className={styles.imagePreview}>
                  <img
                    src={eventData.coverImage}
                    alt="Предпросмотр обложки"
                    className={styles.imagePreviewImg}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setEventData((prev) => ({ ...prev, coverImage: null }))
                    }
                    className={styles.imagePreviewButton}
                  >
                    Удалить
                  </button>
                </div>
              ) : (
                <label className={styles.uploadButton}>
                  Выберите файл
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    hidden
                  />
                </label>
              )}
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={`${styles.formGroup} ${styles.formRowGroup}`}>
              <label className={styles.formLabel}>Бюджет (руб.)</label>
              <input
                type="number"
                name="budget"
                value={eventData.budget}
                onChange={handleInputChange}
                className={styles.formInput}
                min="0"
              />
            </div>

            <div className={`${styles.formGroup} ${styles.formRowGroup}`}>
              <label className={styles.formLabel}>Дедлайн</label>
              <input
                type="datetime-local"
                name="deadline"
                value={eventData.deadline}
                onChange={handleInputChange}
                className={styles.formInput}
                required
              />
            </div>
          </div>
        </div>

        {/* Блок участников */}
        <div className={`${styles.formSection} ${styles.formSectionLast}`}>
          <h2 className={styles.sectionTitle}>Участники</h2>

          {eventData.participants.length > 0 && (
            <div className={styles.participantsList}>
              {eventData.participants.map((participant, index) => (
                <div key={index} className={styles.participantCard}>
                  <div>
                    <strong>{participant.name}</strong>
                    <p className={styles.participantText}>
                      {participant.email}
                    </p>
                    <p className={styles.participantText}>
                      Роль:{" "}
                      {participant.role === "organizer"
                        ? "Организатор"
                        : "Заказчик"}
                      {participant.subRole && ` (${participant.subRole})`}
                      {participant.customRole && ` (${participant.customRole})`}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeParticipant(index)}
                    className={styles.removeButton}
                  >
                    Удалить
                  </button>
                </div>
              ))}
            </div>
          )}

          {showParticipantForm ? (
            <div className={styles.participantForm}>
              <h3 className={styles.subSectionTitle}>Добавить участника</h3>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Имя</label>
                <input
                  type="text"
                  name="name"
                  value={newParticipant.name}
                  onChange={handleParticipantChange}
                  className={styles.formInput}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Email</label>
                <input
                  type="email"
                  name="email"
                  value={newParticipant.email}
                  onChange={handleParticipantChange}
                  className={styles.formInput}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Роль</label>
                <select
                  name="role"
                  value={newParticipant.role}
                  onChange={handleParticipantChange}
                  className={styles.formInput}
                >
                  <option value="organizer">Организатор</option>
                  <option value="customer">Заказчик</option>
                </select>
              </div>

              {newParticipant.role === "organizer" && (
                <>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>
                      Подроль организатора
                    </label>
                    <select
                      name="subRole"
                      value={newParticipant.subRole}
                      onChange={handleParticipantChange}
                      className={styles.formInput}
                    >
                      <option value="">Выберите подроль</option>
                      <option value="catering">Кейтеринг</option>
                      <option value="music">Музыка</option>
                      <option value="venue">Аренда зала</option>
                      <option value="custom">Другая роль</option>
                    </select>
                  </div>

                  {newParticipant.subRole === "custom" && (
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Укажите роль</label>
                      <input
                        type="text"
                        name="customRole"
                        value={newParticipant.customRole}
                        onChange={handleParticipantChange}
                        className={styles.formInput}
                      />
                    </div>
                  )}
                </>
              )}

              <div className={styles.formActions}>
                <button
                  type="button"
                  onClick={addParticipant}
                  className={styles.addButton}
                >
                  Добавить
                </button>
                <button
                  type="button"
                  onClick={() => setShowParticipantForm(false)}
                  className={styles.cancelButton}
                >
                  Отмена
                </button>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setShowParticipantForm(true)}
              className={styles.addParticipantButton}
            >
              + Добавить участника
            </button>
          )}
        </div>

        <div className={styles.submitSection}>
          <button type="submit" className={styles.submitButton}>
            Создать мероприятие
          </button>
        </div>
      </form>
    </div>
  );
}
