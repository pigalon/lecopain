import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IOrderCustMySuffix } from 'app/shared/model/order-cust-my-suffix.model';

type EntityResponseType = HttpResponse<IOrderCustMySuffix>;
type EntityArrayResponseType = HttpResponse<IOrderCustMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class OrderCustMySuffixService {
    private resourceUrl = SERVER_API_URL + 'api/order-custs';

    constructor(private http: HttpClient) {}

    create(orderCust: IOrderCustMySuffix): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(orderCust);
        return this.http
            .post<IOrderCustMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(orderCust: IOrderCustMySuffix): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(orderCust);
        return this.http
            .put<IOrderCustMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IOrderCustMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IOrderCustMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(orderCust: IOrderCustMySuffix): IOrderCustMySuffix {
        const copy: IOrderCustMySuffix = Object.assign({}, orderCust, {
            payDate: orderCust.payDate != null && orderCust.payDate.isValid() ? orderCust.payDate.toJSON() : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.payDate = res.body.payDate != null ? moment(res.body.payDate) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((orderCust: IOrderCustMySuffix) => {
            orderCust.payDate = orderCust.payDate != null ? moment(orderCust.payDate) : null;
        });
        return res;
    }
}
