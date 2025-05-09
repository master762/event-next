"use client";
import React, { useState } from "react";
import styles from "@/styles/header.module.css";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <header
      className={styles.header}
      data-aos="fade-down"
      data-aos-duration="500"
    >
      {/* Логотип с анимацией */}
      <Link href="/" data-aos="fade-right" data-aos-delay="100">
        <Image src="/img/logo.svg" alt="Логотип" width={136} height={37} />
      </Link>

      {/* Навигация */}
      <nav>
        <ul className={styles.nav}>
          <li
            className={styles.dropdown}
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
            data-aos="fade-down"
            data-aos-delay="200"
          >
            <div className={styles.dropdownTrigger}>
              <Image src="/img/arrow.svg" alt="список" width={15} height={15} />
              <span>Личный кабинет</span>
            </div>
            {isDropdownOpen && (
              <ul className={styles.dropdownMenu}>
                <li>
                  <Link href="/profile">Профиль</Link>
                </li>
                <li>
                  <Link href="/contacts">Мои контакты</Link>
                </li>
                <li>
                  <Link href="/events">Мои мероприятия</Link>
                </li>
              </ul>
            )}
          </li>

          {/* Пункты меню с последовательной анимацией */}
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
        <Image
          className={styles.notifications}
          src="/img/notifications.svg"
          alt="Уведомления"
          width={32}
          height={32}
          data-aos="fade-left"
          data-aos-delay="350"
        />

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
