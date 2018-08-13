import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { SubscMySuffix } from 'app/shared/model/subsc-my-suffix.model';
import { SubscMySuffixService } from './subsc-my-suffix.service';
import { SubscMySuffixComponent } from './subsc-my-suffix.component';
import { SubscMySuffixDetailComponent } from './subsc-my-suffix-detail.component';
import { SubscMySuffixUpdateComponent } from './subsc-my-suffix-update.component';
import { SubscMySuffixDeletePopupComponent } from './subsc-my-suffix-delete-dialog.component';
import { ISubscMySuffix } from 'app/shared/model/subsc-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class SubscMySuffixResolve implements Resolve<ISubscMySuffix> {
    constructor(private service: SubscMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((subsc: HttpResponse<SubscMySuffix>) => subsc.body));
        }
        return of(new SubscMySuffix());
    }
}

export const subscRoute: Routes = [
    {
        path: 'subsc-my-suffix',
        component: SubscMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'lecopainApp.subsc.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'subsc-my-suffix/:id/view',
        component: SubscMySuffixDetailComponent,
        resolve: {
            subsc: SubscMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'lecopainApp.subsc.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'subsc-my-suffix/new',
        component: SubscMySuffixUpdateComponent,
        resolve: {
            subsc: SubscMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'lecopainApp.subsc.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'subsc-my-suffix/:id/edit',
        component: SubscMySuffixUpdateComponent,
        resolve: {
            subsc: SubscMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'lecopainApp.subsc.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const subscPopupRoute: Routes = [
    {
        path: 'subsc-my-suffix/:id/delete',
        component: SubscMySuffixDeletePopupComponent,
        resolve: {
            subsc: SubscMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'lecopainApp.subsc.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
