import styles from "@/styles/events.module.css";

const events = [
  {
    title: "Выпускной",
    description: "Детство заканчивается, а эмоции остаются. Мы пре...",
    image: "/img/event.png",
  },
  {
    title: "Выпускной",
    description: "Детство заканчивается, а эмоции остаются. Мы пре...",
    image: "/img/event1.png",
  },
  {
    title: "Выпускной",
    description: "Детство заканчивается, а эмоции остаются. Мы пре...",
    image: "/img/event2.png",
  },
  {
    title: "Выпускной",
    description: "Детство заканчивается, а эмоции остаются. Мы пре...",
    image: "/img/event3.png",
  },
];

export default function Events() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Мои мероприятия</h2>
        <div className={styles.cards}>
          {events.map((event, index) => (
            <div className={styles.card} key={index}>
              <img src={event.image} alt={`Событие: ${event.title}`} />
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <button className={styles.btn}>
                <span>Увидеть подробности</span>
              </button>
              <button className={styles.btn}>
                <span>Удалить</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
