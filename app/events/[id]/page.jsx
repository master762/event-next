"use client";
import React, { useState, useEffect, use } from "react";
import styles from "@/styles/event.module.css";
import EventTaskTable from "@/components/TaskTable";

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

  useEffect(() => {
    getEvent(id).then(setEvent).catch(console.error);

    fetch(`/api/tasks-for-event?id=${id}`)
      .then((res) => res.json())
      .then(setTasks)
      .catch(console.error);
  }, [id]);

  if (!event) return <p>Загрузка...</p>;

  return (
    <>
      <div className={styles.deadline}>
        <p>Дедлайн: {event.deadline}</p>
      </div>

      <section>
        <div className="container">
          <div
            className={styles.background}
            style={{
              backgroundImage: `url(${
                event.coverImage || "/img/default-event.png"
              })`,
            }}
          >
            <div className={styles.text}>
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <button>
                <span>изменить данные</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* таймлайн */}
      <section>
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
            style={{
              marginBottom: "30px",
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
            }}
          >
            <input name="title" placeholder="Название задачи" required />
            <select name="day">
              {days.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
            <input name="startHour" type="number" min={7} max={18} required />
            <input name="duration" type="number" min={1} max={12} required />
            <select name="color">
              <option value="orange">Оранжевый</option>
              <option value="green">Зелёный</option>
              <option value="blue">Синий</option>
            </select>
            <button type="submit">Добавить задачу</button>
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
      <section>
        <div className={styles.title}>
          <h2>Общие задачи</h2>
        </div>
        <div className="container">
          <EventTaskTable eventId={id} />
        </div>
      </section>
    </>
  );
}
