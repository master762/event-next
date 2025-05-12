"use client";
import React, { useState, useEffect } from "react";
import styles from "@/styles/signin.module.css";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
    policyAccepted: false,
  });

  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState("");

  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const newErrors = {};
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
    // Очищаем ошибку при изменении поля
    if (authError) setAuthError("");
  };

  const handleBlur = (e) => {
    const { name, type } = e.target;
    const newErrors = { ...errors };

    if (type === "checkbox") {
      if (!form[name]) {
        newErrors[name] = "Нужно согласиться с политикой";
      } else {
        delete newErrors[name];
      }
    } else {
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
    setAuthError("");

    try {
      const result = await signIn("credentials", {
        email: form.email,
        password: form.password,
        redirect: false,
      });

      if (result?.error) {
        setAuthError("Неверный email или пароль");
      } else {
        router.push("/profile");
      }
    } catch (error) {
      setAuthError("Ошибка при входе. Попробуйте позже.");
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleProviderLogin = (provider) => {
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
          <Link href="/login">
            <button type="button">
              <span>Регистрация</span>
            </button>
          </Link>
        </header>
        <main>
          <form className={styles.form} onSubmit={handleSubmit}>
            <h2 className={styles.title}>Войти</h2>

            {authError && <div className={styles.authError}>{authError}</div>}

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
              <span>{isLoading ? "Вход..." : "Продолжить"}</span>
            </button>

            <p className={styles.or}>Войти через</p>
            <div className={styles.providers}>
              <button
                type="button"
                onClick={() => handleProviderLogin("google")}
                disabled={isLoading}
              >
                <img src="/img/google.svg" alt="Войти через Google" />
              </button>
              <button
                type="button"
                onClick={() => handleProviderLogin("apple")}
                disabled={isLoading}
              >
                <img src="/img/Apple.svg" alt="Войти через Apple" />
              </button>
              <button
                type="button"
                onClick={() => handleProviderLogin("facebook")}
                disabled={isLoading}
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
