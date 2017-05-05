export const HTTP_NOT_FOUND = 'HTTP_NOT_FOUND';
export const HTTP_ERROR = 'HTTP_ERROR';

export function getHttpError(response) {
  return response && response.status.code === 404 ? HTTP_NOT_FOUND : HTTP_ERROR;
}