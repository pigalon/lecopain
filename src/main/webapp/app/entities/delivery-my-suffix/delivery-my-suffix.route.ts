import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { DeliveryMySuffix } from 'app/shared/model/delivery-my-suffix.model';
import { DeliveryMySuffixService } from './delivery-my-suffix.service';
import { DeliveryMySuffixComponent } from './delivery-my-suffix.component';
import { DeliveryMySuffixDetailComponent } from './delivery-my-suffix-detail.component';
import { DeliveryMySuffixUpdateComponent } from './delivery-my-suffix-update.component';
import { DeliveryMySuffixDeletePopupComponent } from './delivery-my-suffix-delete-dialog.component';
import { IDeliveryMySuffix } from 'app/shared/model/delivery-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class DeliveryMySuffixResolve implements Resolve<IDeliveryMySuffix> {
    constructor(private service: DeliveryMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((delivery: HttpResponse<DeliveryMySuffix>) => delivery.body));
        }
        return of(new DeliveryMySuffix());
    }
}

export const deliveryRoute: Routes = [
    {
        path: 'delivery-my-suffix',
        component: DeliveryMySuffixComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'lecopainApp.delivery.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'delivery-my-suffix/:id/view',
        component: DeliveryMySuffixDetailComponent,
        resolve: {
            delivery: DeliveryMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'lecopainApp.delivery.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'delivery-my-suffix/new',
        component: DeliveryMySuffixUpdateComponent,
        resolve: {
            delivery: DeliveryMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'lecopainApp.delivery.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'delivery-my-suffix/:id/edit',
        component: DeliveryMySuffixUpdateComponent,
        resolve: {
            delivery: DeliveryMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'lecopainApp.delivery.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const deliveryPopupRoute: Routes = [
    {
        path: 'delivery-my-suffix/:id/delete',
        component: DeliveryMySuffixDeletePopupComponent,
        resolve: {
            delivery: DeliveryMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'lecopainApp.delivery.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
