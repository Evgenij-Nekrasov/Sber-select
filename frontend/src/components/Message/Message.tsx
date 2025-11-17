import React from 'react';
import styles from './Message.module.css';

interface MessageProps {
  children: React.ReactNode;
  onClose?: () => void;
}

export const Message = ({ children,  onClose }: MessageProps) => {
  const messageClass = `${styles.message}`;

  return (
    <div className={messageClass}>
      <span className={styles.content}>{children}</span>
      {onClose && (
        <button
          type="button"
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Закрыть сообщение"
        >
          ×
        </button>
      )}
    </div>
  );
};
