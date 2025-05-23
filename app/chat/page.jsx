"use client";
import { formatDateRu } from "@/utils/formatDateRu";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import styles from "@/styles/chat.module.css";
import { useSession } from "next-auth/react";

export default function ChatPage() {
  const { data: session } = useSession();
  const currentUserId = session?.user?.id;

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  // Получение списка пользователей
  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then(setUsers)
      .catch(console.error);
  }, []);

  // Загрузка сообщений
  useEffect(() => {
    if (!selectedUser || !currentUserId) return;

    fetch(`/api/messages?userId=${currentUserId}&chatWithId=${selectedUser.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setMessages(
            data.map((msg) => ({
              ...msg,
              isMy: msg.senderId === currentUserId,
            }))
          );
        } else {
          setMessages([]);
        }
      })
      .catch(console.error);
  }, [selectedUser, currentUserId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedUser || !currentUserId) return;

    const res = await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: newMessage.trim(),
        senderId: currentUserId,
        receiverId: selectedUser.id,
      }),
    });

    const saved = await res.json();
    setMessages((prev) => [...prev, { ...saved, isMy: true }]);
    setNewMessage("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSendMessage();
  };

  return (
    <section>
      <div className={styles.chatHeader}>
        <div className={styles.navigation}>
          <Link href="/">
            <img src="/img/home.svg" alt="" />
          </Link>
          <div className={styles.search}>
            <img src="/img/search.svg" alt="поиск" />
            <input type="search" placeholder="начните вводить" />
          </div>
        </div>
        <div className={styles.profile}>
          <div className={styles.avatar}>
            <img src="/img/profile.png" alt="" />
          </div>
          <div className={styles.text}>
            <h3>Вы</h3>
            <p>online</p>
          </div>
        </div>
      </div>

      <div className={styles.grid}>
        <div className={styles.chats}>
          <div className={styles.title}>
            <p>Недавние</p>
          </div>
          {users
            .filter((chat) => chat.id !== currentUserId)
            .map((chat) => (
              <div
                key={chat.id}
                className={`${styles.chat} ${
                  selectedUser?.id === chat.id ? styles.active : ""
                }`}
                onClick={() => setSelectedUser(chat)}
              >
                <div className={styles.avatar}>
                  <img src={chat.image || "/img/profile.png"} alt={chat.name} />
                </div>
                <div className={styles.chatMessage}>
                  <h3 className={styles.chatAuthor}>{chat.name}</h3>
                  <p className={styles.messageText}>
                    {messages.length > 0 && selectedUser?.id === chat.id
                      ? messages[messages.length - 1].text
                      : "..."}
                  </p>
                </div>
              </div>
            ))}
        </div>

        <div className={styles.messanger}>
          <div className={styles.messagerContaier}>
            <div className={styles.messagesContainer}>
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={msg.isMy ? styles.myMessage : styles.otherMessage}
                >
                  <p>{msg.text}</p>
                  <p className={styles.time}>
                    {formatDateRu(msg.time)} в{" "}
                    {new Date(msg.time).toLocaleTimeString("ru-RU", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>

          <div className={styles.messageInput}>
            <input
              type="text"
              placeholder="Сообщение"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <div className={styles.buttons}>
              <button>
                <img src="/img/microfone.svg" alt="Голосовой ввод" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
