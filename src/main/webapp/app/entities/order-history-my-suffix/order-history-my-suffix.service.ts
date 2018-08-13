import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IOrderHistoryMySuffix } from 'app/shared/model/order-history-my-suffix.model';

type EntityResponseType = HttpResponse<IOrderHistoryMySuffix>;
type EntityArrayResponseType = HttpResponse<IOrderHistoryMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class OrderHistoryMySuffixService {
    private resourceUrl = SERVER_API_URL + 'api/order-histories';

    constructor(private http: HttpClient) {}

    create(orderHistory: IOrderHistoryMySuffix): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(orderHistory);
        return this.http
            .post<IOrderHistoryMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(orderHistory: IOrderHistoryMySuffix): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(orderHistory);
        return this.http
            .put<IOrderHistoryMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IOrderHistoryMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IOrderHistoryMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(orderHistory: IOrderHistoryMySuffix): IOrderHistoryMySuffix {
        const copy: IOrderHistoryMySuffix = Object.assign({}, orderHistory, {
            actionDate: orderHistory.actionDate != null && orderHistory.actionDate.isValid() ? orderHistory.actionDate.toJSON() : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.actionDate = res.body.actionDate != null ? moment(res.body.actionDate) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((orderHistory: IOrderHistoryMySuffix) => {
            orderHistory.actionDate = orderHistory.actionDate != null ? moment(orderHistory.actionDate) : null;
        });
        return res;
    }
}
