"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import styles from "@/styles/team.module.css";
import React, { useState } from "react";

export default function Page() {
  const teamMembers = [
    {
      id: 1,
      name: "Игорь Королев",
      localEventRole: "Поставщик",
      globalEventRole: "организатор",
      location: "Сочи",
      image: "/img/team.png",
    },
    {
      id: 2,
      name: "Иван Платов",
      localEventRole: "Диджей",
      globalEventRole: "организатор",
      location: "Ростов",
      image: "/img/team1.png",
    },
    {
      id: 3,
      name: "Анна Королёва",
      localEventRole: "Поставщик",
      globalEventRole: "организатор",
      location: "Москва",
      image: "/img/team2.png",
    },
    {
      id: 4,
      name: "Игорь Королев",
      localEventRole: "Поставщик",
      globalEventRole: "организатор",
      location: "Сочи",
      image: "/img/team.png",
    },
    {
      id: 5,
      name: "Игорь Иванов",
      localEventRole: "Поставщик",
      globalEventRole: "организатор",
      location: "Ростов",
      image: "/img/team2.png",
    },
    {
      id: 6,
      name: "Иван Платов",
      localEventRole: "Дид жей",
      globalEventRole: "организатор",
      location: "Москва",
      image: "/img/team1.png",
    },
    {
      id: 7,
      name: "Иван Карп",
      localEventRole: "Поставщик",
      globalEventRole: "организатор",
      location: "Сочи",
      image: "/img/team1.png",
    },
    {
      id: 8,
      name: "Иван Платов",
      localEventRole: "Диджей",
      globalEventRole: "организатор",
      location: "Ростов",
      image: "/img/team2.png",
    },
    {
      id: 9,
      name: "Иван Карп",
      localEventRole: "Менеджер",
      globalEventRole: "участник",
      location: "Москва",
      image: "/img/team1.png",
    },
    {
      id: 10,
      name: "Иван Карп",
      localEventRole: "Менеджер",
      globalEventRole: "участник",
      location: "Москва",
      image: "/img/team.png",
    },
    {
      id: 11,
      name: "Иван Карп",
      localEventRole: "Менеджер",
      globalEventRole: "участник",
      location: "Москва",
      image: "/img/team2.png",
    },
    {
      id: 12,
      name: "Иван Карп",
      localEventRole: "Менеджер",
      globalEventRole: "участник",
      location: "Москва",
      image: "/img/team1.png",
    },
    {
      id: 13,
      name: "саша серый",
      localEventRole: "Менеджер",
      globalEventRole: "участник",
      location: "Москва",
      image: "/img/team2.png",
    },
    {
      id: 14,
      name: "анастасия иванова",
      localEventRole: "Менеджер",
      globalEventRole: "участник",
      location: "Москва",
      image: "/img/team1.png",
    },
    {
      id: 15,
      name: "Иван Карп",
      localEventRole: "Менеджер",
      globalEventRole: "участник",
      location: "Москва",
      image: "/img/team.png",
    },
  ];

  const [visibleMembers, setVisibleMembers] = useState(9);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredMembers = teamMembers.filter((member) => {
    const matchesSearch = member.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesRole =
      activeFilter === "all" ||
      (activeFilter === "organizer" &&
        member.globalEventRole.toLowerCase() === "организатор") ||
      (activeFilter === "participant" &&
        member.globalEventRole.toLowerCase() === "участник");

    return matchesSearch && matchesRole;
  });

  const membersToShow = filteredMembers.slice(0, visibleMembers);
  const hasMore = visibleMembers < filteredMembers.length;

  const loadMore = () => {
    setVisibleMembers((prev) => prev + 9);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setVisibleMembers(9);
  };

  const handleFilterClick = (filterType) => {
    setActiveFilter(filterType);
    setVisibleMembers(9);
  };

  return (
    <>
      <Header />
      <div className="container">
        <div className={styles.filter}>
          <nav className={styles.nav}>
            <ul>
              <li
                onClick={() => handleFilterClick("all")}
                className={activeFilter === "all" ? styles.active : ""}
              >
                Все
              </li>
            </ul>
            <ul>
              <li
                onClick={() => handleFilterClick("organizer")}
                className={activeFilter === "organizer" ? styles.active : ""}
              >
                Организаторы
              </li>
            </ul>
            <ul>
              <li
                onClick={() => handleFilterClick("participant")}
                className={activeFilter === "participant" ? styles.active : ""}
              >
                Участники
              </li>
            </ul>
          </nav>
          <button>
            <span>Пригласить участников</span>
          </button>
        </div>
        <div
          className={`${styles.search} ${searchTerm && styles.searchFocused}`}
        >
          <img
            className={styles.searchIcon}
            src="/img/search.svg"
            alt="поиск"
          />
          <input
            type="search"
            placeholder="Введите имя участника"
            value={searchTerm}
            onChange={handleSearchChange}
            onFocus={() =>
              document
                .querySelector(`.${styles.search}`)
                .classList.add(styles.searchFocused)
            }
            onBlur={() =>
              document
                .querySelector(`.${styles.search}`)
                .classList.remove(styles.searchFocused)
            }
          />
        </div>
        <div className={styles.cards}>
          {membersToShow.length > 0 ? (
            membersToShow.map((member) => (
              <div key={member.id} className={styles.card}>
                <div className={styles.text}>
                  <h3>{member.name}</h3>
                  <p>{member.localEventRole}</p>
                  <p>Город: {member.location}</p>
                  <button>
                    <span>посмотреть профиль</span>
                  </button>
                </div>
                <div className={styles.image}>
                  <img src={member.image} alt={member.name} />
                </div>
                <button className={styles.delete}>X</button>
                <button className={styles.add}>
                  <span>В контакты</span>
                </button>
              </div>
            ))
          ) : (
            <p className={styles.noResults}>Участники не найдены</p>
          )}
        </div>
        {hasMore && (
          <div className={styles.loadMoreContainer}>
            <button onClick={loadMore}>Показать еще</button>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
