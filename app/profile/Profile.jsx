"use client";
import React, { useState, useRef } from "react";
import styles from "@/styles/profile.module.css";
import { Link } from "react-scroll";
export default function Profile() {
  // Состояние профиля
  const [profile, setProfile] = useState({
    name: "Валерия Баннова",
    email: "Youi@yandex.ru",
    birthDate: "05.03.1994",
    company: "ООО 'Метозторг'",
    phone: "8-988-909-90-90",
    gender: "Женский",
    description:
      "Инфо о пользователе которое он сам напишет, например его направление. Российский пакет офисных приложений для корпоративных коммуникаций и работы с документами.",
    avatar: "/img/profileAvatar.png",
  });

  const [editingField, setEditingField] = useState(null);
  const [tempValue, setTempValue] = useState("");
  const fileInputRef = useRef(null);

  // Обработчик изменения аватарки
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((prev) => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const startEditing = (field, value) => {
    setEditingField(field);
    setTempValue(value);
  };

  const saveChanges = () => {
    setProfile((prev) => ({ ...prev, [editingField]: tempValue }));
    setEditingField(null);
  };

  const cancelEditing = () => {
    setEditingField(null);
  };

  return (
    <section className={styles.section}>
      <Link
        to="events"
        smooth={true}
        duration={500}
        className={styles.buttonScroll}
      >
        <img src="/img/arrow.svg" alt="стрелочка" />
      </Link>

      <div className="container">
        <div className={styles.title}>
          <h1>Мой профиль</h1>
        </div>
        <div className={styles.flex}>
          <div className={styles.mainProfile}>
            <div className={styles.name}>
              <p>{profile.name}</p>
              <button
                onClick={() => startEditing("name", profile.name)}
                className={styles.editMainButton}
              >
                <img src="/img/edit.svg" alt="Редактировать имя" />
              </button>
            </div>

            <div className={styles.avatarContainer}>
              <div className={styles.avatarWrapper}>
                <img
                  src={profile.avatar}
                  alt="Аватар"
                  className={styles.avatar}
                />
                <button
                  className={styles.changeAvatarButton}
                  onClick={() => fileInputRef.current.click()}
                >
                  Изменить
                </button>
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleAvatarChange}
                accept="image/*"
                style={{ display: "none" }}
              />
            </div>
          </div>
          <div className={styles.infoProfile}>
            <div className={styles.container}>
              {Object.entries({
                email: "Эл.почта",
                birthDate: "Дата рождения",
                company: "Компания",
                phone: "Номер",
                gender: "Пол",
              }).map(([field, label]) => (
                <div key={field} className={styles.info}>
                  <p>{label}: </p>
                  <div className={styles.infoContent}>
                    <span>{profile[field]}</span>
                    <button
                      onClick={() => startEditing(field, profile[field])}
                      className={styles.editButton}
                    >
                      <img src="/img/edit.svg" alt={`Редактировать ${label}`} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.vector}>
            <img src="/img/vector.svg" alt="" />
          </div>
        </div>

        <div className={styles.bottom}>
          <div className={styles.vector}>
            <img src="/img/vector1.svg" alt="" />
          </div>
          <div className={styles.desc}>
            <div className={styles.edit}>
              <button
                onClick={() => startEditing("description", profile.description)}
                className={styles.editMainButton}
              >
                <img src="/img/edit.svg" alt="Редактировать описание" />
              </button>
            </div>
            <div className={styles.titleDesc}>
              <p>Описание:</p>
            </div>
            <div className={styles.bodyDesc}>
              <p>{profile.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Модальное окно редактирования */}
      {editingField && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>
              Редактировать{" "}
              {
                {
                  name: "имя",
                  email: "электронную почту",
                  birthDate: "дату рождения",
                  company: "компанию",
                  phone: "номер телефона",
                  gender: "пол",
                  description: "описание",
                }[editingField]
              }
            </h3>

            {editingField === "description" ? (
              <textarea
                value={tempValue}
                onChange={(e) => setTempValue(e.target.value)}
                className={styles.editTextarea}
              />
            ) : (
              <input
                type="text"
                value={tempValue}
                onChange={(e) => setTempValue(e.target.value)}
                className={styles.editInput}
              />
            )}

            <div className={styles.modalButtons}>
              <button onClick={cancelEditing} className={styles.cancelButton}>
                Отмена
              </button>
              <button onClick={saveChanges} className={styles.saveButton}>
                Сохранить
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
