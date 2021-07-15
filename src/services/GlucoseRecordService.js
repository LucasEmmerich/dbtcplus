import Storage from "../storage/local-storage";
import moment from "moment";

class GlucoseRecordService {
    constructor(key = 'glucose_records') {
        this._storage = new Storage(key);
    }

    async load() {
        const collection = await this._storage.load();
        return collection;
    }

    async lastId() {
        const data = await this.load();
        if(data.length === 0){
            return 0;
        }
        const lastInsertedEntity = data.reduce((prev = 0, current) => +prev['glr_id'] > +current['glr_id'] ? prev : current);
        return lastInsertedEntity.glr_id;
    }

    async list(filters = {}) {
        const list = await this.load();
        return list;
    }

    async get(id) {
        const data = await this.load();
        const obj = data.filter(x => x.glr_id === id);
        return obj.length > 0 ? obj[0] : undefined;
    }

    async create(obj) {
        const lastId = await this.lastId();
        obj['glr_id'] = lastId + 1;
        obj['glr_created_at'] = moment();
        const data = await this.load();
        data.push(obj);
        await this._storage.save(data);
        return obj['glr_id'];
    }

    async update(id, obj) {
        const data = await this.load();
        data.map(glucose_record=>{
            if(glucose_record.glr_id === id){
                glucose_record = obj;
            }
        });
        await this._storage.save(data);
        return id;
    }

    async delete(id) {
        const data = await this.load();
        alert(JSON.stringify(data) )
        const newData = data.filter(glucose_record => {
            return glucose_record.glr_id !== id;
        });
        alert(JSON.stringify(newData) )
        await this._storage.save(newData);
    }

}
export default GlucoseRecordService;