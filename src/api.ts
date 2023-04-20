export async function request<T>(
  endpoint: string,
  additionalParams?: { [key: string]: string }
): Promise<T> {
  const url = import.meta.env.VITE_API_URL;
  const headers = new Headers({
    'sw-access-key': import.meta.env.VITE_SW_ACCESS_KEY
  });

  const params = new URLSearchParams({
    ...additionalParams
  });

  const response = await fetch(`${url}${endpoint}`, {
    method: 'POST',
    body: params,
    headers
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = await response.json();
  return data.elements;
}