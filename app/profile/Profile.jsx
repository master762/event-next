"use client";
import React, { useState, useRef, useEffect } from "react";
import styles from "@/styles/profile.module.css";
import { Link } from "react-scroll";
import { useSession, signOut } from "next-auth/react";

export default function Profile() {
  const { data: session, update } = useSession();
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    birthDate: "",
    company: "",
    phone: "",
    gender: "",
    description: "",
    avatar: "/default-avatar.jpg",
  });

  const [editingField, setEditingField] = useState(null);
  const [tempValue, setTempValue] = useState("");
  const fileInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  // Загрузка профиля при монтировании
  useEffect(() => {
    const loadProfile = async () => {
      if (session?.user) {
        try {
          const response = await fetch("/api/profile");
          if (response.ok) {
            const userData = await response.json();
            setProfile({
              name: userData.name || session.user.name || "",
              email: userData.email || session.user.email || "",
              avatar:
                userData.image || session.user.image || "/default-avatar.jpg",
              birthDate: userData.profile?.birthDate?.split("T")[0] || "",
              company: userData.profile?.company || "",
              phone: userData.profile?.phone || "",
              gender: userData.profile?.gender || "",
              description: userData.profile?.description || "",
            });
          }
        } catch (error) {
          console.error("Failed to load profile:", error);
        }
      }
    };

    loadProfile();
  }, [session]);

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Проверка типа файла
    if (!file.type.startsWith("image/")) {
      alert("Пожалуйста, загрузите изображение");
      return;
    }

    // Проверка размера файла (например, до 2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert("Файл слишком большой. Максимальный размер 2MB");
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("avatar", file);

      const response = await fetch("/api/profile/avatar", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const { imageUrl } = await response.json();
      setProfile((prev) => ({ ...prev, avatar: imageUrl }));
      await update({ image: imageUrl });
    } catch (error) {
      console.error("Error uploading avatar:", error);
      alert("Ошибка при загрузке аватара");
    } finally {
      setIsLoading(false);
    }
  };

  const startEditing = (field, value) => {
    setEditingField(field);
    setTempValue(value);
  };

  const saveChanges = async () => {
    setIsLoading(true);
    try {
      const updatedData = { ...profile, [editingField]: tempValue };

      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...updatedData,
          [editingField]: tempValue,
        }),
      });

      if (!response.ok) throw new Error("Failed to update");

      const data = await response.json();

      setProfile({
        ...updatedData,
        birthDate:
          data.profile?.birthDate?.split("T")[0] || updatedData.birthDate,
      });

      await update({
        name: data.name || updatedData.name,
        email: editingField === "email" ? tempValue : updatedData.email,
        image: data.image || updatedData.avatar,
      });

      setEditingField(null);
    } catch (error) {
      console.error("Error saving changes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const cancelEditing = () => {
    setEditingField(null);
  };

  if (!session) {
    return (
      <div className={styles.section}>
        <div className="container">
          <h1>Пожалуйста, войдите чтобы просмотреть профиль</h1>
        </div>
      </div>
    );
  }

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
              <p>{profile.name || "Не указано"}</p>
              <button
                onClick={() => startEditing("name", profile.name)}
                className={styles.editMainButton}
                disabled={isLoading}
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
                  disabled={isLoading}
                >
                  {isLoading ? "Загрузка..." : "Изменить"}
                </button>
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleAvatarChange}
                accept="image/*"
                style={{ display: "none" }}
                disabled={isLoading}
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
                    <span>{profile[field] || "Не указано"}</span>
                    <button
                      onClick={() => startEditing(field, profile[field])}
                      className={styles.editButton}
                      disabled={isLoading}
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
                disabled={isLoading}
              >
                <img src="/img/edit.svg" alt="Редактировать описание" />
              </button>
            </div>
            <div className={styles.titleDesc}>
              <p>Описание:</p>
            </div>
            <div className={styles.bodyDesc}>
              <p>{profile.description || "Добавьте информацию о себе"}</p>
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
                disabled={isLoading}
              />
            ) : editingField === "gender" ? (
              <select
                value={tempValue}
                onChange={(e) => setTempValue(e.target.value)}
                className={styles.editInput}
                disabled={isLoading}
              >
                <option value="">Выберите пол</option>
                <option value="Мужской">Мужской</option>
                <option value="Женский">Женский</option>
                <option value="Другой">Другой</option>
              </select>
            ) : (
              <input
                type={editingField === "birthDate" ? "date" : "text"}
                value={tempValue}
                onChange={(e) => setTempValue(e.target.value)}
                className={styles.editInput}
                disabled={isLoading}
              />
            )}

            <div className={styles.modalButtons}>
              <button
                onClick={cancelEditing}
                className={styles.cancelButton}
                disabled={isLoading}
              >
                Отмена
              </button>
              <button
                onClick={saveChanges}
                className={styles.saveButton}
                disabled={isLoading}
              >
                {isLoading ? "Сохранение..." : "Сохранить"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
