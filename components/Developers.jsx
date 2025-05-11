import React from "react";
import styles from "@/styles/developers.module.css";

export default function Developers({ showManyCard = true }) {
  const teamMembers = [
    {
      name: "Красота Дмитрий",
      role: "Аналитик/Разработчик",
      image: "/img/dima.jpg",
      telegram: "https://t.me/Kotory_d",
    },
    {
      name: "Своеволин Илья",
      role: "UX/UI Дизайнер",
      image: "/img/ilya.png",
      telegram: "https://t.me/Frazen_0",
    },
    {
      name: "Губарь Константин",
      role: "Аналитик/Разработчик",
      image: "/img/kostya.png",
      telegram: "https://t.me/kiseeii",
    },
    ...(showManyCard
      ? [
          {
            name: "Орехов Кирилл",
            role: "Разработчик",
            image: "/img/kirill.jpg",
            telegram: "/",
          },
        ]
      : []),
  ];

  return (
    <>
      <section className="container">
        <h2 className={styles.TeamTitle} data-aos="fade-up">
          Команда разработчиков
        </h2>
        <div className={styles.cards}>
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className={styles.card}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div
                className={styles.image}
                style={{ backgroundImage: `url(${member.image})` }}
              >
                <a
                  href={member.telegram}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  title="нажмите, что бы перейти в телеграм"
                >
                  <img src="/img/telegram.svg" alt="телеграм" />
                </a>
              </div>
              <div className={styles.cardText}>
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </div>
              <div className={styles.inputWrapper}>
                <input
                  className={styles.input}
                  type="text"
                  placeholder="Скажи Здравствуйте!"
                />
                <button>
                  <img src="/img/styledTelegram.svg" alt="телеграм" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
