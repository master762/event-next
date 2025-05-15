"use client";
import React from "react";
import styles from "@/styles/reviews.module.css";
import {
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
  FaCalendarAlt,
} from "react-icons/fa";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ReviewsPage() {
  const reviews = [
    {
      id: 1,
      name: "Мария Иванова",
      avatar: "https://randomuser.me/api/portraits/women/43.jpg",
      rating: 5,
      date: "15 мая 2023",
      content:
        "Обратилась в компанию для разработки сайта. Результат превзошел все ожидания! Сайт работает идеально, дизайн современный, а функционал полностью соответствует моим потребностям. Отдельное спасибо за терпение и готовность вносить правки.",
    },
    {
      id: 2,
      name: "Алексей Петров",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 4.5,
      date: "3 апреля 2023",
      content:
        "Заказывали разработку мобильного приложения. Сроки соблюдены, качество на высоте. Были небольшие недочеты, но их оперативно исправили. Рекомендую эту компанию как надежного партнера. Цены адекватные за такой уровень сервиса.",
    },
    {
      id: 3,
      name: "Елена Смирнова",
      avatar: "https://randomuser.me/api/portraits/women/65.jpg",
      rating: 5,
      date: "22 марта 2023",
      content:
        "Работаем с этой компанией уже третий год. Постоянно заказываем доработки и поддержку сайта. Всегда быстрая реакция, профессиональный подход и понимание наших бизнес-процессов. Очень довольны сотрудничеством и планируем продолжать!",
    },
    {
      id: 4,
      name: "Дмитрий Волков",
      avatar: "https://randomuser.me/api/portraits/men/54.jpg",
      rating: 4,
      date: "10 февраля 2023",
      content:
        "Хорошая компания с компетентными специалистами. Заказал интернет-магазин, сделали в срок. Единственное - хотелось бы более детального сопровождения после запуска. В целом рекомендую, особенно для стартапов.",
    },
    {
      id: 5,
      name: "Ольга Козлова",
      avatar: "https://randomuser.me/api/portraits/women/22.jpg",
      rating: 5,
      date: "28 января 2023",
      content:
        "Лучшие на рынке! Перепробовали несколько компаний до этого, но только здесь получили по-настоящему качественный продукт. Сайт приносит клиентов, работает без сбоев. Отдельное спасибо за обучение персонала - все было очень доступно.",
    },
    {
      id: 6,
      name: "Игорь Новиков",
      avatar: "https://randomuser.me/api/portraits/men/76.jpg",
      rating: 5,
      date: "15 декабря 2022",
      content:
        "Спасибо за отличную работу! Ребята сделали для нас корпоративный портал с нуля. Учтены все пожелания, реализованы сложные интеграции с нашими внутренними системами. Работали даже сверхурочно, чтобы успеть к нашему дедлайну. Профессионалы!",
    },
  ];

  const renderRating = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className={styles.starIcon} />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStarHalfAlt key={i} className={styles.starIcon} />);
      } else {
        stars.push(<FaRegStar key={i} className={styles.starIcon} />);
      }
    }

    return stars;
  };

  return (
    <>
      <Header />
      <section className={styles.reviewsHero}>
        <div className="container">
          <h1>Отзывы наших клиентов</h1>
          <p>
            Реальные мнения людей, которые уже воспользовались нашими услугами
          </p>
        </div>
      </section>

      <section className={styles.reviewsSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>Что говорят о нас</h2>
            <p>Более 500 довольных клиентов по всей стране</p>
          </div>

          <div className={styles.reviewsGrid}>
            {reviews.map((review) => (
              <div key={review.id} className={styles.reviewCard}>
                <div className={styles.reviewHeader}>
                  <div className={styles.reviewerAvatar}>
                    <img src={review.avatar} alt={review.name} />
                  </div>
                  <div className={styles.reviewerInfo}>
                    <h3>{review.name}</h3>
                    <div className={styles.reviewRating}>
                      {renderRating(review.rating)}
                    </div>
                  </div>
                </div>
                <div className={styles.reviewContent}>
                  <p>{review.content}</p>
                </div>
                <div className={styles.reviewDate}>
                  <FaCalendarAlt className={styles.calendarIcon} />{" "}
                  {review.date}
                </div>
              </div>
            ))}
          </div>

          <div className={styles.reviewsCta}>
            <h2>Хотите оставить свой отзыв?</h2>
            <p>Мы будем рады узнать о вашем опыте работы с нами</p>
            <a href="/add-review" className={styles.btn}>
              Написать отзыв
            </a>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
