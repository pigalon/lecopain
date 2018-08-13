export interface ILocationMySuffix {
    id?: number;
    streetAddress?: string;
    postalCode?: string;
    city?: string;
    country?: string;
}

export class LocationMySuffix implements ILocationMySuffix {
    constructor(
        public id?: number,
        public streetAddress?: string,
        public postalCode?: string,
        public city?: string,
        public country?: string
    ) {}
}
