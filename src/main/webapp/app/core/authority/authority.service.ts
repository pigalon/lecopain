import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IAuthority } from './authority.model';

@Injectable({ providedIn: 'root' })
export class AuthorityService {
    private resourceUrl = SERVER_API_URL + 'api/authorities';

    constructor(private http: HttpClient) {}

    create(authority: IAuthority): Observable<HttpResponse<IAuthority>> {
        return this.http.post<IAuthority>(this.resourceUrl, authority, { observe: 'response' });
    }

    update(authority: IAuthority): Observable<HttpResponse<IAuthority>> {
        return this.http.put<IAuthority>(this.resourceUrl, authority, { observe: 'response' });
    }

    find(login: string): Observable<HttpResponse<IAuthority>> {
        return this.http.get<IAuthority>(`${this.resourceUrl}/${login}`, { observe: 'response' });
    }

    query(req?: any): Observable<HttpResponse<IAuthority[]>> {
        const options = createRequestOption(req);
        return this.http.get<IAuthority[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(login: string): Observable<HttpResponse<any>> {
        return this.http.delete(`${this.resourceUrl}/${name}`, { observe: 'response' });
    }
}
