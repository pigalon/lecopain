import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { OrderHistoryMySuffix } from 'app/shared/model/order-history-my-suffix.model';
import { OrderHistoryMySuffixService } from './order-history-my-suffix.service';
import { OrderHistoryMySuffixComponent } from './order-history-my-suffix.component';
import { OrderHistoryMySuffixDetailComponent } from './order-history-my-suffix-detail.component';
import { OrderHistoryMySuffixUpdateComponent } from './order-history-my-suffix-update.component';
import { OrderHistoryMySuffixDeletePopupComponent } from './order-history-my-suffix-delete-dialog.component';
import { IOrderHistoryMySuffix } from 'app/shared/model/order-history-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class OrderHistoryMySuffixResolve implements Resolve<IOrderHistoryMySuffix> {
    constructor(private service: OrderHistoryMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((orderHistory: HttpResponse<OrderHistoryMySuffix>) => orderHistory.body));
        }
        return of(new OrderHistoryMySuffix());
    }
}

export const orderHistoryRoute: Routes = [
    {
        path: 'order-history-my-suffix',
        component: OrderHistoryMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'lecopainApp.orderHistory.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'order-history-my-suffix/:id/view',
        component: OrderHistoryMySuffixDetailComponent,
        resolve: {
            orderHistory: OrderHistoryMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'lecopainApp.orderHistory.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'order-history-my-suffix/new',
        component: OrderHistoryMySuffixUpdateComponent,
        resolve: {
            orderHistory: OrderHistoryMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'lecopainApp.orderHistory.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'order-history-my-suffix/:id/edit',
        component: OrderHistoryMySuffixUpdateComponent,
        resolve: {
            orderHistory: OrderHistoryMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'lecopainApp.orderHistory.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const orderHistoryPopupRoute: Routes = [
    {
        path: 'order-history-my-suffix/:id/delete',
        component: OrderHistoryMySuffixDeletePopupComponent,
        resolve: {
            orderHistory: OrderHistoryMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'lecopainApp.orderHistory.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
