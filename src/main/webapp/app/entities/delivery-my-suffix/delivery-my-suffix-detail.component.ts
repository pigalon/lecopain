import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDeliveryMySuffix } from 'app/shared/model/delivery-my-suffix.model';

@Component({
    selector: 'jhi-delivery-my-suffix-detail',
    templateUrl: './delivery-my-suffix-detail.component.html'
})
export class DeliveryMySuffixDetailComponent implements OnInit {
    delivery: IDeliveryMySuffix;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ delivery }) => {
            this.delivery = delivery;
        });
    }

    previousState() {
        window.history.back();
    }
}
