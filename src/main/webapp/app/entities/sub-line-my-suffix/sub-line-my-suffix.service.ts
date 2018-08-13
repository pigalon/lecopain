import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ISubLineMySuffix } from 'app/shared/model/sub-line-my-suffix.model';

type EntityResponseType = HttpResponse<ISubLineMySuffix>;
type EntityArrayResponseType = HttpResponse<ISubLineMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class SubLineMySuffixService {
    private resourceUrl = SERVER_API_URL + 'api/sub-lines';

    constructor(private http: HttpClient) {}

    create(subLine: ISubLineMySuffix): Observable<EntityResponseType> {
        return this.http.post<ISubLineMySuffix>(this.resourceUrl, subLine, { observe: 'response' });
    }

    update(subLine: ISubLineMySuffix): Observable<EntityResponseType> {
        return this.http.put<ISubLineMySuffix>(this.resourceUrl, subLine, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ISubLineMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ISubLineMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
