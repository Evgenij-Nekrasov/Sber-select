import React from 'react';
import styles from './Message.module.css';

interface MessageProps {
  children: React.ReactNode;
}

export const Message = ({ children }: MessageProps) => {
  return <p className={styles.message}>{children}</p>;
};
