import { useCallback, useEffect, useRef } from 'react';
import type { RefObject } from 'react';

import { MESSAGE_DISPLAY_DURATION } from '@/api/consts';

type UseAutoDismissMessagesParams = {
  message: string;
  error: string | null;
  clearMessage: () => void;
  clearError: () => void;
  duration?: number;
};

type UseAutoDismissMessagesResult = {
  dismissMessage: () => void;
  dismissError: () => void;
};

const clearTimer = (
  timerRef: RefObject<ReturnType<typeof setTimeout> | null>,
) => {
  if (timerRef.current) {
    clearTimeout(timerRef.current);
    timerRef.current = null;
  }
};

export function useAutoDismissMessages({
  message,
  error,
  clearMessage,
  clearError,
  duration = MESSAGE_DISPLAY_DURATION,
}: UseAutoDismissMessagesParams): UseAutoDismissMessagesResult {
  const messageTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const errorTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    clearTimer(messageTimeoutRef);

    if (!message) {
      return () => clearTimer(messageTimeoutRef);
    }

    messageTimeoutRef.current = setTimeout(() => {
      clearMessage();
    }, duration);

    return () => clearTimer(messageTimeoutRef);
  }, [message, clearMessage, duration]);

  useEffect(() => {
    clearTimer(errorTimeoutRef);

    if (!error) {
      return () => clearTimer(errorTimeoutRef);
    }

    errorTimeoutRef.current = setTimeout(() => {
      clearError();
    }, duration);

    return () => clearTimer(errorTimeoutRef);
  }, [error, clearError, duration]);

  const dismissMessage = useCallback(() => {
    clearTimer(messageTimeoutRef);
    clearMessage();
  }, [clearMessage]);

  const dismissError = useCallback(() => {
    clearTimer(errorTimeoutRef);
    clearError();
  }, [clearError]);

  return {
    dismissMessage,
    dismissError,
  };
}

