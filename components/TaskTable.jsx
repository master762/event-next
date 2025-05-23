"use client";
import { useEffect, useState } from "react";
import styles from "@/styles/TaskTable.module.css";

export default function EventTaskTable({ eventId }) {
  const [tasks, setTasks] = useState([]);
  const [selected, setSelected] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    expenses: "",
  });
  const [filters, setFilters] = useState({
    title: "",
    description: "",
    status: "",
    expenses: "",
  });

  useEffect(() => {
    fetch(`/api/event-task?eventId=${eventId}`)
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, [eventId]);

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleAddTask = async () => {
    const res = await fetch("/api/event-task", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        status: "активна",
        eventId: Number(eventId),
      }),
    });
    const newTask = await res.json();
    setTasks((prev) => [...prev, newTask]);
    setForm({ title: "", description: "", expenses: "" });
  };

  const handleDeleteSelected = async () => {
    await Promise.all(
      selected.map((id) =>
        fetch(`/api/event-task?id=${id}`, { method: "DELETE" })
      )
    );
    setTasks((prev) => prev.filter((task) => !selected.includes(task.id)));
    setSelected([]);
  };

  const handleMarkCompleted = async () => {
    await Promise.all(
      selected.map((id) =>
        fetch("/api/event-task", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id, status: "выполнено" }),
        })
      )
    );
    setTasks((prev) =>
      prev.map((task) =>
        selected.includes(task.id) ? { ...task, status: "выполнено" } : task
      )
    );
    setSelected([]);
  };

  const filteredTasks = tasks.filter((task) => {
    return (
      task.title.toLowerCase().includes(filters.title.toLowerCase()) &&
      task.description
        .toLowerCase()
        .includes(filters.description.toLowerCase()) &&
      (filters.status ? task.status === filters.status : true) &&
      (filters.expenses ? task.expenses <= Number(filters.expenses) : true)
    );
  });

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <span>Выбрано: {selected.length}</span>
        {selected.length > 0 && (
          <div>
            <button
              className={styles.completeBtn}
              onClick={handleMarkCompleted}
            >
              ✅ Выполнено
            </button>
            <button className={styles.deleteBtn} onClick={handleDeleteSelected}>
              🗑️ Удалить
            </button>
          </div>
        )}
      </div>

      <div className={styles.form}>
        <input
          type="text"
          placeholder="Название"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Описание"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <input
          type="number"
          placeholder="Расходы"
          value={form.expenses}
          onChange={(e) =>
            setForm({ ...form, expenses: Number(e.target.value) })
          }
        />
        <button className={styles.addBtn} onClick={handleAddTask}>
          + Добавить
        </button>
      </div>

      <div className={styles.filters}>
        <input
          type="text"
          placeholder="Фильтр по названию"
          value={filters.title}
          onChange={(e) => setFilters({ ...filters, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Фильтр по описанию"
          value={filters.description}
          onChange={(e) =>
            setFilters({ ...filters, description: e.target.value })
          }
        />
        <select
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        >
          <option value="">Все статусы</option>
          <option value="активна">Активна</option>
          <option value="выполнено">Выполнено</option>
        </select>
        <input
          type="number"
          placeholder="Макс. расходы"
          value={filters.expenses}
          onChange={(e) => setFilters({ ...filters, expenses: e.target.value })}
        />
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>#</th>
            <th>Название</th>
            <th>Описание</th>
            <th>Статус</th>
            <th>Расходы</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.map((task, index) => (
            <tr key={task.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selected.includes(task.id)}
                  onChange={() => toggleSelect(task.id)}
                />{" "}
                {index + 1}
              </td>
              <td>{task.title}</td>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
