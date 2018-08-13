export interface ISubLineMySuffix {
    id?: number;
    sReference?: string;
    subscId?: number;
    orderId?: number;
}

export class SubLineMySuffix implements ISubLineMySuffix {
    constructor(public id?: number, public sReference?: string, public subscId?: number, public orderId?: number) {}
}
