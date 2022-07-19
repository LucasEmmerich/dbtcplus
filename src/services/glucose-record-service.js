import Api from "../api";
import config from '../storage/localConfig';

export default class GlucoseRecordService {
    constructor() {
        this._url = 'glucose-record';
    }

    async create(obj) {
        try {
            const token = await config.get('user-token');
            const headers = {
                'Authorization': token
            }
            await Api.connection.post(this._url, obj, { headers: headers });
        }
        catch (e) {
            throw e;
        }
    };


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


    async delete(id) {
        try {
            const token = await config.get('user-token');
            const headers = {
                'Authorization': token
            }
            await Api.connection.delete(`${this._url}/${id}`, { headers: headers });
        }
        catch (e) {
            throw e;
        }
    };


    async listWithPagination(page = 1) {
        try {
            const token = await config.get('user-token');
            const headers = {
                'Authorization': token
            }
            const { data } = await Api.connection.get(`${this._url}?page=${page}`, { headers: headers });
            return data;
        }
        catch (e) {
            throw e;
        }
    };


    async listConsumption(q) {
        try {
            const token = await config.get('user-token');
            const headers = {
                'Authorization': token
            }
            const { data } = await Api.connection.get(`${this._url}/list-consumption?q=${q}`, { headers: headers });

            return data;
        }
        catch (e) {
            throw e;
        }
    };


    async getBestDosages(consumption, glycemic_goal = 100) {
        try {
            const token = await config.get('user-token');
            const headers = {
                'Authorization': token
            }
            const { data } = await Api.connection.get(`${this._url}/getBestDosages?consumption=${consumption}&glycemic_goal=${glycemic_goal}`, {
                headers: headers
            });

            return data;
        }
        catch (e) {
            throw e;
        }
    };
}