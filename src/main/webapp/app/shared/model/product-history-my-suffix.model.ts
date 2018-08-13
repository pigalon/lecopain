import { Moment } from 'moment';

export const enum ProductActionType {
    CREATE = 'CREATE',
    UPDATE = 'UPDATE',
    PRICE_CHANGE = 'PRICE_CHANGE',
    UNAVAILABLE = 'UNAVAILABLE',
    AVAILABLE = 'AVAILABLE'
}

export interface IProductHistoryMySuffix {
    id?: number;
    actionDate?: Moment;
    action?: ProductActionType;
    reason?: string;
    productId?: number;
}

export class ProductHistoryMySuffix implements IProductHistoryMySuffix {
    constructor(
        public id?: number,
        public actionDate?: Moment,
        public action?: ProductActionType,
        public reason?: string,
        public productId?: number
    ) {}
}
