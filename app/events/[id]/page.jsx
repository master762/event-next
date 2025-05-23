"use client";
import React, { useState, useEffect, use } from "react";
import styles from "@/styles/event.module.css";
import EventTaskTable from "@/components/TaskTable";
import FinanceModule from "@/components/FinanceModule";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

async function getEvent(id) {
  const res = await fetch(`http://localhost:3000/api/events/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Не удалось загрузить мероприятие");
  return res.json();
}

const days = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
const hours = Array.from({ length: 12 }, (_, i) => i + 7);

function formatTime(hour) {
  return `${hour}:00`;
}

export default function EventPageWrapper({ params }) {
  const { id } = use(params);
  const [event, setEvent] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [deadlineVisible, setDeadlineVisible] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    budget: "",
    coverImage: "",
  });

  useEffect(() => {
    getEvent(id)
      .then((data) => {
        setEvent(data);
        setFormData({
          title: data.title,
          description: data.description,
          budget: data.budget || "",
          coverImage: data.coverImage || "",
        });
      })
      .catch(console.error);

    fetch(`/api/tasks-for-event?id=${id}`)
      .then((res) => res.json())
      .then(setTasks)
      .catch(console.error);
  }, [id]);

  if (!event) return <p>Загрузка...</p>;

  const handleScroll = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`/api/events/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Не удалось обновить данные");

      const updated = await res.json();
      setEvent(updated);
      setEditing(false);
    } catch (error) {
      console.error("Ошибка при сохранении:", error);
    }
  };

  return (
    <>
      <Header />

      {deadlineVisible && (
        <div id="deadline" className={styles.deadline}>
          <p>
            Дедлайн:{" "}
            {new Date(event.deadline).toLocaleString("ru-RU", {
              month: "long",
              year: "numeric",
            })}
          </p>
          <button
            className={styles.closeBtn}
            aria-label="Закрыть"
            onClick={() => setDeadlineVisible(false)}
          >
            ×
          </button>
        </div>
      )}

      <nav className={styles.pageNav}>
        <ul className={styles.navList}>
          {[
            "deadline",
            "event-info",
            "timeline",
            "tasks",
            "finance",
            "participants",
          ].map((id) => (
            <li key={id}>
              <a href={`#${id}`} onClick={(e) => handleScroll(e, id)}>
                {id === "event-info"
                  ? "О мероприятии"
                  : id === "timeline"
                  ? "Таймлайн"
                  : id === "tasks"
                  ? "Общие задачи"
                  : id === "finance"
                  ? "Бюджет"
                  : id === "participants"
                  ? "Участники"
                  : "Дедлайн"}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <section id="event-info">
        <div className="container">
          <div
            className={styles.background}
            style={{
              backgroundImage: `url(${
                formData.coverImage || "/img/default-event.png"
              })`,
            }}
          >
            <div className={styles.text}>
              {editing ? (
                <>
                  <input
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className={styles.input}
                    placeholder="Название"
                  />
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className={styles.input}
                    placeholder="Описание"
                  />
                  <input
                    name="budget"
                    type="number"
                    value={formData.budget}
                    onChange={handleChange}
                    className={styles.input}
                    placeholder="Бюджет"
                  />
                  <input
                    name="coverImage"
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                      const file = e.target.files[0];
                      if (!file) return;

                      const formData = new FormData();
                      formData.append("file", file);

                      try {
                        const res = await fetch("/api/upload", {
                          method: "POST",
                          body: formData,
                        });

                        if (!res.ok) throw new Error("Ошибка загрузки файла");

                        const data = await res.json();
                        setFormData((prev) => ({
                          ...prev,
                          coverImage: data.url,
                        }));
                      } catch (err) {
                        console.error("Ошибка при загрузке обложки:", err);
                      }
                    }}
                    className={styles.input}
                  />

                  {formData.coverImage && (
                    <img
                      src={formData.coverImage}
                      alt="Обложка"
                      className={styles.preview}
                      style={{ maxWidth: "200px", marginTop: "1rem" }}
                    />
                  )}
                  <button onClick={handleSave}>Сохранить</button>
                  <button onClick={() => setEditing(false)}>Отмена</button>
                </>
              ) : (
                <>
                  <h3>{event.title}</h3>
                  <p>{event.description}</p>

                  <button onClick={() => setEditing(true)}>
                    <span>изменить данные</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Таймлайн */}
      <section id="timeline">
        <div className={styles.title}>
          <h2>Таймлайн на неделю</h2>
        </div>
        <div className="container">
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const title = e.target.title.value;
              const day = e.target.day.value;
              const startHour = parseInt(e.target.startHour.value);
              const duration = parseInt(e.target.duration.value);
              const color = e.target.color.value;

              const newTask = {
                title,
                day,
                startHour,
                duration,
                color,
                eventId: id,
              };

              try {
                const res = await fetch("/api/tasks", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(newTask),
                });

                if (!res.ok) throw new Error("Не удалось создать задачу");

                const savedTask = await res.json();
                setTasks((prev) => [...prev, savedTask]);
                e.target.reset();
              } catch (error) {
                console.error("Ошибка при добавлении задачи:", error);
              }
            }}
            className={styles.form}
          >
            <input
              name="title"
              placeholder="Название задачи"
              required
              className={`${styles.input} ${styles.inputTitle}`}
            />
            <select
              name="day"
              className={`${styles.select} ${styles.selectDay}`}
            >
              {days.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
            <input
              name="startHour"
              type="number"
              min={7}
              max={18}
              required
              placeholder="Начало (ч)"
              className={`${styles.input} ${styles.inputNumber}`}
            />
            <input
              name="duration"
              type="number"
              min={1}
              max={12}
              required
              placeholder="Длительность (ч)"
              className={`${styles.input} ${styles.inputNumber}`}
            />
            <select
              name="color"
              className={`${styles.select} ${styles.selectColor}`}
            >
              <option value="orange">Оранжевый</option>
              <option value="green">Зелёный</option>
              <option value="blue">Синий</option>
            </select>
            <button type="submit" className={styles.button}>
              Добавить задачу
            </button>
          </form>
        </div>
        <div className="container">
          <div className={styles.scheduleWrapper}>
            <div className={styles.dataTable}>
              <div className={styles.headerEmpty}></div>
              {days.map((day, i) => (
                <div key={i} className={styles.headerCell}>
                  {day}
                </div>
              ))}

              {hours.map((hour) => (
                <div key={`row-${hour}`} className={styles.row}>
                  <div className={styles.timeCell}>{formatTime(hour)}</div>
                  {days.map((day) => {
                    const key = `${day}-${hour}`;

                    const task = tasks.find(
                      (t) => t.day === day && t.startHour === hour
                    );
                    if (task) {
                      return (
                        <div
                          key={key}
                          className={`${styles.cell} ${
                            styles[`${task.color}Cell`]
                          }`}
                          style={{ gridRow: `span ${task.duration}` }}
                        >
                          {task.title}
                        </div>
                      );
                    }

                    const isOccupied = tasks.some(
                      (t) =>
                        t.day === day &&
                        hour > t.startHour &&
                        hour < t.startHour + t.duration
                    );
                    if (isOccupied) return null;

                    return <div key={key} className={styles.cell}></div>;
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Общие задачи */}
      <section id="tasks">
        <div className={styles.title}>
          <h2>Общие задачи</h2>
        </div>
        <div className="container">
          <EventTaskTable eventId={id} />
        </div>
      </section>

      {/* Бюджет */}
      <section id="finance">
        <FinanceModule eventId={id} />
      </section>

      {/* Участники */}
      <section id="participants">
        <div className={styles.title}>
          <h2>Участники</h2>
        </div>
        <div className="container">
          {event.participants && event.participants.length > 0 ? (
            <div className={styles.participantsList}>
              {event.participants.map((p) => (
                <div key={p.id} className={styles.participantCard}>
                  <img
                    src={p.avatar}
                    alt={p.name}
                    className={styles.participantAvatar}
                    width={50}
                    height={50}
                  />
                  <div className={styles.participantInfo}>
                    <p>
                      <strong>{p.name}</strong>
                    </p>
                    <p>Email: {p.email}</p>
                    <p>Компания: {p.User?.profile?.company || "не указана"}</p>
                    <p>Роль: {p.role}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>Участники отсутствуют</p>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
