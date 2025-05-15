"use client";
import React, { useState } from "react";
import styles from "@/styles/faq.module.css";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function FAQPage() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqItems = [
    {
      question: "Как начать работать с вашей компанией?",
      answer:
        "Для начала работы с нами вам необходимо оставить заявку на нашем сайте или связаться с нашим менеджером по телефону. После этого мы проведем бесплатную консультацию, определим ваши потребности и предложим оптимальное решение.",
    },
    {
      question: "Какие способы оплаты вы принимаете?",
      answer:
        "Мы принимаем следующие способы оплаты: банковские карты (Visa, Mastercard, Мир), банковские переводы, электронные платежи (Qiwi, Яндекс.Деньги, WebMoney), а также наличные в нашем офисе.",
    },
    {
      question: "Есть ли у вас бесплатный пробный период?",
      answer:
        "Да, мы предлагаем 14-дневный бесплатный пробный период для большинства наших услуг. В течение этого периода вы можете оценить все возможности нашего продукта без каких-либо обязательств.",
    },
    {
      question: "Как быстро вы отвечаете на запросы клиентов?",
      answer:
        "Наша служба поддержки работает 24/7. Среднее время ответа на email-запрос составляет 2 часа, на запросы в онлайн-чате - до 15 минут. Для срочных вопросов вы всегда можете позвонить нам по телефону горячей линии.",
    },
    {
      question: "Предоставляете ли вы обучающие материалы?",
      answer:
        "Да, у нас есть обширная база знаний, включающая видеоуроки, вебинары, PDF-руководства и пошаговые инструкции. Кроме того, мы проводим регулярные обучающие мероприятия для наших клиентов.",
    },
    {
      question: "Можно ли интегрировать ваше решение с другими системами?",
      answer:
        "Наши продукты поддерживают интеграцию с большинством популярных CRM-систем, платежных шлюзов и других бизнес-инструментов. Если вам нужна специфическая интеграция, наши разработчики могут реализовать индивидуальное решение.",
    },
  ];

  return (
    <>
      <Header />
      <section className={styles.faqHero}>
        <div className="container">
          <h1>Часто задаваемые вопросы</h1>
          <p>
            Здесь вы найдете ответы на самые популярные вопросы о наших услугах
          </p>
        </div>
      </section>

      <section className={styles.faqSection}>
        <div className="container">
          <div className={styles.faqContainer}>
            {faqItems.map((item, index) => (
              <div
                key={index}
                className={`${styles.faqItem} ${
                  activeIndex === index ? styles.active : ""
                }`}
              >
                <div
                  className={styles.faqQuestion}
                  onClick={() => toggleAccordion(index)}
                >
                  <h3>{item.question}</h3>
                  {activeIndex === index ? <FaChevronUp /> : <FaChevronDown />}
                </div>
                <div className={styles.faqAnswer}>
                  <p>{item.answer}</p>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.faqContact}>
            <h2>Не нашли ответ на свой вопрос?</h2>
            <p>
              Свяжитесь с нашей службой поддержки, и мы с радостью вам поможем!
            </p>
            <a href="/support" className={styles.btn}>
              Написать в поддержку
            </a>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
