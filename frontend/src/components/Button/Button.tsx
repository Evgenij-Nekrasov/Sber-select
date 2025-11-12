import React from 'react';

import styles from './Button.module.css';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

export const Button = ({
  children,
  onClick,
  disabled = false,
}: ButtonProps) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick?.();
    }
  };

  return (
    <div
      className={styles.button}
      onClick={disabled ? undefined : onClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-disabled={disabled}
    >
      {children}
    </div>
  );
};
