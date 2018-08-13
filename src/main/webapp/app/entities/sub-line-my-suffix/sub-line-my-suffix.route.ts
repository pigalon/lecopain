import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { SubLineMySuffix } from 'app/shared/model/sub-line-my-suffix.model';
import { SubLineMySuffixService } from './sub-line-my-suffix.service';
import { SubLineMySuffixComponent } from './sub-line-my-suffix.component';
import { SubLineMySuffixDetailComponent } from './sub-line-my-suffix-detail.component';
import { SubLineMySuffixUpdateComponent } from './sub-line-my-suffix-update.component';
import { SubLineMySuffixDeletePopupComponent } from './sub-line-my-suffix-delete-dialog.component';
import { ISubLineMySuffix } from 'app/shared/model/sub-line-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class SubLineMySuffixResolve implements Resolve<ISubLineMySuffix> {
    constructor(private service: SubLineMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((subLine: HttpResponse<SubLineMySuffix>) => subLine.body));
        }
        return of(new SubLineMySuffix());
    }
}

export const subLineRoute: Routes = [
    {
        path: 'sub-line-my-suffix',
        component: SubLineMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'lecopainApp.subLine.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'sub-line-my-suffix/:id/view',
        component: SubLineMySuffixDetailComponent,
        resolve: {
            subLine: SubLineMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'lecopainApp.subLine.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'sub-line-my-suffix/new',
        component: SubLineMySuffixUpdateComponent,
        resolve: {
            subLine: SubLineMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'lecopainApp.subLine.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'sub-line-my-suffix/:id/edit',
        component: SubLineMySuffixUpdateComponent,
        resolve: {
            subLine: SubLineMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'lecopainApp.subLine.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const subLinePopupRoute: Routes = [
    {
        path: 'sub-line-my-suffix/:id/delete',
        component: SubLineMySuffixDeletePopupComponent,
        resolve: {
            subLine: SubLineMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'lecopainApp.subLine.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
