import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IOrderLineMySuffix } from 'app/shared/model/order-line-my-suffix.model';

type EntityResponseType = HttpResponse<IOrderLineMySuffix>;
type EntityArrayResponseType = HttpResponse<IOrderLineMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class OrderLineMySuffixService {
    private resourceUrl = SERVER_API_URL + 'api/order-lines';

    constructor(private http: HttpClient) {}

    create(orderLine: IOrderLineMySuffix): Observable<EntityResponseType> {
        return this.http.post<IOrderLineMySuffix>(this.resourceUrl, orderLine, { observe: 'response' });
    }

    update(orderLine: IOrderLineMySuffix): Observable<EntityResponseType> {
        return this.http.put<IOrderLineMySuffix>(this.resourceUrl, orderLine, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IOrderLineMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IOrderLineMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
