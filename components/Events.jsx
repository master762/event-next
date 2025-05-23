"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "@/styles/events.module.css";

export default function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const res = await fetch("/api/events");
        const data = await res.json();
        setEvents(data);
      } catch (error) {
        console.error("Ошибка при загрузке мероприятий:", error);
      }
    };

    loadEvents();
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Мои мероприятия</h2>
        <div className={styles.cards}>
          {events.length === 0 ? (
            <p>Мероприятий пока нет</p>
          ) : (
            events.map((event, index) => (
              <div className={styles.card} key={event.id || index}>
                <img
                  src={event.coverImage || "/img/default-event.png"}
                  alt={`Событие: ${event.title}`}
                />
                <h2>{event.title}</h2>
                <p>{event.description}</p>
                <Link href={`/events/${event.id}`}>
                  <button className={styles.btn}>
                    <span>Увидеть подробности</span>
                  </button>
                </Link>
                <button className={styles.btn}>
                  <span>Удалить</span>
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
