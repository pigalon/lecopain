import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { SubHistoryMySuffix } from 'app/shared/model/sub-history-my-suffix.model';
import { SubHistoryMySuffixService } from './sub-history-my-suffix.service';
import { SubHistoryMySuffixComponent } from './sub-history-my-suffix.component';
import { SubHistoryMySuffixDetailComponent } from './sub-history-my-suffix-detail.component';
import { SubHistoryMySuffixUpdateComponent } from './sub-history-my-suffix-update.component';
import { SubHistoryMySuffixDeletePopupComponent } from './sub-history-my-suffix-delete-dialog.component';
import { ISubHistoryMySuffix } from 'app/shared/model/sub-history-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class SubHistoryMySuffixResolve implements Resolve<ISubHistoryMySuffix> {
    constructor(private service: SubHistoryMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((subHistory: HttpResponse<SubHistoryMySuffix>) => subHistory.body));
        }
        return of(new SubHistoryMySuffix());
    }
}

export const subHistoryRoute: Routes = [
    {
        path: 'sub-history-my-suffix',
        component: SubHistoryMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'lecopainApp.subHistory.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'sub-history-my-suffix/:id/view',
        component: SubHistoryMySuffixDetailComponent,
        resolve: {
            subHistory: SubHistoryMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'lecopainApp.subHistory.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'sub-history-my-suffix/new',
        component: SubHistoryMySuffixUpdateComponent,
        resolve: {
            subHistory: SubHistoryMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'lecopainApp.subHistory.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'sub-history-my-suffix/:id/edit',
        component: SubHistoryMySuffixUpdateComponent,
        resolve: {
            subHistory: SubHistoryMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'lecopainApp.subHistory.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const subHistoryPopupRoute: Routes = [
    {
        path: 'sub-history-my-suffix/:id/delete',
        component: SubHistoryMySuffixDeletePopupComponent,
        resolve: {
            subHistory: SubHistoryMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'lecopainApp.subHistory.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
