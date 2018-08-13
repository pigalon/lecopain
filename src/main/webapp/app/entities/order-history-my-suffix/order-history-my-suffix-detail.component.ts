import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IOrderHistoryMySuffix } from 'app/shared/model/order-history-my-suffix.model';

@Component({
    selector: 'jhi-order-history-my-suffix-detail',
    templateUrl: './order-history-my-suffix-detail.component.html'
})
export class OrderHistoryMySuffixDetailComponent implements OnInit {
    orderHistory: IOrderHistoryMySuffix;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ orderHistory }) => {
            this.orderHistory = orderHistory;
        });
    }

    previousState() {
        window.history.back();
    }
}
