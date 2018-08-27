import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IDeliveryMySuffix } from 'app/shared/model/delivery-my-suffix.model';
import { DeliveryMySuffixService } from './delivery-my-suffix.service';

@Component({
    selector: 'jhi-delivery-my-suffix-update',
    templateUrl: './delivery-my-suffix-update.component.html'
})
export class DeliveryMySuffixUpdateComponent implements OnInit {
    private _delivery: IDeliveryMySuffix;
    isSaving: boolean;
    delivDate: string;

    constructor(private deliveryService: DeliveryMySuffixService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ delivery }) => {
            this.delivery = delivery;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.delivery.delivDate = moment(this.delivDate, DATE_TIME_FORMAT);
        if (this.delivery.id !== undefined) {
            this.subscribeToSaveResponse(this.deliveryService.update(this.delivery));
        } else {
            this.subscribeToSaveResponse(this.deliveryService.create(this.delivery));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IDeliveryMySuffix>>) {
        result.subscribe((res: HttpResponse<IDeliveryMySuffix>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get delivery() {
        return this._delivery;
    }

    set delivery(delivery: IDeliveryMySuffix) {
        this._delivery = delivery;
        this.delivDate = moment(delivery.delivDate).format(DATE_TIME_FORMAT);
    }
}
