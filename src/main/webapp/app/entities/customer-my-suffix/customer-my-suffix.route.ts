import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CustomerMySuffix } from 'app/shared/model/customer-my-suffix.model';
import { CustomerMySuffixService } from './customer-my-suffix.service';
import { CustomerMySuffixComponent } from './customer-my-suffix.component';
import { CustomerMySuffixDetailComponent } from './customer-my-suffix-detail.component';
import { CustomerMySuffixUpdateComponent } from './customer-my-suffix-update.component';
import { CustomerMySuffixDeletePopupComponent } from './customer-my-suffix-delete-dialog.component';
import { ICustomerMySuffix } from 'app/shared/model/customer-my-suffix.model';

@Injectable({ providedIn: 'root' })
export class CustomerMySuffixResolve implements Resolve<ICustomerMySuffix> {
    constructor(private service: CustomerMySuffixService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((customer: HttpResponse<CustomerMySuffix>) => customer.body));
        }
        return of(new CustomerMySuffix());
    }
}

export const customerRoute: Routes = [
    {
        path: 'customer-my-suffix',
        component: CustomerMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'lecopainApp.customer.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'customer-my-suffix/:id/view',
        component: CustomerMySuffixDetailComponent,
        resolve: {
            customer: CustomerMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'lecopainApp.customer.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'customer-my-suffix/new',
        component: CustomerMySuffixUpdateComponent,
        resolve: {
            customer: CustomerMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'lecopainApp.customer.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'customer-my-suffix/:id/edit',
        component: CustomerMySuffixUpdateComponent,
        resolve: {
            customer: CustomerMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'lecopainApp.customer.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const customerPopupRoute: Routes = [
    {
        path: 'customer-my-suffix/:id/delete',
        component: CustomerMySuffixDeletePopupComponent,
        resolve: {
            customer: CustomerMySuffixResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'lecopainApp.customer.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
