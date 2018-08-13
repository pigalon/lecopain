import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ISubscMySuffix } from 'app/shared/model/subsc-my-suffix.model';

type EntityResponseType = HttpResponse<ISubscMySuffix>;
type EntityArrayResponseType = HttpResponse<ISubscMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class SubscMySuffixService {
    private resourceUrl = SERVER_API_URL + 'api/subscs';

    constructor(private http: HttpClient) {}

    create(subsc: ISubscMySuffix): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(subsc);
        return this.http
            .post<ISubscMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(subsc: ISubscMySuffix): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(subsc);
        return this.http
            .put<ISubscMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<ISubscMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ISubscMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(subsc: ISubscMySuffix): ISubscMySuffix {
        const copy: ISubscMySuffix = Object.assign({}, subsc, {
            startDate: subsc.startDate != null && subsc.startDate.isValid() ? subsc.startDate.toJSON() : null,
            endDate: subsc.endDate != null && subsc.endDate.isValid() ? subsc.endDate.toJSON() : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.startDate = res.body.startDate != null ? moment(res.body.startDate) : null;
        res.body.endDate = res.body.endDate != null ? moment(res.body.endDate) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((subsc: ISubscMySuffix) => {
            subsc.startDate = subsc.startDate != null ? moment(subsc.startDate) : null;
            subsc.endDate = subsc.endDate != null ? moment(subsc.endDate) : null;
        });
        return res;
    }
}
