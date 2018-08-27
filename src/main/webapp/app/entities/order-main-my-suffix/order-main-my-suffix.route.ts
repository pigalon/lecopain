import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { OrderMainMySuffix } from 'app/shared/model/order-main-my-suffix.model';
import { OrderMainMySuffixService } from './order-main-my-suffix.service';
import { OrderMainMySuffixComponent } from './order-main-my-suffix.component';
import { OrderMainMySuffixDetailComponent } from './order-main-my-suffix-detail.component';
import { OrderMainMySuffixUpdateComponent } from './order-main-my-suffix-update.component';
import { OrderMainMySuffixDeletePopupComponent } from './order-main-my-suffix-delete-dialog.component';
import { IOrderMainMySuffix } from 'app/shared/model/order-main-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class OrderMainMySuffixResolve implements Resolve<IOrderMainMySuffix> {
    constructor(private service: OrderMainMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((orderMain: HttpResponse<OrderMainMySuffix>) => orderMain.body));
        }
        return of(new OrderMainMySuffix());
    }
}

export const orderMainRoute: Routes = [
    {
        path: 'order-main-my-suffix',
        component: OrderMainMySuffixComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'lecopainApp.orderMain.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'order-main-my-suffix/:id/view',
        component: OrderMainMySuffixDetailComponent,
        resolve: {
            orderMain: OrderMainMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'lecopainApp.orderMain.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'order-main-my-suffix/new',
        component: OrderMainMySuffixUpdateComponent,
        resolve: {
            orderMain: OrderMainMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'lecopainApp.orderMain.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'order-main-my-suffix/:id/edit',
        component: OrderMainMySuffixUpdateComponent,
        resolve: {
            orderMain: OrderMainMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'lecopainApp.orderMain.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const orderMainPopupRoute: Routes = [
    {
        path: 'order-main-my-suffix/:id/delete',
        component: OrderMainMySuffixDeletePopupComponent,
        resolve: {
            orderMain: OrderMainMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'lecopainApp.orderMain.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
