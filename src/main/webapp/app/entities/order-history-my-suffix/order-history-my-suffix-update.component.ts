import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { IOrderHistoryMySuffix } from 'app/shared/model/order-history-my-suffix.model';
import { OrderHistoryMySuffixService } from './order-history-my-suffix.service';
import { IOrderMainMySuffix } from 'app/shared/model/order-main-my-suffix.model';
import { OrderMainMySuffixService } from 'app/entities/order-main-my-suffix';

@Component({
    selector: 'jhi-order-history-my-suffix-update',
    templateUrl: './order-history-my-suffix-update.component.html'
})
export class OrderHistoryMySuffixUpdateComponent implements OnInit {
    private _orderHistory: IOrderHistoryMySuffix;
    isSaving: boolean;

    orders: IOrderMainMySuffix[];
    actionDate: string;

    constructor(
        private jhiAlertService: JhiAlertService,
        private orderHistoryService: OrderHistoryMySuffixService,
        private orderMainService: OrderMainMySuffixService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ orderHistory }) => {
            this.orderHistory = orderHistory;
        });
        this.orderMainService.query({ filter: 'orderhistory-is-null' }).subscribe(
            (res: HttpResponse<IOrderMainMySuffix[]>) => {
                if (!this.orderHistory.orderId) {
                    this.orders = res.body;
                } else {
                    this.orderMainService.find(this.orderHistory.orderId).subscribe(
                        (subRes: HttpResponse<IOrderMainMySuffix>) => {
                            this.orders = [subRes.body].concat(res.body);
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
        this.orderHistory.actionDate = moment(this.actionDate, DATE_TIME_FORMAT);
        if (this.orderHistory.id !== undefined) {
            this.subscribeToSaveResponse(this.orderHistoryService.update(this.orderHistory));
        } else {
            this.subscribeToSaveResponse(this.orderHistoryService.create(this.orderHistory));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IOrderHistoryMySuffix>>) {
        result.subscribe(
            (res: HttpResponse<IOrderHistoryMySuffix>) => this.onSaveSuccess(),
            (res: HttpErrorResponse) => this.onSaveError()
        );
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

    trackOrderMainById(index: number, item: IOrderMainMySuffix) {
        return item.id;
    }
    get orderHistory() {
        return this._orderHistory;
    }

    set orderHistory(orderHistory: IOrderHistoryMySuffix) {
        this._orderHistory = orderHistory;
        this.actionDate = moment(orderHistory.actionDate).format(DATE_TIME_FORMAT);
    }
}
