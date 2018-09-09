import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';

import { Principal, Authority, AuthorityService } from 'app/core';
import { AuthorityComponent } from './authority.component';
import { AuthorityDetailComponent } from './authority-detail.component';
import { AuthorityUpdateComponent } from './authority-update.component';

@Injectable({ providedIn: 'root' })
export class AuthorityResolve implements Resolve<any> {
    constructor(private service: AuthorityService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['name'] ? route.params['name'] : null;
        if (id) {
            return this.service.find(id);
        }
        return new Authority();
    }
}

export const authorityRoute: Routes = [
    {
        path: 'authority',
        component: AuthorityComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'authority.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'authority/:name/view',
        component: AuthorityDetailComponent,
        resolve: {
            authority: AuthorityResolve
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'authority.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'authority/new',
        component: AuthorityUpdateComponent,
        resolve: {
            authority: AuthorityResolve
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'authority.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'authority/:name/edit',
        component: AuthorityUpdateComponent,
        resolve: {
            authority: AuthorityResolve
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'authority.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];
