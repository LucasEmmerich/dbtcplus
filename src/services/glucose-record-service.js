import Api from "../api";

export default class GlucoseRecordService {
    constructor() {
        this._url = 'glucose_record';
        this.connection = Api.getConnection();
        this.headers = Api.getHeaders();
    }

    async create(obj) {
        try {
            await this.connection.post(this._url, obj, { headers: this.headers });
        }
        catch (e) {
            throw e;
        }
    };


    async update(obj) {
        try {
            await this.connection.put(this._url, obj, { headers: this.headers });
        }
        catch (e) {
            throw e;
        }
    };


    async delete(id) {
        try {
            await this.connection.delete(`${this._url}/${id}`, { headers: this.headers });
        }
        catch (e) {
            throw e;
        }
    };


    async listWithPagination(page = 1) {
        try {
            await this.connection.get(`${this._url}?page=${page}`, { headers: this.headers });
        }
        catch (e) {
            throw e;
        }
    };


    async listConsumption(q) {
        try {
            const { data } = await this.connection.get(`${this._url}/list-consumption?q=${q}`, {
                headers: this.headers
            });

            return data;
        }
        catch (e) {
            throw e;
        }
    };


    async getBestDosages(consumption, glycemic_goal = 100) {
        try {
            const { data } = await this.connection.get(`${this._url}/getBestDosages?consumption=${consumption}&glycemic_goal=${glycemic_goal}`, {
                headers: this.headers
            });

            return data;
        }
        catch (e) {
            throw e;
        }
    };
}