import { Moment } from 'moment';
import { IOrderLineMySuffix } from 'app/shared/model//order-line-my-suffix.model';

export const enum OrderState {
    CREATED = 'CREATED',
    PAID = 'PAID',
    DELIVERED = 'DELIVERED',
    PLANNED = 'PLANNED'
}

export const enum PromotionType {
    PROMO1 = 'PROMO1',
    PROMO2 = 'PROMO2',
    PROMO3 = 'PROMO3'
}

export interface IOrderCustMySuffix {
    id?: number;
    reference?: string;
    payDate?: Moment;
    status?: OrderState;
    promotion?: PromotionType;
    customerId?: number;
    lines?: IOrderLineMySuffix[];
}

export class OrderCustMySuffix implements IOrderCustMySuffix {
    constructor(
        public id?: number,
        public reference?: string,
        public payDate?: Moment,
        public status?: OrderState,
        public promotion?: PromotionType,
        public customerId?: number,
        public lines?: IOrderLineMySuffix[]
    ) {}
}
