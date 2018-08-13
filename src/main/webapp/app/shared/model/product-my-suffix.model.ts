export interface IProductMySuffix {
    id?: number;
    reference?: string;
    description?: string;
    price?: number;
}

export class ProductMySuffix implements IProductMySuffix {
    constructor(public id?: number, public reference?: string, public description?: string, public price?: number) {}
}
