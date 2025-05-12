import Footer from "@/components/Footer";
import Image from "next/image";
import Header from "@/components/Header";
import React from "react";
import styles from "@/styles/mainPage.module.css";
import Developers from "@/components/Developers";

export default function Page() {
  return (
    <>
      <Header />
      <section className={styles.section}>
        <div className={styles.aboutSectionTitle} data-aos="fade-down">
          <h2>О нас</h2>
        </div>
        <div className="container">
          <div
            className={styles.aboutItem}
            data-aos="fade-right"
            data-aos-delay="100"
          >
            <p className={styles.aboutText}>
              Мы - сайт для организации мероприятий с возможностью совместного
              планирования в реальном времени.
            </p>
            <Image
              src="/img/image.png"
              alt="Логотип"
              width={642}
              height={429}
              data-aos="zoom-in"
            />
          </div>
          <div
            className={styles.aboutItem}
            data-aos="fade-left"
            data-aos-delay="100"
          >
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
              data-aos="zoom-in"
            />
          </div>
        </div>
      </section>

      <section className={styles.strengthsSection}>
        <div className={styles.strengthsWrapper}>
          <div className={styles.strengthsContent} data-aos="fade-up">
            <h2>Наши сильные стороны</h2>
            <div className={styles.strengthsBox}>
              <div className={styles.strengthsRow}>
                <div
                  className={styles.strengthsItem}
                  data-aos="flip-left"
                  data-aos-delay="200"
                >
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
                <div
                  className={styles.strengthsItem}
                  data-aos="flip-right"
                  data-aos-delay="300"
                >
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

              <div
                className={styles.strengthsBottom}
                data-aos="zoom-in-up"
                data-aos-delay="400"
              >
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
          <div
            className={styles.right}
            data-aos="fade-left"
            data-aos-delay="500"
          >
            <Image
              src="/img/image3.png"
              alt="Логотип"
              width={591}
              height={887}
              className={styles.image}
            />
          </div>
        </div>
      </section>
      <Developers showManyCard={false} />
      <Footer />
    </>
  );
}
