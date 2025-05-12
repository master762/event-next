"use client";
import React, { useState, useEffect } from "react";
import styles from "@/styles/login.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function LoginForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    policyAccepted: false,
  });

  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");

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
    const { name, type } = e.target;
    const newErrors = { ...errors };

    if (type === "checkbox") {
      // Для чекбокса просто проверяем значение
      if (!form[name]) {
        newErrors[name] = "Нужно согласиться с политикой";
      } else {
        delete newErrors[name];
      }
    } else {
      // Для текстовых полей проверяем trim()
      if (!form[name].trim()) {
        newErrors[name] = `Поле обязательно для заполнения`;
      } else {
        delete newErrors[name];
      }
    }

    setErrors(newErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid) return;

    setIsLoading(true);
    setApiError("");

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Ошибка регистрации");
      }

      // Автоматический вход после регистрации
      const signInResult = await signIn("credentials", {
        email: form.email,
        password: form.password,
        redirect: false,
      });

      if (signInResult?.error) {
        setApiError(signInResult.error);
      } else {
        router.push("/profile");
      }
    } catch (error) {
      setApiError(error.message);
      console.error("Registration error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleProviderSignIn = (provider) => {
    signIn(provider, { callbackUrl: "/profile" });
  };

  return (
    <>
      <div className="container">
        <div className={styles.background}></div>
        <header className={styles.elements}>
          <Link href="/">
            <img src="/img/logo.svg" alt="Логотип" />
          </Link>
          <Link href="/signin">
            <button type="button">
              <span>Войти</span>
            </button>
          </Link>
        </header>
        <main>
          <form className={styles.form} onSubmit={handleSubmit}>
            <h2 className={styles.title}>Зарегистрироваться</h2>

            {apiError && <div className={styles.apiError}>{apiError}</div>}

            {/* Name */}
            <div className={styles.inputGroup}>
              <input
                type="text"
                id="name"
                name="name"
                required
                placeholder=" "
                value={form.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.name ? styles.inputError : ""}
              />
              <label htmlFor="name">Имя</label>
              {errors.name && (
                <span className={styles.error}>{errors.name}</span>
              )}
            </div>

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
              disabled={!isValid || isLoading}
            >
              <span>{isLoading ? "Регистрация..." : "Создать аккаунт"}</span>
            </button>

            <p className={styles.or}>Или</p>
            <div className={styles.providers}>
              <button
                type="button"
                onClick={() => handleProviderSignIn("google")}
              >
                <img src="/img/google.svg" alt="Войти через Google" />
              </button>
              <button
                type="button"
                onClick={() => handleProviderSignIn("apple")}
              >
                <img src="/img/Apple.svg" alt="Войти через Apple" />
              </button>
              <button
                type="button"
                onClick={() => handleProviderSignIn("facebook")}
              >
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
