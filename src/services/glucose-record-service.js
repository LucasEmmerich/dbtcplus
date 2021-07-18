import Storage from "../storage/local-storage";
import moment from "moment";

export default class GlucoseRecordService {
    constructor(key = 'glucose_records') {
        this._storage = new Storage(key);
    }

    async load() {
        const collection = await this._storage.load();
        return collection;
    }

    async lastId() {
        const data = await this.load();
        if (data.length === 0) {
            return 0;
        }
        const lastInsertedEntity = data.reduce((prev = 0, current) => +prev['glr_id'] > +current['glr_id'] ? prev : current);
        return lastInsertedEntity.glr_id;
    }

    async listWithPagination(page = 0, itemsPerPage = 5, orderOptions = { field: 'glr_created_at', ascending: false }) {
        const { field, ascending } = orderOptions;
        const list = await this.load();
        //filtros de data antes do order
        const orderedList = this.orderBy(list, field, ascending);
        return {
            from: page * itemsPerPage,
            to: (page * itemsPerPage) + itemsPerPage < list.length
                ?
                (page * itemsPerPage) + itemsPerPage
                :
                list.length,
            total: list.length,
            data: orderedList.slice(page * itemsPerPage, (page * itemsPerPage) + itemsPerPage),
        }
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
        data.map(glucose_record => {
            if (glucose_record.glr_id === id) {
                glucose_record = obj;
            }
        });
        await this._storage.save(data);
        return id;
    }

    async delete(id) {
        const data = await this.load();
        const newData = data.filter(glucose_record => {
            return glucose_record.glr_id !== id;
        });
        await this._storage.save(newData);
    }

    orderBy(array = [], field, ascending = true) {
        array.sort(function (a, b) {
            return a[field] > b[field]
                ?
                (ascending ? 1 : -1) : a[field] < b[field]
                    ?
                    (ascending ? -1 : 1)
                    :
                    0;
        });
        return array;
    }

}