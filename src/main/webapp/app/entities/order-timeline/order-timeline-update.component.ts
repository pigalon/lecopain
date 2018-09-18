import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { IOrderMainMySuffix } from 'app/shared/model/order-main-my-suffix.model';
import { OrderTimelineService } from './order-timeline.service';
import { ICustomerMySuffix } from 'app/shared/model/customer-my-suffix.model';
import { CustomerMySuffixService } from 'app/entities/customer-my-suffix';
import { IDeliveryMySuffix } from 'app/shared/model/delivery-my-suffix.model';
import { DeliveryMySuffixService } from 'app/entities/delivery-my-suffix';

@Component({
    selector: 'jhi-order-timeline-update',
    templateUrl: './order-timeline-update.component.html'
})
export class OrderTimelineUpdateComponent implements OnInit {
    private _orderMain: IOrderMainMySuffix;
    isSaving: boolean;

    customers: ICustomerMySuffix[];

    deliveries: IDeliveryMySuffix[];
    payDate: string;

    constructor(
        private jhiAlertService: JhiAlertService,
        private orderMainService: OrderTimelineService,
        private customerService: CustomerMySuffixService,
        private deliveryService: DeliveryMySuffixService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ orderMain }) => {
            this.orderMain = orderMain;
        });
        this.customerService.query().subscribe(
            (res: HttpResponse<ICustomerMySuffix[]>) => {
                this.customers = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.deliveryService.query({ filter: 'ordermain-is-null' }).subscribe(
            (res: HttpResponse<IDeliveryMySuffix[]>) => {
                if (!this.orderMain.deliveryId) {
                    this.deliveries = res.body;
                } else {
                    this.deliveryService.find(this.orderMain.deliveryId).subscribe(
                        (subRes: HttpResponse<IDeliveryMySuffix>) => {
                            this.deliveries = [subRes.body].concat(res.body);
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
        this.orderMain.payDate = moment(this.payDate, DATE_TIME_FORMAT);
        if (this.orderMain.id !== undefined) {
            this.subscribeToSaveResponse(this.orderMainService.update(this.orderMain));
        } else {
            this.subscribeToSaveResponse(this.orderMainService.create(this.orderMain));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IOrderMainMySuffix>>) {
        result.subscribe((res: HttpResponse<IOrderMainMySuffix>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackDeliveryById(index: number, item: IDeliveryMySuffix) {
        return item.id;
    }
    get orderMain() {
        return this._orderMain;
    }

    set orderMain(orderMain: IOrderMainMySuffix) {
        this._orderMain = orderMain;
        this.payDate = moment(orderMain.payDate).format(DATE_TIME_FORMAT);
    }
}
