"use client";
import React, { useState, useEffect } from "react";
import styles from "@/styles/signin.module.css";

export default function LoginForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    policyAccepted: false,
  });

  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Введите имя";
    if (!form.email.trim()) newErrors.email = "Введите почту";
    else if (!emailRegex.test(form.email))
      newErrors.email = "Некорректный email";
    if (!form.password.trim()) newErrors.password = "Введите пароль";
    if (!form.policyAccepted)
      newErrors.policyAccepted = "Нужно согласиться с политикой";

    setErrors(newErrors);
    setIsValid(Object.keys(newErrors).length === 0);
  }, [form]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    const newErrors = { ...errors };
    if (!form[name].trim()) {
      newErrors[name] = `${
        name === "policyAccepted" ? "Политика" : name
      } обязательна`;
    } else {
      delete newErrors[name];
    }
    setErrors(newErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;

    console.log("Форма отправлена:", form);
  };

  return (
    <>
      <div className="container">
        <div className={styles.background}></div>
        <header className={styles.elements}>
          <img src="/img/logo.svg" alt="Логотип" />
          <button type="button">
            <span>Регистрация</span>
          </button>
        </header>
        <main>
          <form className={styles.form} onSubmit={handleSubmit}>
            <h2 className={styles.title}>Войти</h2>
            {/* Email */}
            <div className={styles.inputGroup}>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder=" "
                value={form.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.email ? styles.inputError : ""}
              />
              <label htmlFor="email">Электронная почта</label>
              {errors.email && (
                <span className={styles.error}>{errors.email}</span>
              )}
            </div>

            {/* Password */}
            <div className={styles.inputGroup}>
              <input
                type="password"
                id="password"
                name="password"
                required
                placeholder=" "
                value={form.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.password ? styles.inputError : ""}
              />
              <label htmlFor="password">Пароль</label>
              {errors.password && (
                <span className={styles.error}>{errors.password}</span>
              )}
            </div>

            {/* Policy */}
            <div className={styles.policy}>
              <input
                type="checkbox"
                id="policy"
                name="policyAccepted"
                checked={form.policyAccepted}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.policyAccepted ? styles.inputError : ""}
              />
              <label htmlFor="policy">
                <a href="/">Я принимаю политику конфиденциальности</a>
              </label>
            </div>
            {errors.policyAccepted && (
              <span className={styles.error}>{errors.policyAccepted}</span>
            )}

            {/* Submit button */}
            <button
              type="submit"
              className={styles.createAccount}
              disabled={!isValid}
            >
              <span>Продолжить</span>
            </button>

            <p className={styles.or}>Войти через</p>
            <div className={styles.providers}>
              <button type="button">
                <img src="/img/google.svg" alt="Войти через Google" />
              </button>
              <button type="button">
                <img src="/img/Apple.svg" alt="Войти через Apple" />
              </button>
              <button type="button">
                <img src="/img/facebook.svg" alt="Войти через Facebook" />
              </button>
            </div>
          </form>
        </main>
      </div>
      <footer>
        <p className={styles.copyright}>©2025 Все права защищены.</p>
      </footer>
    </>
  );
}
