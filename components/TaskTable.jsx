"use client";
import styles from "@/styles/TaskTable.module.css";
import { useState } from "react";

const initialTasks = [
  {
    id: 1,
    name: "Задача 1",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    status: "активна",
    expenses: 7000,
    allocated: -5070,
  },
  {
    id: 2,
    name: "Задача 2",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    status: "выполнено",
    expenses: 2000,
    allocated: 1800,
  },
];

export default function TaskTable() {
  const [tasks, setTasks] = useState(initialTasks);
  const [selected, setSelected] = useState([]);

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <span>Выбрано: {selected.length}</span>
        {selected.length > 0 && (
          <button className={styles.deleteBtn}>🗑️</button>
        )}
        <button className={styles.addBtn}>+ Добавить задачу</button>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>#</th>
            <th>Название</th>
            <th>Описание</th>
            <th>Статус</th>
            <th>Расходы</th>
            <th>Выделено</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={task.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selected.includes(task.id)}
                  onChange={() => toggleSelect(task.id)}
                />
                {task.id}
              </td>
              <td>{task.name}</td>
              <td className={styles.description}>{task.description}</td>
              <td>
                <span
                  className={
                    task.status === "активна" ? styles.active : styles.completed
                  }
                >
                  {task.status}
                </span>
              </td>
              <td>{task.expenses}₽</td>
              <td style={{ color: task.allocated < 0 ? "red" : "green" }}>
                {task.allocated}₽
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.pagination}>1–3</div>
    </div>
  );
}
