import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ISubHistoryMySuffix } from 'app/shared/model/sub-history-my-suffix.model';

type EntityResponseType = HttpResponse<ISubHistoryMySuffix>;
type EntityArrayResponseType = HttpResponse<ISubHistoryMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class SubHistoryMySuffixService {
    private resourceUrl = SERVER_API_URL + 'api/sub-histories';

    constructor(private http: HttpClient) {}

    create(subHistory: ISubHistoryMySuffix): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(subHistory);
        return this.http
            .post<ISubHistoryMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(subHistory: ISubHistoryMySuffix): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(subHistory);
        return this.http
            .put<ISubHistoryMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<ISubHistoryMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ISubHistoryMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(subHistory: ISubHistoryMySuffix): ISubHistoryMySuffix {
        const copy: ISubHistoryMySuffix = Object.assign({}, subHistory, {
            actionDate: subHistory.actionDate != null && subHistory.actionDate.isValid() ? subHistory.actionDate.toJSON() : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.actionDate = res.body.actionDate != null ? moment(res.body.actionDate) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((subHistory: ISubHistoryMySuffix) => {
            subHistory.actionDate = subHistory.actionDate != null ? moment(subHistory.actionDate) : null;
        });
        return res;
    }
}
