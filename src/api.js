import axios from 'axios';
import config from './storage/localConfig.js';
export default class Api {
    constructor() {
        this._baseUrl = 'http://93.188.167.222:3000';
    }

    static getConnection() {
        const connection = axios.create({
            baseURL: 'http://93.188.167.222:3000'
        });
        return connection;
    }

    static getAuthorizationToken = async () => {
        const token = await config.get('user-token');
        return token;
    };

    static getHeaders = async () => {
        const userToken = await this.getAuthorizationToken();
        return {
            'Authorization': userToken
        };
    };
}

