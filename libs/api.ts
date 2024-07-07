import axios from "axios";
import { setCookie, getCookie } from 'cookies-next';

const api = axios.create({
    baseURL: 'https://matrix-todo-backend.onrender.com/api/v1',
    headers: {"Content-Type": "application/json",},
})

// リクエストインターセプターの設定
// リクエストが送信する前に呼び出される
api.interceptors.request.use((config) => {
    const uid = getCookie('uid');
    const client = getCookie('client');
    const token = getCookie('access-token');

    if (uid && client && token) {
        config.headers['uid'] = uid;
        config.headers['client'] = client;
        config.headers['access-token'] = token;
    }

    return config;
})

// レスポンスインターセプターの設定
// レスポンスが受信された後に呼び出される
api.interceptors.response.use((response) => {
    if (response.headers['access-token']) {
        setCookie('uid', response.headers['uid']);
        setCookie('client', response.headers['client']);
        setCookie('access-token', response.headers['access-token']);
    }

    return response;
})

export default api;