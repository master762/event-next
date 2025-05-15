"use client";
import React from "react";
import styles from "@/styles/about.module.css";

import {
  FaLightbulb,
  FaUsers,
  FaHandHoldingHeart,
  FaChartLine,
} from "react-icons/fa";
import Developers from "@/components/Developers";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function AboutPage() {
  const values = [
    {
      icon: <FaLightbulb />,
      title: "Инновации",
      description:
        "Мы постоянно ищем новые пути решения задач и улучшения наших продуктов.",
    },
    {
      icon: <FaUsers />,
      title: "Команда",
      description:
        "Наши сотрудники - наш главный актив. Мы инвестируем в их развитие.",
    },
    {
      icon: <FaHandHoldingHeart />,
      title: "Ответственность",
      description:
        "Мы отвечаем за качество наших решений перед клиентами и обществом.",
    },
    {
      icon: <FaChartLine />,
      title: "Развитие",
      description: "Стремимся к постоянному росту и совершенствованию во всем.",
    },
  ];

  return (
    <>
      <Header />
      <section className={styles.hero}>
        <div className="container">
          <h1>О нашей компании</h1>
          <p>Мы создаем инновационные решения для вашего бизнеса</p>
        </div>
      </section>

      <section className={styles.aboutSection}>
        <div className="container">
          <div className={styles.aboutContent}>
            <div className={styles.aboutText}>
              <h2>Наша история</h2>
              <p>
                Основанная в 2010 году, наша компания начинала с небольшой
                команды энтузиастов. Сегодня мы - лидеры рынка с офисами в 12
                странах мира и штатом более 500 профессионалов.
              </p>
              <p>
                Наша миссия - предоставлять клиентам инновационные решения,
                которые делают их жизнь проще, а бизнес - успешнее.
              </p>
            </div>
            <div className={styles.aboutImage}>
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c"
                alt="Наша команда"
              />
            </div>
          </div>
        </div>
      </section>

      <section className={styles.values}>
        <div className="container">
          <h2>Наши ценности</h2>
          <div className={styles.valuesGrid}>
            {values.map((value, index) => (
              <div key={index} className={styles.valueCard}>
                <div className={styles.valueIcon}>{value.icon}</div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Developers />
      <Footer />
    </>
  );
}
