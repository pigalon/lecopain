import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { IDeliveryHistoryMySuffix } from 'app/shared/model/delivery-history-my-suffix.model';
import { DeliveryHistoryMySuffixService } from './delivery-history-my-suffix.service';
import { IDeliveryMySuffix } from 'app/shared/model/delivery-my-suffix.model';
import { DeliveryMySuffixService } from 'app/entities/delivery-my-suffix';

@Component({
    selector: 'jhi-delivery-history-my-suffix-update',
    templateUrl: './delivery-history-my-suffix-update.component.html'
})
export class DeliveryHistoryMySuffixUpdateComponent implements OnInit {
    private _deliveryHistory: IDeliveryHistoryMySuffix;
    isSaving: boolean;

    deliveries: IDeliveryMySuffix[];
    actionDate: string;

    constructor(
        private jhiAlertService: JhiAlertService,
        private deliveryHistoryService: DeliveryHistoryMySuffixService,
        private deliveryService: DeliveryMySuffixService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ deliveryHistory }) => {
            this.deliveryHistory = deliveryHistory;
        });
        this.deliveryService.query({ filter: 'deliveryhistory-is-null' }).subscribe(
            (res: HttpResponse<IDeliveryMySuffix[]>) => {
                if (!this.deliveryHistory.deliveryId) {
                    this.deliveries = res.body;
                } else {
                    this.deliveryService.find(this.deliveryHistory.deliveryId).subscribe(
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
        this.deliveryHistory.actionDate = moment(this.actionDate, DATE_TIME_FORMAT);
        if (this.deliveryHistory.id !== undefined) {
            this.subscribeToSaveResponse(this.deliveryHistoryService.update(this.deliveryHistory));
        } else {
            this.subscribeToSaveResponse(this.deliveryHistoryService.create(this.deliveryHistory));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IDeliveryHistoryMySuffix>>) {
        result.subscribe(
            (res: HttpResponse<IDeliveryHistoryMySuffix>) => this.onSaveSuccess(),
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

    trackDeliveryById(index: number, item: IDeliveryMySuffix) {
        return item.id;
    }
    get deliveryHistory() {
        return this._deliveryHistory;
    }

    set deliveryHistory(deliveryHistory: IDeliveryHistoryMySuffix) {
        this._deliveryHistory = deliveryHistory;
        this.actionDate = moment(deliveryHistory.actionDate).format(DATE_TIME_FORMAT);
    }
}
