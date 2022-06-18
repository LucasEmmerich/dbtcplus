import axios from 'axios';

export default class Api{
    static get instance(){
        return axios.create({ baseURL : 'http://93.188.167.222:3000' });
    }
}

