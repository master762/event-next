import React from "react";
import styles from "@/styles/footer.module.css";
import Link from "next/link";
import Image from "next/image";
export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <nav className={styles.grid}>
          <ul className={styles.column}>
            <li>
              <Link href="/">Главная</Link>
            </li>
            <li>
              <Link href="/about">О нас</Link>
            </li>
            <li>
              <Link href="/popular">Поп. мероприятия</Link>
            </li>
          </ul>
          <ul className={styles.column}>
            <li>О компании</li>
            <li>Связь</li>
            <li>Описание проекта</li>
            <li>Команда разработчиков</li>
          </ul>
          <ul className={styles.column}>
            <li>Панель управления</li>
            <li>Мои мероприятия</li>
            <li>Работа с задачами</li>
            <li>Управление бюджетом</li>
            <li>Таймлайн</li>
            <li>Подрядчики</li>
          </ul>
          <ul className={styles.column}>
            <li>Интеграции</li>
            <li>Платёжные системы</li>
            <li>Интеграция с календарями</li>
            <li>Сервисы для приглашений</li>
          </ul>
          <ul className={styles.column}>
            <li>Обратная связь</li>
            <li>FAQ’s</li>
            <li>Чат поддержки</li>
          </ul>
        </nav>
      </div>
      <div className={styles.bottomFooter}>
        <p>© {new Date().getFullYear()} EventMaster. Все права защищены.</p>
        <div className={styles.icons}>
          <div>
            <Image
              src="/img/Facebook.svg"
              alt="фейсбук"
              width={24}
              height={24}
            />
          </div>
          <div>
            <Image src="/img/Inst.svg" alt="инстаграм" width={24} height={24} />
          </div>
          <div>
            <Image
              src="/img/Twitter.svg"
              alt="твиттер"
              width={24}
              height={24}
            />
          </div>
          <div>
            <Image src="/img/Youtube.svg" alt="ютуб" width={24} height={24} />
          </div>
        </div>
      </div>
    </footer>
  );
}
