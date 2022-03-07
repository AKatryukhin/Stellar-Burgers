export const ESC_KEYCODE = 'Escape';
export const BASE_URL = 'https://norma.nomoreparties.space/api';

export const handleResponse = (res: Response) => {
  if (!res.ok) {
    return Promise.reject(`Error: ${res.status}`);
  }
  return res.json();
};