import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { ICustomerMySuffix } from 'app/shared/model/customer-my-suffix.model';
import { CustomerMySuffixService } from './customer-my-suffix.service';
import { ILocationMySuffix } from 'app/shared/model/location-my-suffix.model';
import { LocationMySuffixService } from 'app/entities/location-my-suffix';

@Component({
    selector: 'jhi-customer-my-suffix-update',
    templateUrl: './customer-my-suffix-update.component.html'
})
export class CustomerMySuffixUpdateComponent implements OnInit {
    private _customer: ICustomerMySuffix;
    isSaving: boolean;

    locations: ILocationMySuffix[];
    createDate: string;

    constructor(
        private jhiAlertService: JhiAlertService,
        private customerService: CustomerMySuffixService,
        private locationService: LocationMySuffixService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ customer }) => {
            this.customer = customer;
        });
        this.locationService.query({ filter: 'customer-is-null' }).subscribe(
            (res: HttpResponse<ILocationMySuffix[]>) => {
                if (!this.customer.locationId) {
                    this.locations = res.body;
                } else {
                    this.locationService.find(this.customer.locationId).subscribe(
                        (subRes: HttpResponse<ILocationMySuffix>) => {
                            this.locations = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.customer.createDate = moment(this.createDate, DATE_TIME_FORMAT);
        if (this.customer.id !== undefined) {
            this.subscribeToSaveResponse(this.customerService.update(this.customer));
        } else {
            this.subscribeToSaveResponse(this.customerService.create(this.customer));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ICustomerMySuffix>>) {
        result.subscribe((res: HttpResponse<ICustomerMySuffix>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackLocationById(index: number, item: ILocationMySuffix) {
        return item.id;
    }
    get customer() {
        return this._customer;
    }

    set customer(customer: ICustomerMySuffix) {
        this._customer = customer;
        this.createDate = moment(customer.createDate).format(DATE_TIME_FORMAT);
    }
}
