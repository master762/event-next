export function formatDateRu(dateString) {
  const date = new Date(dateString);
  const now = new Date();

  const diffMs = now - date;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Сегодня";
  if (diffDays === 1) return "Вчера";
  if (diffDays === 2) return "Позавчера";
  if (diffDays < 7) return `${diffDays} ${pluralizeDays(diffDays)} назад`;
  if (diffDays < 14) return "Неделю назад";

  return date.toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function pluralizeDays(n) {
  if (n % 10 === 1 && n % 100 !== 11) return "день";
  if ([2, 3, 4].includes(n % 10) && ![12, 13, 14].includes(n % 100))
    return "дня";
  return "дней";
}
