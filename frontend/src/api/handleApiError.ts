import { API_BASE } from '@/api/consts';

interface ApiErrorResponse {
  message?: string;
  error?: string;
}

function isApiErrorResponse(data: unknown): data is ApiErrorResponse {
  if (typeof data !== 'object' || data === null) {
    return false;
  }

  return 'message' in data || 'error' in data;
}

export async function handleApiError(res: Response): Promise<never> {
  let errorMessage = `HTTP ${res.status}: ${res.statusText}`;
  let errorData: ApiErrorResponse | null = null;

  try {
    const contentType = res.headers.get('content-type');
    const isJson = contentType?.includes('application/json') ?? false;
    
    const clonedRes = res.clone();
    const text = await clonedRes.text();
    
    if (text.trim()) {
      if (isJson) {
        try {
          errorData = JSON.parse(text);
        } catch (parseError) {
          if (import.meta.env.DEV) {
            console.warn(
              '[API Error] Failed to parse error response as JSON:',
              parseError,
            );
            console.warn('[API Error] Response text:', text);
          }
          errorMessage = text || errorMessage;
        }
      } else {
        errorMessage = text || errorMessage;
      }
    }
  } catch (error) {
    if (import.meta.env.DEV) {
      console.warn('[API Error] Failed to read error response:', error);
    }
  }

  if (errorData && isApiErrorResponse(errorData)) {
    errorMessage = errorData.message || errorData.error || errorMessage;
  }

  throw new Error(errorMessage);
}

export function validateApiBase(): void {
  if (!API_BASE || typeof API_BASE !== 'string' || API_BASE.trim() === '') {
    throw new Error(
      'API_BASE is not configured. Please set VITE_API_URL environment variable.',
    );
  }
}

export function handleNetworkError(error: unknown): never {
  if (error instanceof TypeError) {
    if (error.message.includes('Failed to fetch')) {
      throw new Error(
        'Не удалось подключиться к серверу. Проверьте подключение к интернету и убедитесь, что сервер запущен.',
      );
    }
    if (error.message.includes('CORS')) {
      throw new Error(
        'Ошибка CORS. Сервер не разрешает запросы с этого домена.',
      );
    }
    throw new Error(`Сетевая ошибка: ${error.message}`);
  }

  if (error instanceof Error) {
    throw error;
  }

  throw new Error('Произошла неизвестная ошибка при выполнении запроса');
}

export async function parseJsonResponse<T>(res: Response): Promise<T> {
  try {
    const data: T = await res.json();
    return data
  } catch (parseError) {
    if (parseError instanceof SyntaxError) {
      throw new Error(
        'Не удалось распарсить ответ сервера как JSON. Сервер вернул невалидный JSON.',
      );
    }
    if (parseError instanceof Error) {
      throw new Error(`Ошибка при чтении ответа сервера: ${parseError.message}`);
    }
    throw new Error('Ошибка при чтении ответа сервера');
  }
}