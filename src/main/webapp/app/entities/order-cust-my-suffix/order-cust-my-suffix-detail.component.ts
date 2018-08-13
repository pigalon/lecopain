import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IOrderCustMySuffix } from 'app/shared/model/order-cust-my-suffix.model';

@Component({
    selector: 'jhi-order-cust-my-suffix-detail',
    templateUrl: './order-cust-my-suffix-detail.component.html'
})
export class OrderCustMySuffixDetailComponent implements OnInit {
    orderCust: IOrderCustMySuffix;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ orderCust }) => {
            this.orderCust = orderCust;
        });
    }

    previousState() {
        window.history.back();
    }
}
