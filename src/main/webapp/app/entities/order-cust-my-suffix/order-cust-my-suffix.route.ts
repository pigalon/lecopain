import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { OrderCustMySuffix } from 'app/shared/model/order-cust-my-suffix.model';
import { OrderCustMySuffixService } from './order-cust-my-suffix.service';
import { OrderCustMySuffixComponent } from './order-cust-my-suffix.component';
import { OrderCustMySuffixDetailComponent } from './order-cust-my-suffix-detail.component';
import { OrderCustMySuffixUpdateComponent } from './order-cust-my-suffix-update.component';
import { OrderCustMySuffixDeletePopupComponent } from './order-cust-my-suffix-delete-dialog.component';
import { IOrderCustMySuffix } from 'app/shared/model/order-cust-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class OrderCustMySuffixResolve implements Resolve<IOrderCustMySuffix> {
    constructor(private service: OrderCustMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((orderCust: HttpResponse<OrderCustMySuffix>) => orderCust.body));
        }
        return of(new OrderCustMySuffix());
    }
}

export const orderCustRoute: Routes = [
    {
        path: 'order-cust-my-suffix',
        component: OrderCustMySuffixComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'lecopainApp.orderCust.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'order-cust-my-suffix/:id/view',
        component: OrderCustMySuffixDetailComponent,
        resolve: {
            orderCust: OrderCustMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'lecopainApp.orderCust.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'order-cust-my-suffix/new',
        component: OrderCustMySuffixUpdateComponent,
        resolve: {
            orderCust: OrderCustMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'lecopainApp.orderCust.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'order-cust-my-suffix/:id/edit',
        component: OrderCustMySuffixUpdateComponent,
        resolve: {
            orderCust: OrderCustMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'lecopainApp.orderCust.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const orderCustPopupRoute: Routes = [
    {
        path: 'order-cust-my-suffix/:id/delete',
        component: OrderCustMySuffixDeletePopupComponent,
        resolve: {
            orderCust: OrderCustMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'lecopainApp.orderCust.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
