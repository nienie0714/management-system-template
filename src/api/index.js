import axios from 'axios';
import api from './api';
import { Loading, Message } from 'element-ui';
import store from '../store';
import qs from 'qs';
import routes from '../router';
import { getCookie } from '../utils';

let loading = false;
let timer = null;
let loadingInstance;

axios.defaults.timeout = 1000000;

//添加请求拦截器
axios.interceptors.request.use(
    config => {
        loading = true;
        return config;
    },
    error => {
        loading = false;
        loadingInstance.close();
        return Promise.reject(error);
    }
);

//添加响应拦截器
axios.interceptors.response.use(
    response => {
        loading = false;
        if (loadingInstance) {
            loadingInstance.close();
        }
        return response;
    },
    error => {
        loading = false;
        if (loadingInstance) {
            loadingInstance.close();
        }
        let message = '';
        if (error.response) {
            message = error.response.data.errorMsg;
            switch (error.response.status) {
                case 500:
                    message = '服务器端出错';
                    break;
            }
        } else {
            error.response = {};
            message = '连接到服务器失败';
        }
        error.response.message = message;
        return Promise.resolve(error.response);
    }
);

//检查接口请求状态

function checkStatus(resolve, reject, response, config) {
    let tipStr = ''; //提示的字符串
    if (response && response.status === 200) {
        if (response.data.errorCode === 1) {
            resolve(response.data.data);
        } else {
            if (!config.error) {
                Message(response.data.errorMsg);
            }
            reject(response.data);
        }
    } else if (response.status === 401) {
        Message(response.message || '请求失败');
        setTimeout(() => {
            routes.push('/login');
        }, 1000);
    } else {
        Message(response.message || '请求失败');
        reject(response.message);
    }
}

let xhr = config => {
    //加载动画
    clearTimeout(timer);
    timer = setTimeout(() => {
        if (loading) {
            loadingInstance = Loading.service();
        }
    }, 2000);

    if (config instanceof Array) {
        return axios.all(config);
    } else {
        let name = config.name;
        let data = config.data || {};
        let { url, method = 'get', isForm } = api[name];
        if (/:id/.test(url)) {
            url = url.replace(':id', config.id);
        }

        if (method === 'post') {
            if (isForm) {
                data = qs.stringify(data);
            } else {
                data = JSON.stringify(data);
            }
        }
        let headers = {
            'x-csrf-token': getCookie('csrfToken'),
            token: store.getters.getCommon.token,
            'Content-Type': isForm ? 'application/x-www-form-urlencoded; charset=UTF-8' : 'application/json; charset=UTF-8'
        };

        switch (method) {
            case 'get':
            case 'delete':
                return new Promise((resolve, reject) => {
                    axios[method](url, {
                        params: data,
                        headers
                    })
                        .then(res => {
                            checkStatus(resolve, reject, res, config);
                        })
                        .catch(res => {
                            reject(res);
                        });
                });
            case 'post':
            case 'put':
                return new Promise((resolve, reject) => {
                    axios[method](url, data, {
                        headers
                    })
                        .then(res => {
                            checkStatus(resolve, reject, res, config);
                        })
                        .catch(res => {
                            reject(res);
                        });
                });
            default:
                break;
        }
    }
};

export { xhr, api };
