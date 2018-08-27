import { Moment } from 'moment';

export const enum DeliveryState {
    CREATED = 'CREATED',
    IN_PROGRESS = 'IN_PROGRESS',
    CANCELED = 'CANCELED',
    DELIVERED = 'DELIVERED'
}

export interface IDeliveryMySuffix {
    id?: number;
    reference?: string;
    delivDate?: Moment;
    status?: DeliveryState;
}

export class DeliveryMySuffix implements IDeliveryMySuffix {
    constructor(public id?: number, public reference?: string, public delivDate?: Moment, public status?: DeliveryState) {}
}
