"use client";
import React, { useState, useRef, useEffect } from "react";
import styles from "@/styles/header.module.css";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);

  // Закрытие при клике вне меню
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 300);
  };

  return (
    <header
      className={styles.header}
      data-aos="fade-down"
      data-aos-duration="500"
    >
      {/* Логотип */}
      <Link href="/" data-aos="fade-right" data-aos-delay="100">
        <Image
          src="/img/logo.svg"
          alt="Логотип"
          width={136}
          height={37}
          priority
        />
      </Link>

      {/* Основная навигация */}
      <nav>
        <ul className={styles.nav}>
          <li
            className={styles.dropdownContainer}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            ref={dropdownRef}
            data-aos="fade-down"
            data-aos-delay="200"
          >
            <div className={styles.dropdownTrigger}>
              <Image
                src="/img/arrow.svg"
                alt="Меню"
                width={15}
                height={15}
                className={isDropdownOpen ? styles.arrowRotated : ""}
              />
              <span>Личный кабинет</span>
            </div>

            {isDropdownOpen && (
              <ul
                className={styles.dropdownMenu}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <li>
                  <Link
                    href="/profile"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Профиль
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contacts"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Мои контакты
                  </Link>
                </li>
                <li>
                  <Link href="/events" onClick={() => setIsDropdownOpen(false)}>
                    Мои мероприятия
                  </Link>
                </li>
              </ul>
            )}
          </li>

          <li data-aos="fade-down" data-aos-delay="250">
            <Link href="/chat">Мессенджер</Link>
          </li>
          <li data-aos="fade-down" data-aos-delay="300">
            <Link href="/">Главная</Link>
          </li>
        </ul>
      </nav>

      {/* Правая часть хедера */}
      <div className={styles.right}>
        <button
          className={styles.notificationBtn}
          data-aos="fade-left"
          data-aos-delay="350"
        >
          <Image
            src="/img/notifications.svg"
            alt="Уведомления"
            width={24}
            height={24}
          />
        </button>

        <div className={styles.buttons}>
          <button
            className={styles.outlined}
            data-aos="fade-left"
            data-aos-delay="400"
          >
            Создать мероприятие
          </button>

          <Link href="/login" data-aos="fade-left" data-aos-delay="450">
            <button className={styles.filled}>Регистрация</button>
          </Link>
        </div>
      </div>
    </header>
  );
}
