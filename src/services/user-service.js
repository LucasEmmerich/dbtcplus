import Api from "../api";
import config from '../storage/localConfig.js';

export default class UserService {
    constructor() {
        this._url = 'user';
    }

    async create(obj) {
        try {
            await Api.connection.post(this._url, obj);
        }
        catch (e) {
            throw e;
        }
    };

    async authenticate(login, password) {
        try {
            const obj = { login, password };
            const { data } = await Api.connection.post(`${this._url}/authenticate`, obj);
            return data;
        }
        catch (e) {
            throw e;
        }
    }

    async update(obj) {
        try {
            const token = await config.get('user-token');
            const headers = {
                'Authorization': token
            }
            await Api.connection.put(this._url, obj, { headers: headers });
        }
        catch (e) {
            throw e;
        }
    };

    async emailExists(email) {
        try {
            const { data } = await Api.connection.get(`${this._url}/emailexists?email=${email}`);
            return data;
        }
        catch (e) {
            throw e;
        }
    };

    async loginExists(login) {
        try {
            const { data } = await Api.connection.get(`${this._url}/loginexists?login=${login}`);
            return data;
        }
        catch (e) {
            throw e;
        }
    };
}