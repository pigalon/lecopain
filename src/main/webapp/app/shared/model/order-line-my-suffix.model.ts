export const enum LineState {
    LIN1 = 'LIN1',
    LIN2 = 'LIN2',
    LIN3 = 'LIN3'
}

export interface IOrderLineMySuffix {
    id?: number;
    reference?: string;
    quantity?: number;
    price?: number;
    reduction?: number;
    status?: LineState;
    orderMainId?: number;
    productId?: number;
}

export class OrderLineMySuffix implements IOrderLineMySuffix {
    constructor(
        public id?: number,
        public reference?: string,
        public quantity?: number,
        public price?: number,
        public reduction?: number,
        public status?: LineState,
        public orderMainId?: number,
        public productId?: number
    ) {}
}
