import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IOrderMainMySuffix } from 'app/shared/model/order-main-my-suffix.model';

type EntityResponseType = HttpResponse<IOrderMainMySuffix>;
type EntityArrayResponseType = HttpResponse<IOrderMainMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class OrderMainMySuffixService {
    private resourceUrl = SERVER_API_URL + 'api/order-mains';

    constructor(private http: HttpClient) {}

    create(orderMain: IOrderMainMySuffix): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(orderMain);
        return this.http
            .post<IOrderMainMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(orderMain: IOrderMainMySuffix): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(orderMain);
        return this.http
            .put<IOrderMainMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IOrderMainMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IOrderMainMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(orderMain: IOrderMainMySuffix): IOrderMainMySuffix {
        const copy: IOrderMainMySuffix = Object.assign({}, orderMain, {
            payDate: orderMain.payDate != null && orderMain.payDate.isValid() ? orderMain.payDate.toJSON() : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.payDate = res.body.payDate != null ? moment(res.body.payDate) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((orderMain: IOrderMainMySuffix) => {
            orderMain.payDate = orderMain.payDate != null ? moment(orderMain.payDate) : null;
        });
        return res;
    }
}
