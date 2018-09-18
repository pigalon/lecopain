import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { OrderMainMySuffix } from 'app/shared/model/order-main-my-suffix.model';
import { OrderTimelineService } from 'app/entities/order-timeline/order-timeline.service';
import { OrderTimelineComponent } from 'app/entities/order-timeline/order-timeline.component';
import { OrderTimelineDetailComponent } from 'app/entities/order-timeline/order-timeline-detail.component';
import { OrderTimelineUpdateComponent } from 'app/entities/order-timeline/order-timeline-update.component';
import { OrderTimelineDeletePopupComponent } from './order-timeline-delete-dialog.component';
import { IOrderMainMySuffix } from 'app/shared/model/order-main-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class OrderTimelineResolve implements Resolve<IOrderMainMySuffix> {
    constructor(private service: OrderTimelineService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((orderMain: HttpResponse<OrderMainMySuffix>) => orderMain.body));
        }
        return of(new OrderMainMySuffix());
    }
}

export const orderTimelineRoute: Routes = [
    {
        path: 'order-timeline',
        component: OrderTimelineComponent,
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
        path: 'order-timeline/:id/view',
        component: OrderTimelineDetailComponent,
        resolve: {
            orderMain: OrderTimelineResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'lecopainApp.orderMain.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'order-timeline/new',
        component: OrderTimelineUpdateComponent,
        resolve: {
            orderMain: OrderTimelineResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'lecopainApp.orderMain.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'order-timeline/:id/edit',
        component: OrderTimelineUpdateComponent,
        resolve: {
            orderMain: OrderTimelineResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'lecopainApp.orderMain.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const orderTimelinePopupRoute: Routes = [
    {
        path: 'order-timeline/:id/delete',
        component: OrderTimelineDeletePopupComponent,
        resolve: {
            orderMain: OrderTimelineResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'lecopainApp.orderMain.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
