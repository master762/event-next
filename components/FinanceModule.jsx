// app/event/[id]/finance/page.jsx
"use client";
import { useEffect, useState } from "react";
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
import { useParams } from "next/navigation";

export default function Page() {
  const { id } = useParams();
  const [financeData, setFinanceData] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`/api/event-finance?eventId=${id}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("financeData:", data);
          setFinanceData(data);
        });
    }
  }, [id]);

  if (!financeData) {
    return <p>Загрузка финансов...</p>;
  }

  const chartData = Object.entries(financeData.expensesByMonth).map(
    ([month, value]) => {
      const readableMonth = new Date(month + "-01").toLocaleString("ru-RU", {
        month: "short",
      });
      return {
        name: readableMonth.charAt(0).toUpperCase() + readableMonth.slice(1),
        value,
      };
    }
  );

  return (
    <section>
      <div className={styles.title}>
        <h2>Финансовый модуль</h2>
      </div>
      <div className={styles.financeBacground}>
        <div className={styles.financeContainer}>
          <div className={styles.overwiew}>
            <div className={styles.balance}>
              <div className={styles.image}>
                <img src="/img/wallet.svg" alt="wallet" />
              </div>
              <div className={styles.info}>
                <p>Расход</p>
                <p>-{financeData.totalExpenses.toLocaleString()}₽</p>
              </div>
            </div>
            <div className={styles.expenses}>
              <div className={styles.image}>
                <img src="/img/card.svg" alt="card" />
              </div>
              <div className={styles.info}>
                <p>Всего средств</p>
                <p>{financeData.remainingBudget.toLocaleString()}₽</p>
              </div>
            </div>
            {chartData.length === 0 ? (
              <p style={{ color: "#fff" }}>Нет данных для графика</p>
            ) : (
              <div className={styles.graph}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
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
                      contentStyle={{
                        backgroundColor: "#222",
                        border: "none",
                      }}
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
                      name="Расходы"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
