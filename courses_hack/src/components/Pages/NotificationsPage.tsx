import styles from "./Pages.module.css";

const NotificationPage = () => {
  return (
    <div className={styles.page}>
      <div>
        <h1>Уведомления</h1>
        <ul>
          <li>Нет новых уведомлений</li>
        </ul>
      </div>
    </div>
  );
};

export default NotificationPage;
