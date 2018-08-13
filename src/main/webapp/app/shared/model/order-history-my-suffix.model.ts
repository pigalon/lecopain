import { Moment } from 'moment';

export const enum OrderActionType {
    CREATE = 'CREATE',
    UPDATE = 'UPDATE',
    CANCEL = 'CANCEL',
    PAY = 'PAY'
}

export interface IOrderHistoryMySuffix {
    id?: number;
    actionDate?: Moment;
    action?: OrderActionType;
    reason?: string;
    orderId?: number;
}

export class OrderHistoryMySuffix implements IOrderHistoryMySuffix {
    constructor(
        public id?: number,
        public actionDate?: Moment,
        public action?: OrderActionType,
        public reason?: string,
        public orderId?: number
    ) {}
}
