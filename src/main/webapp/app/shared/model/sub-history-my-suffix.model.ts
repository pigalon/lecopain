import { Moment } from 'moment';

export const enum ProductActionType {
    CREATE = 'CREATE',
    UPDATE = 'UPDATE',
    PRICE_CHANGE = 'PRICE_CHANGE',
    UNAVAILABLE = 'UNAVAILABLE',
    AVAILABLE = 'AVAILABLE'
}

export interface ISubHistoryMySuffix {
    id?: number;
    actionDate?: Moment;
    action?: ProductActionType;
    reason?: string;
    subscriptionId?: number;
}

export class SubHistoryMySuffix implements ISubHistoryMySuffix {
    constructor(
        public id?: number,
        public actionDate?: Moment,
        public action?: ProductActionType,
        public reason?: string,
        public subscriptionId?: number
    ) {}
}
