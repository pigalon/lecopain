import { Moment } from 'moment';
import { IOrderMainMySuffix } from 'app/shared/model//order-main-my-suffix.model';

export interface ICustomerMySuffix {
    id?: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    phoneNumber?: string;
    createDate?: Moment;
    streetAddress?: string;
    postalCode?: string;
    city?: string;
    country?: string;
    orders?: IOrderMainMySuffix[];
}

export class CustomerMySuffix implements ICustomerMySuffix {
    constructor(
        public id?: number,
        public firstName?: string,
        public lastName?: string,
        public email?: string,
        public phoneNumber?: string,
        public createDate?: Moment,
        public streetAddress?: string,
        public postalCode?: string,
        public city?: string,
        public country?: string,
        public orders?: IOrderMainMySuffix[]
    ) {}
}
