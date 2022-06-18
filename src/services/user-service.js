import Api from "../api";

export default class UserService {
    constructor() {
        this._url = 'user';
        this.connection = Api.getConnection();
        this.headers = Api.getHeaders();
    }

    async create(obj) {
        try {
            await this.connection.post(this._url, obj);
        }
        catch (e) {
            throw e;
        }
    };

    async authenticate(login, password) {
        try {
            const obj = { login, password };
            await this.connection.post(`${this._url}/authenticate`, obj, { headers: this.headers });
        }
        catch (e) {
            throw e;
        }
    }

    async update(obj) {
        try {
            await this.connection.put(this._url, obj, { headers: this.headers });
        }
        catch (e) {
            throw e;
        }
    };

    async emailExists(email) {
        try {
            const { data } = await this.connection.get(`${this._url}/emailexists?email=${email}`);
            return data;
        }
        catch (e) {
            throw e;
        }
    };

    async loginExists(login) {
        try {
            const { data } = await this.connection.get(`${this._url}/loginexists?login=${login}`);
            return data;
        }
        catch (e) {
            throw e;
        }
    };
}