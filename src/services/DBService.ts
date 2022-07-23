import {Model, HydratedDocument, ClientSession} from "mongoose";

class DBService<T> {

    private readonly fields:string[];
    private readonly Model:Model<T>;

    constructor(Model:Model<T>, populatedPaths:string[]) {
        this.Model = Model;
        this.fields = populatedPaths;
    }

    public saveMany(data:any[], session: ClientSession): Promise<any> {
        return this.Model.insertMany(data, {session: session});
    }

    public save(data: any, session = null): Promise<any> {
        const model = new this.Model(data);
        return model.save({session: session});
    }

    public count(query = {}): Promise<number> {
        return new Promise((resolve, reject) => {
            this.Model.countDocuments(query)
                .then((data) => {
                    resolve(data);
                })
                .catch((e) => {
                    reject(e);
                })
            ;
        });
    }

    public find(query:any, sort = {}, limit = 300, session: ClientSession): Promise< HydratedDocument<T>[] > {
        return new Promise((resolve, reject) => {
            this.Model.find(query)
                .session(session)
                .limit(limit)
                .sort(sort)
                .then((data) => {
                    resolve(data);
                })
                .catch((e) => {
                    reject(e);
                })
            ;
        });
    }

    public findWithPopulate(query:any, sort = {}, limit = 300, session: ClientSession): Promise< HydratedDocument<T>[] > {
        return new Promise((resolve, reject) => {
            this.Model.find(query)
                .session(session)
                .limit(limit)
                .populate(this.fields)
                .sort(sort)
                .then((data:any) => {
                    resolve(data);
                })
                .catch((e) => {
                    reject(e);
                })
            ;
        });
    }


    public paginate(query:any, sort = {}, limit = 300, page = 1): Promise< HydratedDocument<T>[] > {
        const customLabels = {
            totalDocs: 'itemsCount',
            docs: 'data',
            limit: 'perPage',
            page: 'currentPage',
            nextPage: 'next',
            prevPage: 'prev',
            totalPages: 'pageCount',
            pagingCounter: 'serialNumber',
            meta: 'paginator'
        };

        const options = {
            page: page,
            limit: limit,
            sort: sort,
            customLabels: customLabels
        };

        return new Promise((resolve, reject) => {
            // @ts-ignore
            this.Model.paginate(query, options)
                .then((data:any) => {
                    resolve(data);
                })
                .catch((e:Error) => {
                    reject(e);
                })
            ;
        });
    }

    public paginateWithPopulate(query:any, limit = 300, sort = {}, page = 1): Promise< HydratedDocument<T>[] > {
        const customLabels = {
            totalDocs: 'itemsCount',
            docs: 'data',
            limit: 'perPage',
            page: 'currentPage',
            nextPage: 'next',
            prevPage: 'prev',
            totalPages: 'pageCount',
            pagingCounter: 'serialNumber',
            meta: 'paginator'
        };

        const options = {
            page: page,
            limit: limit,
            sort: sort,
            customLabels: customLabels,
            populate: this.fields
        };

        return new Promise((resolve, reject) => {
            // @ts-ignore
            this.Model.paginate(query, options)
                .then((data:any) => {
                    resolve(data);
                })
                .catch((e:Error) => {
                    reject(e);
                })
            ;
        });
    }

    public findById(id:string, session: ClientSession): Promise< HydratedDocument<T> > {
        return new Promise((resolve, reject) => {
            this.Model.findById(id).session(session)
                .then((data:any) => {
                    resolve(data);
                })
                .catch((e:Error) => {
                    reject(e);
                })
            ;
        });
    }

    public findByIdWithPopulate(id:string, session: ClientSession): Promise< HydratedDocument<T>[] > {
        return new Promise((resolve, reject) => {
            this.Model.findById(id).session(session)
                .populate(this.fields)
                .session(session)
                .then((data:any) => {
                    resolve(data);
                })
                .catch((e:Error) => {
                    reject(e);
                })
            ;
        });
    }

    public findOne(query:any, session = null): Promise< HydratedDocument<T> > {
        return new Promise((resolve, reject) => {
            this.Model.findOne(query)
                .session(session)
                .then((data:any) => {
                    resolve(data);
                })
                .catch((e:Error) => {
                    reject(e);
                })
            ;
        });
    }

    public findOneWithPopulate(query:any, session: ClientSession): Promise< HydratedDocument<T> > {
        return new Promise((resolve, reject) => {
            this.Model.findOne(query)
                .populate(this.fields)
                .session(session)
                .then((data:any) => {
                    resolve(data);
                })
                .catch((e:Error) => {
                    reject(e);
                })
            ;
        });
    }

    public update(id:string, data:any, session: ClientSession): Promise<any> {
        return this.Model.findByIdAndUpdate(id, data, {new: true}).session(session).exec();
    }

    public updateOne(query:any, data:any, session: ClientSession): Promise<any> {
        return this.Model.findOneAndUpdate(query, data, {new: true}).session(session).exec();
    }

    public updateMany(query:any, data:any[], session: ClientSession): Promise<any> {
        return this.Model.updateMany(query, data).session(session).exec();
    }
}

export default DBService;