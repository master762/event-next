import React from "react";
import styles from "@/styles/developers.module.css";
export default function Developers() {
  return (
    <div>
      <section className="container">
        <h2 className={styles.TeamTitle}>Команда разработчиков</h2>
        <div className={styles.cards}>
          <div className={styles.card}>
            <div
              className={styles.image}
              style={{ backgroundImage: "url(/img/image4.png)" }}
            >
              <a
                href="https://t.me/Kotory_d"
                target="_blank"
                rel="noopener noreferrer nofollow"
                title="нажмите, что бы перейти в телеграм"
              >
                <img src="/img/telegram.svg" alt="телеграм" />
              </a>
            </div>
            <div className={styles.cardText}>
              <h3>Красота Дмитрий</h3>
              <p>Разработчик</p>
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
          <div className={styles.card}>
            <div
              className={styles.image}
              style={{ backgroundImage: "url(/img/ilya.png)" }}
            >
              <a
                href="https://t.me/Frazen_0"
                target="_blank"
                rel="noopener noreferrer nofollow"
                title="нажмите, что бы перейти в телеграм"
              >
                <img src="/img/telegram.svg" alt="телеграм" />
              </a>
            </div>
            <div className={styles.cardText}>
              <h3>Своеволин Илья</h3>
              <p>UX/UI Дизайнер</p>
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
          <div className={styles.card}>
            <div
              className={styles.image}
              style={{ backgroundImage: "url(/img/kostya.png)" }}
            >
              <a
                href="https://t.me/kiseeii"
                target="_blank"
                rel="noopener noreferrer nofollow"
                title="нажмите, что бы перейти в телеграм"
              >
                <img src="/img/telegram.svg" alt="телеграм" />
              </a>
            </div>
            <div className={styles.cardText}>
              <h3>Губарь Константин</h3>
              <p>Фото/Видеоредактор</p>
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
        </div>
      </section>
    </div>
  );
}
