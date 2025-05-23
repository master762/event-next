"use client";
import styles from "@/styles/event.module.css";
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
  return (
    <>
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
                      width={90}
                      tickMargin={7}
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
          </div>
        </div>
      </section>
    </>
  );
}
