import { axios } from '@modules';

const baseURL: string = "https://brasilapi.com.br/api/feriados/v1";

const request = axios.create({
    baseURL,
    timeout: 10000, // 10s timeout
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});

export default request;
