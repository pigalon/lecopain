import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IOrderLineMySuffix } from 'app/shared/model/order-line-my-suffix.model';

@Component({
    selector: 'jhi-order-line-my-suffix-detail',
    templateUrl: './order-line-my-suffix-detail.component.html'
})
export class OrderLineMySuffixDetailComponent implements OnInit {
    orderLine: IOrderLineMySuffix;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ orderLine }) => {
            this.orderLine = orderLine;
        });
    }

    previousState() {
        window.history.back();
    }
}
