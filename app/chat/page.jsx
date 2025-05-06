import styles from "@/styles/chat.module.css";
import FileUploadButton from "@/components/FileUploadButton";

export default function Page() {
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

          <div className={styles.chat}>
            <div className={styles.avatar}>
              <img src="/img/profile.png" alt="" />
            </div>
            <div className={styles.chatMessage}>
              <h3 className={styles.chatAuthor}>Роман</h3>
              <p className={styles.messageText}>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim
                aliquid nesciunt distinctio vel. Tempore quia dolore ut, neque
                eveniet magnam.
                <span className={styles.messageTime}>Вчера</span>
              </p>
            </div>
          </div>
        </div>
        <div className={styles.messanger}>
          <div className={styles.messagerContaier}>
            <div className={styles.messagesContainer}>
              <div className={styles.otherMessage}>
                <p>
                  Это сообщение от другого пользователя выаывмвамусцстцсипнмнм
                </p>
                <p className={styles.time}>5 минут назад</p>
              </div>
              <div className={styles.myMessage}>
                <p>Это мое сообщение</p>
                <p className={styles.time}>1 минутy назад</p>
              </div>
            </div>
            <div className={styles.messageInput}>
              <input type="text" placeholder="Сообщение" />
              <div className={styles.buttons}>
                <FileUploadButton />
                <button>
                  <img src="/img/microfone.svg" alt="Голосовой ввод" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
