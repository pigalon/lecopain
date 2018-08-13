import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { IOrderCustMySuffix } from 'app/shared/model/order-cust-my-suffix.model';
import { OrderCustMySuffixService } from './order-cust-my-suffix.service';
import { ICustomerMySuffix } from 'app/shared/model/customer-my-suffix.model';
import { CustomerMySuffixService } from 'app/entities/customer-my-suffix';

@Component({
    selector: 'jhi-order-cust-my-suffix-update',
    templateUrl: './order-cust-my-suffix-update.component.html'
})
export class OrderCustMySuffixUpdateComponent implements OnInit {
    private _orderCust: IOrderCustMySuffix;
    isSaving: boolean;

    customers: ICustomerMySuffix[];
    payDate: string;

    constructor(
        private jhiAlertService: JhiAlertService,
        private orderCustService: OrderCustMySuffixService,
        private customerService: CustomerMySuffixService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ orderCust }) => {
            this.orderCust = orderCust;
        });
        this.customerService.query().subscribe(
            (res: HttpResponse<ICustomerMySuffix[]>) => {
                this.customers = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.orderCust.payDate = moment(this.payDate, DATE_TIME_FORMAT);
        if (this.orderCust.id !== undefined) {
            this.subscribeToSaveResponse(this.orderCustService.update(this.orderCust));
        } else {
            this.subscribeToSaveResponse(this.orderCustService.create(this.orderCust));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IOrderCustMySuffix>>) {
        result.subscribe((res: HttpResponse<IOrderCustMySuffix>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackCustomerById(index: number, item: ICustomerMySuffix) {
        return item.id;
    }
    get orderCust() {
        return this._orderCust;
    }

    set orderCust(orderCust: IOrderCustMySuffix) {
        this._orderCust = orderCust;
        this.payDate = moment(orderCust.payDate).format(DATE_TIME_FORMAT);
    }
}
