interface ApiErrorResponse {
  message?: string;
  error?: string;
}

function isApiErrorResponse(data: unknown): data is ApiErrorResponse {
  return (
    typeof data === 'object' &&
    data !== null &&
    'name' in data &&
    'value' in data
  );
}

export async function handleApiError(res: Response): Promise<never> {
  const errorData = await res.json().catch(() => null);
  let errorMessage = `HTTP ${res.status}: ${res.statusText}`;

  if (isApiErrorResponse(errorData)) {
    errorMessage = errorData.message || errorData.error || errorMessage;
  }

  throw new Error(errorMessage);
}
