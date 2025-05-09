"use client";
import styles from "@/styles/chat.module.css";
import FileUploadButton from "@/components/FileUploadButton";
import { useState, useEffect, useRef } from "react";

export default function Page() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      author: "Роман",
      text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim aliquid nesciunt distinctio vel. Tempore quia dolore ut, neque eveniet magnam.",
      time: "Вчера",
      isMy: false,
    },
    {
      id: 2,
      author: "Другой пользователь",
      text: "Это сообщение от другого пользователя выаывмвамусцстцсипнмнм",
      time: "5 минут назад",
      isMy: false,
    },
    {
      id: 3,
      author: "Я",
      text: "Это мое сообщение",
      time: "1 минуту назад",
      isMy: true,
    },
    {
      id: 4,
      author: "Я",
      text: "Это мое сообщение",
      time: "1 минуту назад",
      isMy: true,
    },
    {
      id: 5,
      author: "Я",
      text: "Это мое сообщение",
      time: "1 минуту назад",
      isMy: true,
    },
    {
      id: 6,
      author: "Я",
      text: "Это мое сообщение",
      time: "1 минуту назад",
      isMy: true,
    },
    {
      id: 7,
      author: "Я",
      text: "Это мое сообщение",
      time: "1 минуту назад",
      isMy: true,
    },
    {
      id: 8,
      author: "Я",
      text: "Это мое сообщение",
      time: "1 минуту назад",
      isMy: true,
    },
    {
      id: 9,
      author: "Я",
      text: "Это мое сообщение",
      time: "1 минуту назад",
      isMy: true,
    },
    {
      id: 10,
      author: "Я",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur necessitatibus perferendis quo, repellendus fugit illo. Iste architecto praesentium esse enim?",
      time: "1 минуту назад",
      isMy: false,
    },
  ]);

  const [recentChats, setRecentChats] = useState([
    {
      id: 1,
      name: "Роман",
      avatar: "/img/profile.png",
      lastMessage:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit...",
      time: "Вчера",
      unread: 0,
    },
    {
      id: 2,
      name: "Анна",
      avatar: "/img/profile.png",
      lastMessage: "Привет! Как дела?",
      time: "2 часа назад",
      unread: 3,
    },
    {
      id: 3,
      name: "Команда проекта",
      avatar: "/img/profile.png",
      lastMessage: "Напоминаем о встрече завтра",
      time: "10:30",
      unread: 0,
    },
    {
      id: 4,
      name: "Команда проекта",
      avatar: "/img/profile.png",
      lastMessage: "Напоминаем о встрече завтра",
      time: "10:30",
      unread: 0,
    },
    {
      id: 5,
      name: "Команда проекта",
      avatar: "/img/profile.png",
      lastMessage: "Напоминаем о встрече завтра",
      time: "10:30",
      unread: 0,
    },
    {
      id: 6,
      name: "Команда проекта",
      avatar: "/img/profile.png",
      lastMessage: "Напоминаем о встрече завтра",
      time: "10:30",
      unread: 0,
    },
    {
      id: 7,
      name: "Команда проекта",
      avatar: "/img/profile.png",
      lastMessage: "Напоминаем о встрече завтра",
      time: "10:30",
      unread: 0,
    },
    {
      id: 8,
      name: "Команда проекта",
      avatar: "/img/profile.png",
      lastMessage: "Напоминаем о встрече завтра",
      time: "10:30",
      unread: 0,
    },
    {
      id: 9,
      name: "Команда проекта",
      avatar: "/img/profile.png",
      lastMessage: "Напоминаем о встрече завтра",
      time: "10:30",
      unread: 1,
    },
  ]);

  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;
    const newMsg = {
      id: messages.length + 1,
      author: "Я",
      text: newMessage,
      time: "только что",
      isMy: true,
    };

    setMessages([...messages, newMsg]);
    setNewMessage("");

    setTimeout(() => {
      const replyMsg = {
        id: messages.length + 2,
        author: "Роман",
        text: "Спасибо за ваше сообщение! Я отвечу вам позже.",
        time: "только что",
        isMy: false,
      };
      setMessages((prev) => [...prev, replyMsg]);
    }, 2000);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <section>
      <div className={styles.chatHeader}>
        <div className={styles.navigation}>
          <img src="/img/home.svg" alt="" />
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
            <h3>Роман</h3>
            <p>online 9 minutes ago</p>
          </div>
        </div>
      </div>
      <div className={styles.grid}>
        <div className={styles.chats}>
          <div className={styles.title}>
            <p>Недавние</p>
          </div>

          {recentChats.map((chat) => (
            <div key={chat.id} className={styles.chat}>
              <div className={styles.avatar}>
                <img src={chat.avatar} alt="" />
              </div>
              <div className={styles.chatMessage}>
                <h3 className={styles.chatAuthor}>{chat.name}</h3>
                <p className={styles.messageText}>
                  {chat.lastMessage}
                  <span className={styles.messageTime}>{chat.time}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.messanger}>
          <div className={styles.messagerContaier}>
            <div className={styles.messagesContainer}>
              {messages.map((message) =>
                message.isMy ? (
                  <div key={message.id} className={styles.myMessage}>
                    <p>{message.text}</p>
                    <p className={styles.time}>{message.time}</p>
                  </div>
                ) : (
                  <div key={message.id} className={styles.otherMessage}>
                    <p>{message.text}</p>
                    <p className={styles.time}>{message.time}</p>
                  </div>
                )
              )}
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
              <FileUploadButton />
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
