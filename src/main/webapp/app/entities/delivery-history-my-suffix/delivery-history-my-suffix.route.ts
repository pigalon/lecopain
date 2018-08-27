import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { DeliveryHistoryMySuffix } from 'app/shared/model/delivery-history-my-suffix.model';
import { DeliveryHistoryMySuffixService } from './delivery-history-my-suffix.service';
import { DeliveryHistoryMySuffixComponent } from './delivery-history-my-suffix.component';
import { DeliveryHistoryMySuffixDetailComponent } from './delivery-history-my-suffix-detail.component';
import { DeliveryHistoryMySuffixUpdateComponent } from './delivery-history-my-suffix-update.component';
import { DeliveryHistoryMySuffixDeletePopupComponent } from './delivery-history-my-suffix-delete-dialog.component';
import { IDeliveryHistoryMySuffix } from 'app/shared/model/delivery-history-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class DeliveryHistoryMySuffixResolve implements Resolve<IDeliveryHistoryMySuffix> {
    constructor(private service: DeliveryHistoryMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((deliveryHistory: HttpResponse<DeliveryHistoryMySuffix>) => deliveryHistory.body));
        }
        return of(new DeliveryHistoryMySuffix());
    }
}

export const deliveryHistoryRoute: Routes = [
    {
        path: 'delivery-history-my-suffix',
        component: DeliveryHistoryMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'lecopainApp.deliveryHistory.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'delivery-history-my-suffix/:id/view',
        component: DeliveryHistoryMySuffixDetailComponent,
        resolve: {
            deliveryHistory: DeliveryHistoryMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'lecopainApp.deliveryHistory.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'delivery-history-my-suffix/new',
        component: DeliveryHistoryMySuffixUpdateComponent,
        resolve: {
            deliveryHistory: DeliveryHistoryMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'lecopainApp.deliveryHistory.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'delivery-history-my-suffix/:id/edit',
        component: DeliveryHistoryMySuffixUpdateComponent,
        resolve: {
            deliveryHistory: DeliveryHistoryMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'lecopainApp.deliveryHistory.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const deliveryHistoryPopupRoute: Routes = [
    {
        path: 'delivery-history-my-suffix/:id/delete',
        component: DeliveryHistoryMySuffixDeletePopupComponent,
        resolve: {
            deliveryHistory: DeliveryHistoryMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'lecopainApp.deliveryHistory.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
