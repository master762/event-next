import Footer from "@/components/Footer";
import Image from "next/image";
import Header from "@/components/Header";
import React from "react";
import styles from "@/styles/mainPage.module.css";

export default function Page() {
  return (
    <>
      <Header />
      <section>
        <div className={styles.aboutSectionTitle}>
          <h2>О нас</h2>
        </div>
        <div className="container">
          <div className={styles.aboutItem}>
            <p className={styles.aboutText}>
              Мы - сайт для организации мероприятий с возможностью совместного
              планирования в реальном времени.
            </p>
            <Image
              src="/img/image.png"
              alt="Логотип"
              width={642}
              height={429}
            />
          </div>
          <div className={styles.aboutItem}>
            <p className={styles.aboutText}>
              Несколько организаторов (например, декоратор, кейтеринг, ведущий)
              могут работать над одним мероприятием, видя общий таймлайн, бюджет
              и задачи.
            </p>
            <Image
              src="/img/image2.png"
              alt="Логотип"
              width={642}
              height={429}
            />
          </div>
        </div>
      </section>

      <section className={styles.strengthsSection}>
        <div className={styles.strengthsWrapper}>
          <div className={styles.strengthsContent}>
            <h2>Наши сильные стороны</h2>
            <div className={styles.strengthsBox}>
              <div className={styles.strengthsRow}>
                <div className={styles.strengthsItem}>
                  <p>
                    Совместное планирование <br /> в реальном времени.
                  </p>
                  <div className={styles.strengthsIcon}>
                    <Image
                      src="/img/icon.svg"
                      alt="иконка"
                      width={34}
                      height={34}
                    />
                  </div>
                </div>
                <div className={styles.strengthsSeparator}></div>
                <div className={styles.strengthsItem}>
                  <div className={styles.strengthsIcon}>
                    <Image
                      src="/img/icon1.svg"
                      alt="иконка"
                      width={34}
                      height={34}
                    />
                  </div>
                  <p>
                    Общий таймлайн, <br />
                    бюджет <br /> и задачи.
                  </p>
                </div>
              </div>

              <div className={styles.strengthsBottom}>
                <div className={styles.strengthsIcon}>
                  <Image
                    src="/img/icon2.svg"
                    alt="иконка"
                    width={34}
                    height={34}
                  />
                </div>
                <p>
                  Множество организаторов, работающих над одним мероприятием.
                </p>
              </div>
            </div>
          </div>
          <div className={styles.right}>
            <Image
              src="/img/image3.png"
              alt="Логотип"
              width={591}
              height={887}
            />
          </div>
        </div>
      </section>
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
      <Footer />
    </>
  );
}
