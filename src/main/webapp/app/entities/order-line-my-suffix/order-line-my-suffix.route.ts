import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { OrderLineMySuffix } from 'app/shared/model/order-line-my-suffix.model';
import { OrderLineMySuffixService } from './order-line-my-suffix.service';
import { OrderLineMySuffixComponent } from './order-line-my-suffix.component';
import { OrderLineMySuffixDetailComponent } from './order-line-my-suffix-detail.component';
import { OrderLineMySuffixUpdateComponent } from './order-line-my-suffix-update.component';
import { OrderLineMySuffixDeletePopupComponent } from './order-line-my-suffix-delete-dialog.component';
import { IOrderLineMySuffix } from 'app/shared/model/order-line-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class OrderLineMySuffixResolve implements Resolve<IOrderLineMySuffix> {
    constructor(private service: OrderLineMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((orderLine: HttpResponse<OrderLineMySuffix>) => orderLine.body));
        }
        return of(new OrderLineMySuffix());
    }
}

export const orderLineRoute: Routes = [
    {
        path: 'order-line-my-suffix',
        component: OrderLineMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'lecopainApp.orderLine.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'order-line-my-suffix/:id/view',
        component: OrderLineMySuffixDetailComponent,
        resolve: {
            orderLine: OrderLineMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'lecopainApp.orderLine.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'order-line-my-suffix/new',
        component: OrderLineMySuffixUpdateComponent,
        resolve: {
            orderLine: OrderLineMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'lecopainApp.orderLine.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'order-line-my-suffix/:id/edit',
        component: OrderLineMySuffixUpdateComponent,
        resolve: {
            orderLine: OrderLineMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'lecopainApp.orderLine.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const orderLinePopupRoute: Routes = [
    {
        path: 'order-line-my-suffix/:id/delete',
        component: OrderLineMySuffixDeletePopupComponent,
        resolve: {
            orderLine: OrderLineMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'lecopainApp.orderLine.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
