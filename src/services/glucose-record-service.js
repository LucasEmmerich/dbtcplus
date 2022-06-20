import Api from "../api";
import config from '../storage/localConfig.js';

export default class GlucoseRecordService {
    constructor() {
        this._url = 'glucose-record';

    }

    async create(obj) {
        try {
            const token = await config.get('user-token');
            const headers = {
                'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJ1c2VyIjp7ImlkIjoxLCJuYW1lIjoiYWRtIiwiZW1haWwiOiJhZG1AYWRtLmNvbSIsImxvZ2luIjoiYWRtIiwicGFzc3dvcmQiOiJhNjY1YTQ1OTIwNDIyZjlkNDE3ZTQ4NjdlZmRjNGZiOGEwNGExZjNmZmYxZmEwN2U5OThlODZmN2Y3YTI3YWUzIiwiYWN0aXZlIjp0cnVlLCJjcmVhdGVkX2F0IjoiMjAyMi0wNi0xMFQyMzo1NToyOC4wMDBaIiwidXBkYXRlZF9hdCI6IjIwMjItMDYtMTBUMjM6NTU6MjguMDAwWiJ9LCJpc3N1ZWQiOjE2ODY1MDI0MDU0MjksImV4cGlyZXMiOjE2ODY1MDI0MDU0Mjl9.4Sg6FEHTNrmcW3g5HdkWHFbA5-QmmjWw7-qWVgeTByvh52V0osysLxFP640zLEXpVR1lwMSU4fQL57814h0KgQ'
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
                'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJ1c2VyIjp7ImlkIjoxLCJuYW1lIjoiYWRtIiwiZW1haWwiOiJhZG1AYWRtLmNvbSIsImxvZ2luIjoiYWRtIiwicGFzc3dvcmQiOiJhNjY1YTQ1OTIwNDIyZjlkNDE3ZTQ4NjdlZmRjNGZiOGEwNGExZjNmZmYxZmEwN2U5OThlODZmN2Y3YTI3YWUzIiwiYWN0aXZlIjp0cnVlLCJjcmVhdGVkX2F0IjoiMjAyMi0wNi0xMFQyMzo1NToyOC4wMDBaIiwidXBkYXRlZF9hdCI6IjIwMjItMDYtMTBUMjM6NTU6MjguMDAwWiJ9LCJpc3N1ZWQiOjE2ODY1MDI0MDU0MjksImV4cGlyZXMiOjE2ODY1MDI0MDU0Mjl9.4Sg6FEHTNrmcW3g5HdkWHFbA5-QmmjWw7-qWVgeTByvh52V0osysLxFP640zLEXpVR1lwMSU4fQL57814h0KgQ'
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
            await config.set('user-token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJ1c2VyIjp7ImlkIjoxLCJuYW1lIjoiYWRtIiwiZW1haWwiOiJhZG1AYWRtLmNvbSIsImxvZ2luIjoiYWRtIiwicGFzc3dvcmQiOiJhNjY1YTQ1OTIwNDIyZjlkNDE3ZTQ4NjdlZmRjNGZiOGEwNGExZjNmZmYxZmEwN2U5OThlODZmN2Y3YTI3YWUzIiwiYWN0aXZlIjp0cnVlLCJjcmVhdGVkX2F0IjoiMjAyMi0wNi0xMFQyMzo1NToyOC4wMDBaIiwidXBkYXRlZF9hdCI6IjIwMjItMDYtMTBUMjM6NTU6MjguMDAwWiJ9LCJpc3N1ZWQiOjE2ODY1MDI0MDU0MjksImV4cGlyZXMiOjE2ODY1MDI0MDU0Mjl9.4Sg6FEHTNrmcW3g5HdkWHFbA5-QmmjWw7-qWVgeTByvh52V0osysLxFP640zLEXpVR1lwMSU4fQL57814h0KgQ');
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
            alert(e.message)
            throw e;
        }
    };
}