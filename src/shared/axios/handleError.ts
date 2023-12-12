import type { AxiosError } from 'axios';

export default (err: AxiosError) => {
  const { response } = err;
  if (response) {
    if (!response.status) {
      err.code = '';
      err.message = '有response但没有response.status的情况';
    }
    err.code = String(response.status);
    err.message = 'Error';
  }
  return err;
};
