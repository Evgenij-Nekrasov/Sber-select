import type { Option } from '@/types';
import { API_BASE } from '@/api/consts';
import { handleApiError, handleNetworkError, parseJsonResponse, validateApiBase } from '@/api/handleApiError';


export async function fetchOptionsApi(): Promise<Option[]> {
  validateApiBase();

  try {
    const res = await fetch(`${API_BASE}/options/for/select`);

    if (!res.ok) {
      await handleApiError(res);
    }

    const data = await parseJsonResponse<Option[]>(res);

    if (!Array.isArray(data)) {
      throw new Error('Неверный формат ответа: ожидался массив');
    }

    return data;
  } catch (error) {
    if (error instanceof Error && error.message.includes('HTTP')) {
      throw error;
    }
    
    handleNetworkError(error);
  }
}

export async function sendSelectedApi(
  value: string,
): Promise<{ message: string }> {
  validateApiBase();

  if (!value || typeof value !== 'string' || value.trim() === '') {
    throw new Error('Значение value обязательно и не может быть пустым');
  }

  try {
    const res = await fetch(`${API_BASE}/selected/option`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value }),
    });

    if (!res.ok) {
      await handleApiError(res);
    }

    return await parseJsonResponse<{ message: string }>(res);
  } catch (error) {
    if (error instanceof Error && error.message.includes('HTTP')) {
      throw error;
    }
    
    handleNetworkError(error);
  }
}
