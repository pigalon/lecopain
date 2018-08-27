import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDeliveryHistoryMySuffix } from 'app/shared/model/delivery-history-my-suffix.model';

@Component({
    selector: 'jhi-delivery-history-my-suffix-detail',
    templateUrl: './delivery-history-my-suffix-detail.component.html'
})
export class DeliveryHistoryMySuffixDetailComponent implements OnInit {
    deliveryHistory: IDeliveryHistoryMySuffix;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ deliveryHistory }) => {
            this.deliveryHistory = deliveryHistory;
        });
    }

    previousState() {
        window.history.back();
    }
}
