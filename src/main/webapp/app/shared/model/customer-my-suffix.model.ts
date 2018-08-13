import { Moment } from 'moment';
import { IOrderCustMySuffix } from 'app/shared/model//order-cust-my-suffix.model';

export interface ICustomerMySuffix {
    id?: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    phoneNumber?: string;
    createDate?: Moment;
    locationId?: number;
    orders?: IOrderCustMySuffix[];
}

export class CustomerMySuffix implements ICustomerMySuffix {
    constructor(
        public id?: number,
        public firstName?: string,
        public lastName?: string,
        public email?: string,
        public phoneNumber?: string,
        public createDate?: Moment,
        public locationId?: number,
        public orders?: IOrderCustMySuffix[]
    ) {}
}
