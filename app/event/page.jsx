"use client";
import Header from "@/components/Header";
import React from "react";
import Footer from "@/components/Footer";
import styles from "@/styles/event.module.css";
import { FaUser, FaDesktop, FaBuilding, FaUtensils } from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import TaskTable from "@/components/TaskTable";
const paymentData = [
  { icon: <FaUser />, label: "Поставщики", value: 3241, max: 10000 },
  { icon: <FaDesktop />, label: "Устройства и ПО", value: 241, max: 250 },
  { icon: <FaBuilding />, label: "Аренда помещения", value: 1541, max: 52000 },
  { icon: <FaUtensils />, label: "Еда", value: 141, max: 1000 },
];
const data = [
  { name: "Янв", value: 32000 },
  { name: "Фев", value: 67000 },
  { name: "Мар", value: 5000 },
  { name: "Апр", value: 18000 },
  { name: "Май", value: 34000 },
  { name: "Июн", value: 31000 },
  { name: "Июл", value: 27000 },
  { name: "Авг", value: 15000 },
  { name: "Сен", value: 40000 },
  { name: "Окт", value: 87000 },
  { name: "Ноя", value: 3000 },
  { name: "Дек", value: 33000 },
];
export default function page() {
  const days = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
  const hours = Array.from({ length: 13 }, (_, i) => 7 + i);

  const formatTime = (h) => `${String(h).padStart(2, "0")}:00`;
  return (
    <>
      <Header />
      <nav className={styles.navigate}>
        <ul>
          <li>
            <img src="/img/info.svg" alt="" />
            <p>Обшая информация</p>
          </li>
        </ul>
        <ul>
          <li>
            <img src="/img/team.svg" alt="" />
            <p>Участники</p>
          </li>
        </ul>
        <ul>
          <li>
            <img src="/img/task.svg" alt="" />
            <p>Задачи</p>
          </li>
        </ul>
      </nav>
      {/* инфа о мероприятии */}
      <section>
        <div className="container">
          <div
            className={styles.background}
            style={{ backgroundImage: "url(/img/svadba.png)" }}
          >
            <div className={styles.text}>
              <h3>Свадебная церемония</h3>
              <p>
                Сва́дьба, сва́дебный обря́д, свадебный ритуал — один из семейных
                обрядов, оформляющий вступление в брак. Социальное значение его
                сводится к созданию новой семьи, установлению родства, изменению
                семейно-возрастного положения и публичному признанию статуса
                брачующихся. Относится к наиболее сложно организованным обрядам.
              </p>
              <button>
                <span>изменить данные</span>
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* таймлайны, таблица */}
      <section>
        <div className={styles.title}>
          <h2>Таймлайн на неделю</h2>
        </div>
        <div className="container">
          <div className={styles.scheduleWrapper}>
            <div className={styles.dataTable}>
              <div className={styles.headerEmpty}></div>
              {days.map((day, i) => (
                <div key={i} className={styles.headerCell}>
                  {day}
                </div>
              ))}

              {hours.map((hour) => (
                <div key={`row-${hour}`} className={styles.row}>
                  <div className={styles.timeCell}>{formatTime(hour)}</div>
                  {days.map((day, dayIndex) => {
                    const key = `${day}-${hour}`;

                    // Презентация: Пн 11:00–13:00
                    if (day === "Пн" && hour === 11) {
                      return (
                        <div
                          key={key}
                          className={`${styles.cell} ${styles.orangeCell}`}
                          style={{ gridRow: "span 2" }}
                        >
                          Презентация
                        </div>
                      );
                    }

                    if (day === "Пн" && hour === 12) {
                      return null;
                    }

                    // Встреча поставщиков: Чт 15:00–17:00
                    if (day === "Чт" && hour === 15) {
                      return (
                        <div
                          key={key}
                          className={`${styles.cell} ${styles.greenCell}`}
                          style={{ gridRow: "span 2" }}
                        >
                          Встреча
                          <br />
                          поставщиков
                        </div>
                      );
                    }

                    if (day === "Чт" && hour === 16) {
                      return null;
                    }

                    return <div key={key} className={styles.cell}></div>;
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* задачи, таблица */}
      <section>
        <div className={styles.title}>
          <h2>Общие задачи</h2>
        </div>
        <div className="container">
          <TaskTable />
        </div>
      </section>
      {/* финансовый модуль */}
      <section>
        <div className={styles.title}>
          <h2>Финансовый модуль</h2>
        </div>
        <div className={styles.financeBacground}>
          <div className={styles.financeContainer}>
            <div className={styles.overwiew}>
              <div className={styles.balance}>
                <div className={styles.image}>
                  <img src="/img/wallet.svg" alt="" />
                </div>
                <div className={styles.info}>
                  <p>Расход</p>
                  <p>41.210₽</p>
                </div>
              </div>
              <div className={styles.expenses}>
                <div className={styles.image}>
                  <img src="/img/card.svg" alt="" />
                </div>
                <div className={styles.info}>
                  <p>Всего средств</p>
                  <p>34.253₽</p>
                </div>
              </div>
              <div className={styles.graph}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data}>
                    <CartesianGrid stroke="#444" strokeDasharray="5 5" />
                    <XAxis dataKey="name" tick={{ fill: "#ccc" }} />
                    <YAxis
                      tickFormatter={(value) => `${value.toLocaleString()}₽`}
                      tick={{ fill: "#ccc" }}
                    />
                    <Tooltip
                      formatter={(value) => `${value.toLocaleString()}₽`}
                      labelStyle={{ color: "#fff" }}
                      contentStyle={{ backgroundColor: "#222", border: "none" }}
                      itemStyle={{ color: "#ffc107" }}
                    />
                    <Legend
                      verticalAlign="top"
                      align="right"
                      iconType="circle"
                      wrapperStyle={{ color: "#fff" }}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#ffc107"
                      strokeWidth={2}
                      dot={false}
                      name="Баланс"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className={styles.payment}>
              <p>Платежи</p>
              <div className={styles.paymentList}>
                {paymentData.map(({ icon, label, value, max }, index) => (
                  <div key={index} className={styles.paymentItem}>
                    <div className={styles.icon}>{icon}</div>
                    <div className={styles.info}>
                      <div className={styles.label}>{label}</div>
                      <div className={styles.amount}>
                        {value.toLocaleString("ru-RU")}₽/
                        <span>{max.toLocaleString("ru-RU")}₽</span>
                      </div>
                      <div className={styles.progress}>
                        <div
                          className={styles.bar}
                          style={{ width: `${(value / max) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.credit}>
              <div className={styles.cardTitle}>
                <p>Карта</p>
                <button>
                  <span>+</span>
                </button>
              </div>
              <div className={styles.creditCard}>
                <div className={styles.cardHeader}>
                  <p>3475 7381 3759 ****</p>
                </div>
                <div className={styles.cardBody}>
                  <div>
                    <p>Баланс</p>
                    <p>3,215,352 USD</p>
                  </div>
                  <div>
                    <p>Дата выдачи</p>
                    <p>04 / 24</p>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.transactions}>
              <p className={styles.transactionsTitle}>Недавние транзакции</p>
              <div className={styles.transaction}>
                <img src="/img/Avatar.png" alt="" />
                <div className={styles.description}>
                  <div>
                    <p className={styles.name}>Кейтеринг</p>
                    <p className={styles.name}>Анна </p>
                  </div>
                  <p className={styles.price}>-10.208₽</p>
                </div>
              </div>
              <div className={styles.transaction}>
                <img src="/img/Avatar2.png" alt="" />
                <div className={styles.description}>
                  <div>
                    <p className={styles.role}>Арендадатель</p>
                    <p className={styles.name}>Влад </p>
                  </div>
                  <p className={styles.price}>-24.465₽</p>
                </div>
              </div>
              <div className={styles.transaction}>
                <img src="/img/Avatar3.png" alt="" />
                <div className={styles.description}>
                  <div>
                    <p className={styles.role}>Музыкант</p>
                    <p className={styles.name}>Александр </p>
                  </div>
                  <p className={styles.price}>-5.000₽</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
