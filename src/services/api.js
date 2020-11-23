import axios from 'axios';

const api = axios.create({
    baseURL: 'https://www.receitaws.com.br/v1'
});

export default api;