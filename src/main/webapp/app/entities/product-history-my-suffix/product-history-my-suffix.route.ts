import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductHistoryMySuffix } from 'app/shared/model/product-history-my-suffix.model';
import { ProductHistoryMySuffixService } from './product-history-my-suffix.service';
import { ProductHistoryMySuffixComponent } from './product-history-my-suffix.component';
import { ProductHistoryMySuffixDetailComponent } from './product-history-my-suffix-detail.component';
import { ProductHistoryMySuffixUpdateComponent } from './product-history-my-suffix-update.component';
import { ProductHistoryMySuffixDeletePopupComponent } from './product-history-my-suffix-delete-dialog.component';
import { IProductHistoryMySuffix } from 'app/shared/model/product-history-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class ProductHistoryMySuffixResolve implements Resolve<IProductHistoryMySuffix> {
    constructor(private service: ProductHistoryMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((productHistory: HttpResponse<ProductHistoryMySuffix>) => productHistory.body));
        }
        return of(new ProductHistoryMySuffix());
    }
}

export const productHistoryRoute: Routes = [
    {
        path: 'product-history-my-suffix',
        component: ProductHistoryMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'lecopainApp.productHistory.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'product-history-my-suffix/:id/view',
        component: ProductHistoryMySuffixDetailComponent,
        resolve: {
            productHistory: ProductHistoryMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'lecopainApp.productHistory.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'product-history-my-suffix/new',
        component: ProductHistoryMySuffixUpdateComponent,
        resolve: {
            productHistory: ProductHistoryMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'lecopainApp.productHistory.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'product-history-my-suffix/:id/edit',
        component: ProductHistoryMySuffixUpdateComponent,
        resolve: {
            productHistory: ProductHistoryMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'lecopainApp.productHistory.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const productHistoryPopupRoute: Routes = [
    {
        path: 'product-history-my-suffix/:id/delete',
        component: ProductHistoryMySuffixDeletePopupComponent,
        resolve: {
            productHistory: ProductHistoryMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'lecopainApp.productHistory.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
