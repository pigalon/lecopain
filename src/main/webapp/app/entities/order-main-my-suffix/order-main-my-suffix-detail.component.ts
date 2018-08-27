import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IOrderMainMySuffix } from 'app/shared/model/order-main-my-suffix.model';

@Component({
    selector: 'jhi-order-main-my-suffix-detail',
    templateUrl: './order-main-my-suffix-detail.component.html'
})
export class OrderMainMySuffixDetailComponent implements OnInit {
    orderMain: IOrderMainMySuffix;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ orderMain }) => {
            this.orderMain = orderMain;
        });
    }

    previousState() {
        window.history.back();
    }
}
