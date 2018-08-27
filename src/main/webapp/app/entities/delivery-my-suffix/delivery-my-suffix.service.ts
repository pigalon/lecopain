import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IDeliveryMySuffix } from 'app/shared/model/delivery-my-suffix.model';

type EntityResponseType = HttpResponse<IDeliveryMySuffix>;
type EntityArrayResponseType = HttpResponse<IDeliveryMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class DeliveryMySuffixService {
    private resourceUrl = SERVER_API_URL + 'api/deliveries';

    constructor(private http: HttpClient) {}

    create(delivery: IDeliveryMySuffix): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(delivery);
        return this.http
            .post<IDeliveryMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(delivery: IDeliveryMySuffix): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(delivery);
        return this.http
            .put<IDeliveryMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IDeliveryMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IDeliveryMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(delivery: IDeliveryMySuffix): IDeliveryMySuffix {
        const copy: IDeliveryMySuffix = Object.assign({}, delivery, {
            delivDate: delivery.delivDate != null && delivery.delivDate.isValid() ? delivery.delivDate.toJSON() : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.delivDate = res.body.delivDate != null ? moment(res.body.delivDate) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((delivery: IDeliveryMySuffix) => {
            delivery.delivDate = delivery.delivDate != null ? moment(delivery.delivDate) : null;
        });
        return res;
    }
}
