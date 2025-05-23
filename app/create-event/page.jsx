"use client";
import { useState } from "react";
import styles from "@/styles/createEvent.module.css";

export default function CreateEventPage() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    budget: "",
    deadline: "",
  });

  const [participants, setParticipants] = useState([
    { email: "", role: "", userInfo: null },
  ]);

  const [coverImage, setCoverImage] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleParticipantChange = async (index, e) => {
    const { name, value } = e.target;
    const newParticipants = [...participants];
    newParticipants[index][name] = value;

    if (name === "email" && value.includes("@")) {
      try {
        const res = await fetch("/api/user-by-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: value }),
        });

        if (res.ok) {
          const data = await res.json();
          newParticipants[index].userInfo = data;
        } else {
          newParticipants[index].userInfo = null;
        }
      } catch {
        newParticipants[index].userInfo = null;
      }
    }

    setParticipants(newParticipants);
  };

  const addParticipant = () => {
    setParticipants([...participants, { email: "", role: "", userInfo: null }]);
  };

  const removeParticipant = (index) => {
    const newParticipants = participants.filter((_, i) => i !== index);
    setParticipants(newParticipants);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let coverImageUrl = null;

    if (coverImage) {
      const imageForm = new FormData();
      imageForm.append("file", coverImage);

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: imageForm,
      });

      if (uploadRes.ok) {
        const { url } = await uploadRes.json();
        coverImageUrl = url;
      } else {
        alert("Ошибка загрузки обложки");
        return;
      }
    }

    const body = {
      title: form.title,
      description: form.description,
      budget: Number(form.budget),
      deadline: form.deadline,
      coverImage: coverImageUrl,
      participants: participants.map((p) => ({
        email: p.email,
        role: p.role,
        subRole: null,
      })),
    };

    const res = await fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      alert("Мероприятие создано!");
      setForm({ title: "", description: "", budget: "", deadline: "" });
      setParticipants([{ email: "", role: "", userInfo: null }]);
      setCoverImage(null);
    } else {
      alert("Ошибка при создании мероприятия!");
    }
  };

  return (
    <div className={styles.form}>
      <h1 className={styles.title}>Создание мероприятия</h1>

      <form onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="title">
            Название
          </label>
          <input
            className={styles.input}
            id="title"
            name="title"
            placeholder="Введите название мероприятия"
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="description">
            Описание
          </label>
          <textarea
            className={styles.textarea}
            id="description"
            name="description"
            placeholder="Опишите ваше мероприятие"
            value={form.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="budget">
            Бюджет
          </label>
          <input
            className={styles.input}
            id="budget"
            name="budget"
            type="number"
            placeholder="Укажите бюджет"
            value={form.budget}
            onChange={handleChange}
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="deadline">
            Дата окончания
          </label>
          <input
            className={styles.input}
            id="deadline"
            name="deadline"
            type="date"
            value={form.deadline}
            onChange={handleChange}
          />
        </div>

        <h3 className={styles.participantsTitle}>Участники</h3>

        {participants.map((participant, index) => (
          <div key={index} className={styles.participantCard}>
            <div className={styles.inputGroup}>
              <label className={styles.label} htmlFor={`email-${index}`}>
                Email
              </label>
              <input
                className={styles.input}
                id={`email-${index}`}
                name="email"
                type="email"
                placeholder="Email участника"
                value={participant.email}
                onChange={(e) => handleParticipantChange(index, e)}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label} htmlFor={`role-${index}`}>
                Роль
              </label>
              <input
                className={styles.input}
                id={`role-${index}`}
                name="role"
                placeholder="Роль участника"
                value={participant.role}
                onChange={(e) => handleParticipantChange(index, e)}
                required
              />
            </div>

            <div className={styles.flexContainer}>
              <button
                type="button"
                onClick={() => removeParticipant(index)}
                className={`${styles.button} ${styles.buttonDanger}`}
              >
                Удалить
              </button>
            </div>

            {participant.userInfo && (
              <div className={styles.userInfoCard}>
                <img
                  src={participant.userInfo.image || "/default-avatar.png"}
                  alt="avatar"
                  className={styles.userAvatar}
                />
                <div className={styles.userDetails}>
                  <strong>{participant.userInfo.name}</strong>
                  <br />
                  {participant.userInfo.email}
                </div>
              </div>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={addParticipant}
          className={`${styles.button} ${styles.buttonSecondary}`}
        >
          Добавить участника
        </button>

        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="coverImage">
            Обложка мероприятия
          </label>
          <input
            className={styles.fileInput}
            id="coverImage"
            type="file"
            accept="image/*"
            onChange={(e) => setCoverImage(e.target.files[0])}
          />
        </div>

        <button
          type="submit"
          className={`${styles.button} ${styles.submitButton}`}
        >
          Создать мероприятие
        </button>
      </form>
    </div>
  );
}
