"use client";
import React, { useState } from "react";
import styles from "@/styles/header.module.css";
import Image from "next/image";
import Link from "next/link";
export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  return (
    <header className={styles.header}>
      <Link href="/">
        <Image src="/img/logo.svg" alt="Логотип" width={136} height={37} />
      </Link>
      <nav>
        <ul className={styles.nav}>
          <li
            className={styles.dropdown}
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
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
          <li>
            <Link href="/chat">Мессенджер</Link>
          </li>
          <li>
            <Link href="/">Главная</Link>
          </li>
        </ul>
      </nav>
      <div className={styles.right}>
        <Image
          className={styles.notifications}
          src="/img/notifications.svg"
          alt="Уведомления"
          width={32}
          height={32}
        />
        <div className={styles.buttons}>
          <button className={styles.outlined}>Создать мероприятие</button>
          <button className={styles.filled}>Регистрация</button>
        </div>
      </div>
    </header>
  );
}
