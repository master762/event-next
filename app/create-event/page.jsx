"use client";
import { useState } from "react";

export default function CreateEventPage() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    budget: "",
    deadline: "",
  });

  // Массив участников, каждый с name, email, role
  const [participants, setParticipants] = useState([
    { name: "", email: "", role: "" },
  ]);
  const [coverImage, setCoverImage] = useState(null);

  // Обновление формы обычных полей
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Обновление участников
  const handleParticipantChange = (index, e) => {
    const newParticipants = [...participants];
    newParticipants[index][e.target.name] = e.target.value;
    setParticipants(newParticipants);
  };

  // Добавить нового участника
  const addParticipant = () => {
    setParticipants([...participants, { name: "", email: "", role: "" }]);
  };

  // Удалить участника
  const removeParticipant = (index) => {
    const newParticipants = participants.filter((_, i) => i !== index);
    setParticipants(newParticipants);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let coverImageUrl = null;

    // Шаг 1: загрузка файла обложки (если выбран)
    if (coverImage) {
      const imageForm = new FormData();
      imageForm.append("file", coverImage);

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: imageForm,
      });

      if (uploadRes.ok) {
        const { url } = await uploadRes.json();
        coverImageUrl = url; // пример: "/uploads/12345-image.jpg"
      } else {
        alert("Ошибка загрузки обложки");
        return;
      }
    }

    // Шаг 2: создание мероприятия с coverImageUrl
    const body = {
      title: form.title,
      description: form.description,
      budget: Number(form.budget),
      deadline: form.deadline,
      participants: participants,
      coverImage: coverImageUrl,
    };

    const res = await fetch("/api/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      alert("Мероприятие создано!");
      setForm({ title: "", description: "", budget: "", deadline: "" });
      setParticipants([{ name: "", email: "", role: "" }]);
      setCoverImage(null);
    } else {
      alert("Ошибка при создании мероприятия!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="title"
        placeholder="Название"
        value={form.title}
        onChange={handleChange}
      />
      <textarea
        name="description"
        placeholder="Описание"
        value={form.description}
        onChange={handleChange}
      />
      <input
        name="budget"
        type="number"
        placeholder="Бюджет"
        value={form.budget}
        onChange={handleChange}
      />
      <input
        name="deadline"
        type="date"
        value={form.deadline}
        onChange={handleChange}
      />

      <h3>Участники</h3>
      {participants.map((participant, index) => (
        <div key={index} style={{ marginBottom: "10px" }}>
          <input
            name="name"
            placeholder="Имя"
            value={participant.name}
            onChange={(e) => handleParticipantChange(index, e)}
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={participant.email}
            onChange={(e) => handleParticipantChange(index, e)}
            required
          />
          <input
            name="role"
            placeholder="Роль"
            value={participant.role}
            onChange={(e) => handleParticipantChange(index, e)}
            required
          />
          <button type="button" onClick={() => removeParticipant(index)}>
            Удалить
          </button>
        </div>
      ))}
      <button type="button" onClick={addParticipant}>
        Добавить участника
      </button>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setCoverImage(e.target.files[0])}
      />
      <button type="submit">Создать</button>
    </form>
  );
}
