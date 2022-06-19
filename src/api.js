import axios from 'axios';
export default class Api {
    static get connection() {
        const connection = axios.create({
            baseURL: 'http://93.188.167.222:3000/'
        });
        return connection;
    }
}

