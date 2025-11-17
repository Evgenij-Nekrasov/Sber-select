const DEFAULT_API_URL = 'http://localhost:8000';

const getApiBase = (): string => {
  const apiUrl = import.meta.env.VITE_API_URL;

  if (!apiUrl || typeof apiUrl !== 'string' || apiUrl.trim() === '') {
    if (import.meta.env.DEV) {
      console.warn(
        `[API Config] VITE_API_URL is not set or empty. Using fallback: ${DEFAULT_API_URL}`,
      );
    }
    return DEFAULT_API_URL;
  }

  return apiUrl.trim();
};

export const API_BASE = getApiBase();
export const MESSAGE_DISPLAY_DURATION = 5000;