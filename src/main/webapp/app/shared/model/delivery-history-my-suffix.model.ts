import { Moment } from 'moment';

export const enum DeliveryActionType {
    CREATE = 'CREATE',
    UPDATE = 'UPDATE',
    PRICE_CHANGE = 'PRICE_CHANGE',
    UNAVAILABLE = 'UNAVAILABLE',
    AVAILABLE = 'AVAILABLE'
}

export interface IDeliveryHistoryMySuffix {
    id?: number;
    actionDate?: Moment;
    action?: DeliveryActionType;
    reason?: string;
    deliveryId?: number;
}

export class DeliveryHistoryMySuffix implements IDeliveryHistoryMySuffix {
    constructor(
        public id?: number,
        public actionDate?: Moment,
        public action?: DeliveryActionType,
        public reason?: string,
        public deliveryId?: number
    ) {}
}
