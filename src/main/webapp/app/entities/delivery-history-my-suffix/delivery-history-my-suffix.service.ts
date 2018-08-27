import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IDeliveryHistoryMySuffix } from 'app/shared/model/delivery-history-my-suffix.model';

type EntityResponseType = HttpResponse<IDeliveryHistoryMySuffix>;
type EntityArrayResponseType = HttpResponse<IDeliveryHistoryMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class DeliveryHistoryMySuffixService {
    private resourceUrl = SERVER_API_URL + 'api/delivery-histories';

    constructor(private http: HttpClient) {}

    create(deliveryHistory: IDeliveryHistoryMySuffix): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(deliveryHistory);
        return this.http
            .post<IDeliveryHistoryMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(deliveryHistory: IDeliveryHistoryMySuffix): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(deliveryHistory);
        return this.http
            .put<IDeliveryHistoryMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IDeliveryHistoryMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IDeliveryHistoryMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(deliveryHistory: IDeliveryHistoryMySuffix): IDeliveryHistoryMySuffix {
        const copy: IDeliveryHistoryMySuffix = Object.assign({}, deliveryHistory, {
            actionDate:
                deliveryHistory.actionDate != null && deliveryHistory.actionDate.isValid() ? deliveryHistory.actionDate.toJSON() : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.actionDate = res.body.actionDate != null ? moment(res.body.actionDate) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((deliveryHistory: IDeliveryHistoryMySuffix) => {
            deliveryHistory.actionDate = deliveryHistory.actionDate != null ? moment(deliveryHistory.actionDate) : null;
        });
        return res;
    }
}
