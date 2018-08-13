import { Moment } from 'moment';
import { ISubLineMySuffix } from 'app/shared/model//sub-line-my-suffix.model';

export const enum SubType {
    SUB1 = 'SUB1',
    SUB2 = 'SUB2',
    SUB3 = 'SUB3'
}

export const enum SubscState {
    PAID = 'PAID',
    CREATED = 'CREATED',
    ASKED = 'ASKED',
    CANCELED = 'CANCELED'
}

export interface ISubscMySuffix {
    id?: number;
    startDate?: Moment;
    endDate?: Moment;
    type?: SubType;
    status?: SubscState;
    lines?: ISubLineMySuffix[];
}

export class SubscMySuffix implements ISubscMySuffix {
    constructor(
        public id?: number,
        public startDate?: Moment,
        public endDate?: Moment,
        public type?: SubType,
        public status?: SubscState,
        public lines?: ISubLineMySuffix[]
    ) {}
}
