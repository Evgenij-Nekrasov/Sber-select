import type { Option } from '@/types';
import { API_BASE } from '@/api/consts';
import { handleApiError } from '@/api/handleApiError';

export async function fetchOptionsApi(): Promise<Option[]> {
  const res = await fetch(`${API_BASE}/options/for/select`);

  if (!res.ok) {
    await handleApiError(res);
  }
  const data = await res.json();

  if (!Array.isArray(data)) {
    throw new Error('Invalid response format: expected array');
  }

  return data;
}

export async function sendSelectedApi(
  value: string,
): Promise<{ message: string }> {
  const res = await fetch(`${API_BASE}/selected/option`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ value }),
  });

  if (!res.ok) {
    await handleApiError(res);
  }

  return await res.json();
}
